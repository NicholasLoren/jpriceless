<?php

namespace App\Services;

use App\Models\GalleryAlbum;

class GalleryAlbumService
{ 
    public function store(array $data){
        return GalleryAlbum::create($data);
    } 

    public function update(array $data, GalleryAlbum $galleryAlbum){
        return $galleryAlbum->update($data);
    }

    public function destroy(GalleryAlbum $galleryAlbum){
        return $galleryAlbum->delete();
    }

    public function findAll($perPage = 20, $search=''){
        return GalleryAlbum::with(['images'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('is_public', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($album) {
                // Add media URLs to the album
                if ($album->hasMedia('cover_image')) {
                    $album->cover_thumbnail = $album->getFirstMediaUrl('cover_image', 'thumb');
                    $album->cover_url = $album->getFirstMediaUrl('cover_image');
                }
                return $album;
            });
    }
    public function all(){
        return GalleryAlbum::orderBy('title')->get();
    }

}