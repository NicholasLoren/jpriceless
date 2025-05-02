<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Track extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'album_id',
        'title',
        'track_number',
        'duration',
        'purchasable',
        'price',
        'downloadable'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('audio')
            ->singleFile()
            ->acceptsMimeTypes(['audio/mpeg', 'audio/wav', 'audio/ogg']);

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

    public function artists()
    {
        return $this->belongsToMany(Artist::class)
            ->withPivot('role', 'order')
            ->withTimestamps()
            ->orderBy('artist_track.order');
    }

    // Helper method to get primary artist
    public function primaryArtist()
    {
        return $this->artists()->orderBy('artist_track.order')->first();
    }

    // Helper method to get featured artists
    public function featuredArtists()
    {
        return $this->artists()
            ->wherePivot('role', 'featured')
            ->orderBy('artist_track.order');
    }

    public function album()
    {
        return $this->belongsTo(Album::class);
    }

    
}
