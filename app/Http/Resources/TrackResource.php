<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class TrackResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'track_number' => $this->track_number,
            'duration' => $this->duration,
            'purchasable' => $this->purchasable,
            'price' => $this->price,
            'downloadable' => $this->downloadable,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Track media URLs
            'audio' => $this->when($this->getFirstMedia('audio'), function () {
                return [
                    'original_url' => $this->getFirstMediaUrl('audio'),
                    'file_name' => $this->getFirstMedia('audio')->file_name,
                    'mime_type' => $this->getFirstMedia('audio')->mime_type,
                ];
            }),

            'cover_art' => $this->when($this->getFirstMedia('cover_art'), function () {
                return [
                    'original_url' => $this->getFirstMediaUrl('cover_art'),
                    'thumb_url' => $this->getFirstMediaUrl('cover_art', 'thumb'),
                    'large_url' => $this->getFirstMediaUrl('cover_art', 'large'),
                ];
            }),

            // Album with its cover art
            'album' => $this->when($this->album, function () {
                return [
                    'id' => $this->album->id,
                    'title' => $this->album->title,
                    'total_tracks' => $this->album->tracks->count(),
                    'release_date' => $this->album->release_date,
                    'cover_art' => $this->album->getFirstMedia('cover_art') ? [
                        'original_url' => $this->album->getFirstMediaUrl('cover_art'),
                        'thumb_url' => $this->album->getFirstMediaUrl('cover_art', 'thumb'),
                        'large_url' => $this->album->getFirstMediaUrl('cover_art', 'large'),
                    ] : null,
                ];
            }),

            // Primary artist
            'primary_artist' => $this->when($this->primaryArtist(), function () {
                $artist = $this->primaryArtist();
                return [
                    'id' => $artist->id,
                    'name' => $artist->name,
                    'image' => $artist->getFirstMedia('image') ? [
                        'thumb_url' => $artist->getFirstMediaUrl('image', 'thumb'),
                    ] : null,
                ];
            }),

            // Featured artists
            'featured_artists' => $this->featuredArtists()->get()->map(function ($artist) {
                return [
                    'id' => $artist->id,
                    'name' => $artist->name,
                    'role' => $artist->pivot->role,
                    'order' => $artist->pivot->order,
                    'image' => $artist->getFirstMedia('image') ? [
                        'thumb_url' => $artist->getFirstMediaUrl('image', 'thumb'),
                    ] : null,
                ];
            }),

            // All artists
            'artists' => $this->whenLoaded('artists', function () {
                return $this->artists->map(function ($artist) {
                    return [
                        'id' => $artist->id,
                        'name' => $artist->name,
                        'role' => $artist->pivot->role,
                        'order' => $artist->pivot->order,
                        'image' => $artist->getFirstMedia('image') ? [
                            'thumb_url' => $artist->getFirstMediaUrl('image', 'thumb'),
                        ] : null,
                    ];
                });
            }),
        ];
    }
}
