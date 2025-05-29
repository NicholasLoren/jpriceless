<?php

namespace App\Services;

use App\Models\ContactForm;

class ContactFormService
{
    public function store(array $data)
    {
        return ContactForm::create($data);
    }

    public function update(array $data, ContactForm $contactForm)
    {
        return $contactForm->update($data);
    }

    public function destroy(ContactForm $contactForm)
    {
        return $contactForm->delete();
    }


    public function findAll($perPage = 20, $search = '')
    {
        return ContactForm::where('name', 'like', "%$search%")
            ->orWhere('email', 'like', "%$search%")
            ->orWhere('subject', 'like', "%$search%")
            ->orWhere('message', 'like', "%$search%")
            ->orWhere('status', 'like', "%$search%")
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }
    public function all()
    {
        return ContactForm::orderBy('created_at', 'desc')->get();
    }

}