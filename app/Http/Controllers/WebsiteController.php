<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ContactFormService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    protected ContactFormService $contactFormService;

    public function __construct(){
        $this->contactFormService = new ContactFOrmService();
    }
    public function home(){
        return Inertia::render('Website/Home');
    }
    public function about(){
        return Inertia::render('Website/About');
    }
    public function contact(){
        return Inertia::render('Website/Contact');
    }

    public function storeContact(Request $request){
        $validated = $request->validate([
            'name'=>'string|required',
            'email'=>'email|required',
            'subject'=>'string|required',
            'message'=>'string|required',
        ]);

        //store the contact form
        $this->contactFormService->store($validated);
        return redirect()->back()->with('success', 'Your feedback has been submitted successfully!');
    }
    public function blogs(){
        return Inertia::render('Website/Blogs');
    }
    public function tours(){
        return Inertia::render('Website/Tours');
    }
    public function singleTour(){
        return Inertia::render('Website/TourDetails');
    }
    public function gallery(){
        return Inertia::render('Website/Gallery');
    } 
    public function discography(){
        return Inertia::render('Website/Discography');
    } 
    public function singleBlog(){
        return Inertia::render('Website/BlogPostDetails');
    } 
}
