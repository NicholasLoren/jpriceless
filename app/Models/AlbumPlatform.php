<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlbumPlatform extends Model
{
    protected $fillable = ['album_id', 'platform_id', 'url'];

    public function album()
    {
        return $this->belongsTo(Album::class, 'album_id');
    }

    public function platform()
    {
        return $this->belongsTo(Platform::class, 'platform_id');
    }
}
