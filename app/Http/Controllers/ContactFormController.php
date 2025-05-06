<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormReplyMail;
use App\Models\ContactForm;
use App\Http\Controllers\Controller;
use App\Services\ContactFormService;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactFormController extends Controller
{

    public function __construct(public ContactFormService $contactFormService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('ContactForms/Index', [
            'contactForms' => $this->contactFormService->findAll(request('per_page'), request('search')),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactForm $contactForm)
    {
        return inertia('ContactForms/Show', [
            'contactForm' => $contactForm->load('contactFormReply')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContactForm $contactForm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContactForm $contactForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactForm $contactForm)
    {
        $this->contactFormService->destroy($contactForm);
        return redirect()->back()->with('success', 'Contact form deleted successfully!');
    }

    /**
     * Mark the contact form as spam.
     */
    public function markAsSpam(ContactForm $contactForm)
    {
        // Update the status to spam
        $contactForm->status = 'spam';
        $contactForm->save();

        return redirect()->back()
            ->with('success', 'Contact form marked as spam successfully.');
    }

    /**
     * Store a reply for the contact form.
     */
    public function storeReply(Request $request, ContactForm $contactForm)
    {
        // Validate the request
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Set the replied_by field to the current user's ID
        $validated['replied_by'] = Auth::id();

        $reply = $contactForm->contactFormReply()->updateOrCreate($validated);

        $this->contactFormService->update([
            'status' => 'replied',
        ], $contactForm);
        // Send the email reply (you would implement this in a real application)
        // Send the email reply
        try {
            Mail::to($contactForm->email)->send(new ContactFormReplyMail($reply));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Failed to send email: ' . $e->getMessage());

            return redirect()->route('contact-forms.show', $contactForm->id)
                ->with('error', 'Reply saved but email delivery failed. Please check your email configuration.');
        }

        return redirect()->route('contact-forms.show', $contactForm->id)
            ->with('success', 'Reply sent successfully.');
    }
}
