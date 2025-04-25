<?php

namespace App\Models;

use App\Traits\GeneratesSlug;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use GeneratesSlug;

    protected $fillable = ['name', 'slug'];

    public function slugSourceField()
    {
        return 'name';
    }
}
