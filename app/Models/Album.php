<?php

namespace App\Models;

use App\Traits\GeneratesSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Album extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    use GeneratesSlug;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'artist_id',
        'genre_id',
        'label_id',
        'description',
        'release_date',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'release_date' => 'date',
        'is_featured' => 'boolean',
    ];

    public function slugSourceField()
    {
        return 'title';
    }

    /**
     * Get the artist that owns the album.
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Get the genre of the album.
     */
    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    /**
     * Get the label of the album.
     */
    public function label()
    {
        return $this->belongsTo(Label::class);
    }

    /**
     * Register media collections for the album.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_art')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(300)
                    ->height(300);

                $this->addMediaConversion('large')
                    ->width(1200)
                    ->height(1200);
            });
    }

    public function tracks()
    {
        return $this->hasMany(Track::class);
    }

    public function albumPlatforms()
    {
        return $this->hasMany(AlbumPlatform::class);
    }

    /**
     * Get platforms through the AlbumPlatform model (many-to-many via intermediate model)
     */
    public function platforms()
    {
        return $this->belongsToMany(Platform::class, 'album_platforms', 'album_id', 'platform_id')
            ->withPivot('url')
            ->withTimestamps();
    }
}