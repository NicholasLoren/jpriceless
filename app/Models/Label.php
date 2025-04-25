<?php

namespace App\Models;

use App\Traits\GeneratesSlug;
use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    use GeneratesSlug;

    protected $fillable = [
        'name',
        'description',
        'website',
    ];

    public function slugSourceField()
    {
        return 'name';
    }
}
