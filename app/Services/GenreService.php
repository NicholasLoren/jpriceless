<?php

namespace App\Services;

use App\Models\Genre;

class GenreService
{ 
    public function store(array $data){
        return Genre::create($data);
    } 

    public function update(array $data, Genre $genre){
        return $genre->update($data);
    }

    public function destroy(Genre $genre){
        return $genre->delete();
    }
    public function all()
    {
        return Genre::orderBy('name')->get();
    }

    public function findAll($perPage = 20, $search = '')
    {
        $query = Genre::query();

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

}