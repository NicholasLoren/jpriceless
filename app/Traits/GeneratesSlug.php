<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

trait GeneratesSlug
{
    /**
     * Boot the trait.
     *
     * @return void
     */
    protected static function bootGeneratesSlug()
    {
        static::creating(function (Model $model) {
            if (empty($model->slug)) {
                $model->slug = self::generateUniqueSlug($model);
            }
        });

        static::updating(function (Model $model) {
            // Only update slug if the source field has changed
            $sourceField = $model->slugSourceField();
            if ($model->isDirty($sourceField) && $model->wasChanged($sourceField)) {
                $model->slug = self::generateUniqueSlug($model);
            }
        });
    }

    /**
     * Generate a unique slug.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return string
     */
    protected static function generateUniqueSlug(Model $model)
    {
        $sourceField = $model->slugSourceField();
        $slug = Str::slug($model->$sourceField);

        // If empty slug (rare but possible), use a timestamp
        if (empty($slug)) {
            $slug = 'item-' . time();
        }

        $originalSlug = $slug;
        $i = 1;

        // Check if the slug exists in the database
        while (self::slugExists($model, $slug)) {
            $slug = $originalSlug . '-' . $i++;
        }

        return $slug;
    }

    /**
     * Check if a slug already exists.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @param string $slug
     * @return bool
     */
    protected static function slugExists(Model $model, $slug)
    {
        $query = $model->where('slug', $slug);

        // Exclude the current model when updating
        if ($model->exists) {
            $query->where($model->getKeyName(), '!=', $model->getKey());
        }

        return $query->exists();
    }

    /**
     * Get the source field for generating the slug.
     * Override this method in your model if you want to use a different field.
     *
     * @return string
     */
    public function slugSourceField()
    {
        return 'title';
    }
}