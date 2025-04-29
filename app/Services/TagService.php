<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{
    public function store(array $data)
    {
        return Tag::create($data);
    }

    public function update(array $data, Tag $tag)
    {
        return $tag->update($data);
    }

    public function destroy(Tag $tag)
    {
        return $tag->delete();
    }

    public function findAll($perPage = 20, $search = '')
    {
        $query = Tag::query();

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
        return Tag::orderBy('name')->get();
    }

}