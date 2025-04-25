<?php

namespace App\Services;

use App\Models\Platform;

class PlatformService
{
    public function store(array $data)
    {
        return Platform::create($data);
    }

    public function update(array $data, Platform $platform)
    {
        return $platform->update($data);
    }

    public function destroy(Platform $platform)
    {
        return $platform->delete();
    }

    public function findAll()
    {
        return Platform::latest()->get();
    }

}