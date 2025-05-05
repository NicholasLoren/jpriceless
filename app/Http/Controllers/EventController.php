<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Controllers\Controller;
use App\Models\Tour;
use App\Services\EventService;
use Illuminate\Http\Request;

class EventController extends Controller
{

    public function __construct(public EventService $eventService){}
    /**
     * Display a listing of the resource.
     */
    public function index(Tour $tour)
    {
        return inertia('Events/Index', [
            'events' => $this->eventService->findAll(request()->perPage ?? 20, request()->search),
            'tour' => $tour,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Tour $tour)
    {
        return inertia('Events/Form', [
            'event' => new Event(),
            'tour' => $tour,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Tour $tour)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'venue' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'required|string',
            'ticket_url' => 'required|url',
            'sold_out' => 'boolean',
            'free_entry' => 'boolean',
            'organizer' => 'required|string|max:255',
            'featured_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $validated['tour_id'] = $tour->id;
        $event = $this->eventService->store($validated);
        if ($request->hasFile('featured_image')) {
            $event->addMedia($request->file('featured_image'))->toMediaCollection('featured_image');
        }
        return redirect()->route('tours.events.edit', [$tour, $event])->with('success', 'Event created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tour $tour,Event $event)
    {
        return inertia('Events/Show', [
            'event' => $event->load('media'),
            'tour' => $tour,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tour $tour, Event $event)
    {
        return inertia('Events/Form', [
            'event' => $event->load('media'),
            'tour' => $tour,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Tour $tour, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'venue' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'description' => 'required|string',
            'ticket_url' => 'required|url',
            'sold_out' => 'boolean',
            'free_entry' => 'boolean',
            'organizer' => 'required|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $this->eventService->update($validated, $event);
        if ($request->hasFile('featured_image')) {
            $event->addMedia($request->file('featured_image'))->toMediaCollection('featured_image');
        }
        return redirect()->back()->with('success', 'Event updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tour $tour, Event $event)
    {
        $this->eventService->destroy($event);
        return redirect()->back()->with('success', 'Event deleted successfully!');
    }
}
