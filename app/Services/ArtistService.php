<?php

namespace App\Services;

use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistService
{
    /**
     * Store a new artist
     * 
     * @param array $data
     * @return Artist
     */
    public function store(array $data)
    {
        return Artist::create($data);
    }

    /**
     * Update an existing artist
     * 
     * @param array $data
     * @param Artist $artist
     * @return bool
     */
    public function update(array $data, Artist $artist)
    {
        return $artist->update($data);
    }

    /**
     * Delete an artist
     * 
     * @param Artist $artist
     * @return bool|null
     */
    public function destroy(Artist $artist)
    {
        return $artist->delete();
    }

    /**
     * Get all artists (now deprecated - use findAllPaginated instead)
     * 
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function findAll()
    {
        return Artist::latest()->get()->map(function ($artist) {
            return $this->prepareArtistForDisplay($artist);
        });
    }

    /**
     * Get paginated list of artists with optional search
     * 
     * @param int $perPage
     * @param string $search
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findAllPaginated($perPage = 20, $search = '')
    {
        $query = Artist::query();

        // Apply search if provided
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('bio', 'like', "%{$search}%")
                    ->orWhere('website', 'like', "%{$search}%");
            });
        }

        // Apply default sort
        $query->latest();

        // Get paginated results
        return $query->paginate($perPage)->through(function ($artist) {
            return $this->prepareArtistForDisplay($artist);
        });
    }

    /**
     * Prepare artist for display by adding media URLs
     * 
     * @param Artist $artist
     * @return array
     */
    protected function prepareArtistForDisplay($artist)
    {
        return [
            'id' => $artist->id,
            'name' => $artist->name,
            'bio' => $artist->bio,
            'website' => $artist->website,
            'profile_image_url' => $artist->getFirstMediaUrl('profile_image'),
            'profile_image_thumb_url' => $artist->getFirstMediaUrl('profile_image', 'thumb'),
            'created_at' => $artist->created_at,
            'updated_at' => $artist->updated_at,
        ];
    }
}