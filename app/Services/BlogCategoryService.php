<?php

namespace App\Services;

use App\Models\BlogCategory;

class BlogCategoryService
{
    public function store(array $data)
    {
        return BlogCategory::create($data);
    }

    public function update(array $data, BlogCategory $blogCategory)
    {
        return $blogCategory->update($data);
    }

    public function destroy(BlogCategory $blogCategory)
    {
        return $blogCategory->delete();
    }

    public function findAll($perPage = 20, $search = '')
    {
        $query = BlogCategory::query();

        // Apply search if provided
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            });
        }

        // Apply default sort
        $query->latest();

        // Get paginated results
        return $query->paginate($perPage)->through(function ($artist) {
            return [
                'id' => $artist->id,
                'name' => $artist->name,
                'slug' => $artist->slug,
                'created_at' => $artist->created_at,
            ];
        });
    }
    public function all()
    {
        return BlogCategory::orderBy('name')->get();
    }

}