<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactFormReply extends Model
{
    use HasFactory;
    protected $fillable = [
        'contact_form_id',
        'message',
        'subject',
        'replied_by',
    ];

    public function contactForm()
    {
        return $this->belongsTo(ContactForm::class);
    }

    public function repliedBy()
    {
        return $this->belongsTo(User::class, 'replied_by');
    }
}
