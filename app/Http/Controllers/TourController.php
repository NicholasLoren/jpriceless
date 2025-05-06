<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Http\Controllers\Controller;
use App\Services\TourService;
use Illuminate\Http\Request;

class TourController extends Controller
{

    public function __construct(public TourService $tourService)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Tours/Index', [
            'tours' => $this->tourService->findAll(request()->per_page ?? 20, request()->search),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Tours/Form', [
            'tour' => new Tour(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'featured_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $tour = $this->tourService->store($validated);
        if ($request->hasFile('featured_image')) {
            $tour->addMedia($request->file('featured_image'))->toMediaCollection('featured_image');
        }
        return redirect()->route('tours.edit', $tour)->with('success', 'Tour created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tour $tour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tour $tour)
    {
        return inertia('Tours/Form', [
            'tour' => $tour->load('media'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tour $tour)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $this->tourService->update($validated, $tour);
        if ($request->hasFile('featured_image')) {
            $tour->addMedia($request->file('featured_image'))->toMediaCollection('featured_image');
        }
        return redirect()->route('tours.edit', $tour)->with('success', 'Tour updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tour $tour)
    {
        $this->tourService->destroy($tour);
        return redirect()->route('tours.index')->with('success', 'Tour deleted successfully!');
    }
}
