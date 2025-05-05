<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesSlug;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
class Event extends Model implements HasMedia
{
    use GeneratesSlug;
    use InteractsWithMedia;
    protected $fillable = [
        'tour_id',
        'title',
        'slug',
        'event_date',
        'venue',
        'city',
        'country',
        'address',
        'latitude',
        'longitude',
        'description',
        'ticket_url',
        'sold_out',
        'free_entry',
        'organizer',
    ];

    protected $casts = [
        'event_date' => 'date',
        'sold_out' => 'boolean',
        'free_entry' => 'boolean',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')
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
}
