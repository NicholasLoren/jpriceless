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

    public function findAll()
    {
        return Label::latest()->get();
    }

}