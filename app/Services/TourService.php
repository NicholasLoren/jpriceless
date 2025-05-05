<?php

namespace App\Services;

use App\Models\Tour;

class TourService
{
    public function store(array $data)
    {
        return Tour::create($data);
    }

    public function update(array $data, Tour $tour)
    {
        return $tour->update($data);
    }

    public function destroy(Tour $tour)
    {
        return $tour->delete();
    }

    public function findAll($perPage = 20, $search = '')
    {
        return Tour::with(['events'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($album) {
                // Add media URLs to the album
                if ($album->hasMedia('featured_image')) {
                    $album->cover_thumbnail = $album->getFirstMediaUrl('featured_image', 'thumb');
                    $album->cover_url = $album->getFirstMediaUrl('featured_image');
                }
                return $album;
            });
    }

    public function all()
    {
        return Tour::orderBy('title')->get();
    }

}