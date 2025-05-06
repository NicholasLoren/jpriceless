<?php

namespace App\Mail;

use App\Models\ContactFormReply;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reply;

    /**
     * Create a new message instance.
     */
    public function __construct(ContactFormReply $reply)
    {
        $this->reply = $reply;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject($this->reply->subject)
            ->view('emails.contact-form-reply')
            ->with([
                'reply' => $this->reply,
                'contactForm' => $this->reply->contactForm,
            ]);
    }
}