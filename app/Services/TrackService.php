<?php

namespace App\Services;

use App\Models\Album;
use App\Models\Track;

class TrackService
{ 
    public function store(array $data){
        return Track::create($data);
    } 

    public function update(array $data, Track $track){
        return $track->update($data);
    }

    public function destroy(Track $track){
        return $track->delete();    
    }

    public function all(){
        return Track::all();
    }

    public function findAll(Album $album, $perPage = 20, $search = '')
    {
        $query = $album->tracks();

        // Apply search if provided
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('track_number', 'like', "%{$search}%");
            });
        }

        // Apply default sort by track number
        $query->orderBy('track_number');

        // Get paginated results with artist relationships and transform
        return $query->with('artists')->paginate($perPage)->through(function ($track) {
            return [
                'id' => $track->id,
                'title' => $track->title,
                'track_number' => $track->track_number,
                'duration' => $track->duration,
                'purchasable' => $track->purchasable,
                'price' => $track->price,
                'downloadable' => $track->downloadable,
                'audio' => $track->getFirstMediaUrl('audio'),
                'primary_artist' => $track->primaryArtist() ? [
                    'id' => $track->primaryArtist()->id,
                    'name' => $track->primaryArtist()->name
                ] : null,
                'featured_artists' => $track->featuredArtists()->get()->map(function ($artist) {
                    return [
                        'id' => $artist->id,
                        'name' => $artist->name,
                        'role' => $artist->pivot->role,
                        'order' => $artist->pivot->order
                    ];
                }),
                'all_artists' => $track->artists->map(function ($artist) {
                    return [
                        'id' => $artist->id,
                        'name' => $artist->name,
                        'role' => $artist->pivot->role,
                        'order' => $artist->pivot->order
                    ];
                }),
                'created_at' => $track->created_at,
            ];
        })->withQueryString();
    }

}