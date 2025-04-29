<?php

namespace App\Services;

use App\Models\Label;

class LabelService
{
    public function store(array $data)
    {
        return Label::create($data);
    }

    public function update(array $data, Label $label)
    {
        return $label->update($data);
    }

    public function destroy(Label $label)
    {
        return $label->delete();
    }

    public function findAll($perPage = 20, $search = '')
    {
        $query = Label::query();

        // Apply search if provided
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('website', 'like', "%{$search}%");
            });
        }

        // Apply default sort
        $query->latest();

        // Get paginated results
        return $query->paginate($perPage)->through(
            fn($artist) =>
            [
                'id' => $artist->id,
                'name' => $artist->name,
                'description' => $artist->description,
                'website' => $artist->website,
                'created_at' => $artist->created_at,
            ]
        );
    }

    public function all()
    {
        return Label::orderBy('name')->get();
    }

}