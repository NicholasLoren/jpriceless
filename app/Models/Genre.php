<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\GeneratesSlug;

class Genre extends Model
{
    use GeneratesSlug;
    
    protected $fillable = ['name','slug'];
    
    public function slugSourceField()
    {
        return 'name';
    }
}
