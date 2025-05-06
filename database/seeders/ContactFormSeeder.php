<?php

namespace Database\Seeders;

use App\Models\ContactForm;
use App\Models\ContactFormReply;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 pending contact form submissions
        ContactForm::factory()
            ->count(20)
            ->pending()
            ->create();

        // Create 15 contact forms with replies
        ContactForm::factory()
            ->count(15)
            ->replied()
            ->has(ContactFormReply::factory())
            ->create();

        // Create 5 spam contact form submissions
        ContactForm::factory()
            ->count(5)
            ->spam()
            ->create();
    }
}