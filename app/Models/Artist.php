<?php

namespace App\Models;

use App\Traits\GeneratesSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Artist extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    use GeneratesSlug;
    protected $fillable = [
        'name',
        'slug',
        'bio',
        'website'
    ];

    protected $appends = [
        'profile_image_url',
        'profile_image_thumb_url',
        'profile_image_large_url'
    ];

    public function slugSourceField()
    {
        return 'name';
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('profile_image')
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

    public function getProfileImageUrlAttribute()
    {
        return $this->getFirstMediaUrl('profile_image');
    }

    public function getProfileImageThumbUrlAttribute()
    {
        return $this->getFirstMediaUrl('profile_image', 'thumb');
    }

    public function getProfileImageLargeUrlAttribute()
    {
        return $this->getFirstMediaUrl('profile_image', 'large');
    }

    // The inverse relationship to tracks
    public function tracks()
    {
        return $this->belongsToMany(Track::class)
            ->withPivot('role', 'order')
            ->withTimestamps();
    }

    // Get all albums that this artist has tracks on
    public function albums()
    {
        return Album::whereHas('tracks.artists', function ($query) {
            $query->where('artists.id', $this->id);
        });
    }

    // Get tracks where this artist is the primary artist
    public function primaryTracks()
    {
        return $this->tracks()
            ->wherePivot('order', 1)
            ->orWherePivot('role', 'primary');
    }
}
