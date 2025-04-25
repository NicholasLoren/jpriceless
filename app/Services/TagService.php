<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{
    public function store(array $data)
    {
        return Tag::create($data);
    }

    public function update(array $data, Tag $tag)
    {
        return $tag->update($data);
    }

    public function destroy(Tag $tag)
    {
        return $tag->delete();
    }

    public function findAll()
    {
        return Tag::latest()->get();
    }

}