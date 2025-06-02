<?php

namespace App\Services;

use App\Models\Album;
use Illuminate\Database\Eloquent\Builder;

class AlbumService
{
    /**
     * Get all albums with pagination and search
     *
     * @param int $perPage
     * @param string $search
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function findAll($perPage = 20, $search = '', $page = 1)
    {
        return Album::with(['artist', 'genre', 'label', 'media', 'albumPlatforms.platform'])
            ->when($search, function (Builder $query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhereHas('artist', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('genre', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('label', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    });
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page)
            ->withQueryString()
            ->through(function ($album) {
                // Add media URLs to the album
                if ($album->hasMedia('cover_art')) {
                    $album->cover_thumbnail = $album->getFirstMediaUrl('cover_art', 'thumb');
                    $album->cover_url = $album->getFirstMediaUrl('cover_art');
                }
                return $album;
            });
    }

    /**
     * Get all albums without pagination
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return Album::with(['artist', 'genre', 'label'])
            ->orderBy('title')
            ->get();
    }

    /**
     * Create a new album
     *
     * @param array $data
     * @return Album
     */
    public function create($data)
    {
        return Album::create($data);
    }

    /**
     * Update an existing album
     *
     * @param Album $album
     * @param array $data
     * @return Album
     */
    public function update(Album $album, $data)
    {
        $album->update($data);
        return $album;
    }

    /**
     * Delete an album
     *
     * @param Album $album
     * @return bool|null
     */
    public function delete(Album $album)
    {
        return $album->delete();
    }

    /**
     * Find featured albums
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findFeatured($limit = 8)
    {
        return Album::with(['artist', 'genre', 'label', 'media'])
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($album) {
                if ($album->hasMedia('cover_art')) {
                    $album->cover_thumbnail = $album->getFirstMediaUrl('cover_art', 'thumb');
                    $album->cover_url = $album->getFirstMediaUrl('cover_art');
                }
                return $album;
            });
    }
}