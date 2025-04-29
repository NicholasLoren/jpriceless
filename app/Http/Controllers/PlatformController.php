<?php

namespace App\Http\Controllers;

use App\Models\Platform;
use App\Http\Controllers\Controller;
use App\Services\PlatformService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\BrandIconService;

class PlatformController extends Controller
{
    protected $iconService;
    public PlatformService $platformService;
    public function __construct()
    {
        $this->iconService = new BrandIconService;
        $this->platformService = new PlatformService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $search = $request->input('search', '');
        return Inertia::render('Platforms/Index', [
            'platforms' => $this->platformService->findAll($perPage,$search),
            'platform' => new Platform
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Platforms/Index', [
            'platforms' => $this->platformService->findAll(),
            'platform' => new Platform
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'website_url' => 'required|url'
        ]);

        $platform = $this->platformService->store($validated);
        // Fetch icon right away
        $this->iconService->fetchIconForPlatform($platform);

        return redirect()->route('platforms.edit', $platform)->with('success', 'Platform created successfully');
    }
 

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,Platform $platform)
    {
        $perPage = $request->input('per_page', 20);
        $search = $request->input('search', '');
        return Inertia::render('Platforms/Index', [
            'platforms' => $this->platformService->findAll($perPage,$search),
            'platform' => $platform
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Platform $platform)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'website_url' => 'required|url'
        ]);

        $this->platformService->update($validated,$platform);
        // Fetch icon right away
        $this->iconService->fetchIconForPlatform($platform);
        
        return redirect()->route('platforms.edit', $platform)->with('success', 'Platform updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Platform $platform)
    {
        $this->platformService->destroy($platform);

        return redirect()->route('platforms.index')->with('success', 'Platform deleted successfully.');
    }
}
