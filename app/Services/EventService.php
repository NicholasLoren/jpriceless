<?php

namespace App\Services;

use App\Models\Event;

class EventService
{
    public function store(array $data)
    {
        return Event::create($data);
    }

    public function update(array $data, Event $event)
    {
        return $event->update($data);
    }

    public function destroy(Event $event)
    {
        return $event->delete();
    }


    public function findAll($perPage = 20, $search = '')
    {
        return Event::with(['tour'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('event_date', 'like', "%{$search}%")
                    ->orWhere('venue', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%")
                    ->orWhere('country', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('latitude', 'like', "%{$search}%")
                    ->orWhere('longitude', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('ticket_url', 'like', "%{$search}%")
                    ->orWhere('sold_out', 'like', "%{$search}%")
                    ->orWhere('free_entry', 'like', "%{$search}%")
                    ->orWhere('organizer', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($event) {
                // Add media URLs to the event
                if ($event->hasMedia('featured_image')) {
                    $event->cover_thumbnail = $event->getFirstMediaUrl('featured_image', 'thumb');
                    $event->cover_url = $event->getFirstMediaUrl('featured_image');
                }
                return $event;
            });
    }
    public function all()
    {
        return Event::orderBy('title')->get();
    }

}