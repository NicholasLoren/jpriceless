<?php

namespace App\Http\Controllers;

use App\Models\Label;
use App\Http\Controllers\Controller;
use App\Services\LabelService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LabelController extends Controller
{

    public function __construct(public LabelService $labelService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Labels/Index', [
            'labels' => $this->labelService->findAll(),
            'label' => new Label
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Labels/Index', [
            'labels' => $this->labelService->findAll(),
            'label' => new Label
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'description' => 'required',
            'website' => 'required|url',
        ]);
        $label = $this->labelService->store($validated);

        return redirect()->route('labels.edit', $label)->with('success', 'Label created successfully.');
    }
 

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Label $label)
    {
        return Inertia::render('Labels/Index', [
            'labels' => $this->labelService->findAll(),
            'label' => $label
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Label $label)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'description' => 'required',
            'website' => 'required|url',
        ]);
         $this->labelService->update($validated, $label);

        return redirect()->route('labels.edit', $label)->with('success', 'Label updated successfully.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Label $label)
    {
        $this->labelService->destroy($label); 
        return redirect()->route('labels.index')->with('success', 'Label deleted successfully.');
    }
}
