<?php

namespace App\Services;

use App\Models\Platform;

class PlatformService
{
    public function store(array $data)
    {
        return Platform::create($data);
    }

    public function update(array $data, Platform $platform)
    {
        return $platform->update($data);
    }

    public function destroy(Platform $platform)
    {
        return $platform->delete();
    }

    public function findAll($perPage = 20, $search = '')
    {
        $query = Platform::query();

        // Apply search if provided
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('website_url', 'like', "%{$search}%");
            });
        }

        // Apply default sort
        $query->latest();

        // Get paginated results
        return $query->paginate($perPage)->through(function ($artist) {
            return [
                'id' => $artist->id,
                'name' => $artist->name,
                'website_url' => $artist->website_url,
                'icon_url' => $artist->icon_url,
                'created_at' => $artist->created_at,
            ];
        });
    }

    public function all()
    {
        return Platform::orderBy('name')->get();
    }

}