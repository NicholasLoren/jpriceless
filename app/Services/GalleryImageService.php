<?php

namespace App\Services;
use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
class GalleryImageService
{
    public function store(array $data)
    {
        return GalleryImage::create($data);
    }

    public function update(array $data, GalleryImage $galleryImage)
    {
        return $galleryImage->update($data);
    }

    public function destroy(GalleryImage $galleryImage)
    {
        return $galleryImage->delete();
    }

    public function findAll(GalleryAlbum $galleryAlbum, $perPage = 20, $search = '')
    {
        return $galleryAlbum->images()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($image) {
                // Add media URLs to the image
                if ($image->hasMedia('image')) {
                    $image->thumbnail = $image->getFirstMediaUrl('image', 'thumb');
                    $image->url = $image->getFirstMediaUrl('image');
                }
                return $image;
            });
    }
    public function all(GalleryAlbum $galleryAlbum)
    {
        return $galleryAlbum->images()->orderBy('title')->get();
    }

}