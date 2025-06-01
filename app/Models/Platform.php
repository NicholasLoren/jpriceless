<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Platform extends Model
{
    protected $fillable = ['name', 'website_url','icon_url'];


     /**
     * Get the domain from the website URL
     */
    public function getDomainAttribute()
    {
        if (empty($this->website_url)) {
            return null;
        }
        
        return parse_url($this->website_url, PHP_URL_HOST);
    }

    public function albums()
    {
        return $this->belongsToMany(Album::class, 'album_platforms')
            ->withPivot('url')
            ->withTimestamps();
    }
}
