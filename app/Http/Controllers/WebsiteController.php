<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    public function home(){
        return Inertia::render('Website/Home');
    }
}
