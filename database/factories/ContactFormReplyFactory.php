<?php

namespace Database\Factories;

use App\Models\ContactForm;
use App\Models\ContactFormReply;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactFormReply>
 */
class ContactFormReplyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ContactFormReply::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contact_form_id' => ContactForm::factory()->replied(),
            'subject' => $this->faker->sentence(),
            'message' => $this->faker->paragraphs(2, true),
            'replied_by' => $this->faker->randomElement([1, 1]), // Assuming user IDs 1 and 2 exist
            'created_at' => function (array $attributes) {
                // Get the associated contact form
                $contactForm = ContactForm::find($attributes['contact_form_id']);
                // Create a reply date after the contact form was created
                return $this->faker->dateTimeBetween($contactForm->created_at, 'now');
            },
            'updated_at' => function (array $attributes) {
                return $attributes['created_at'];
            },
        ];
    }
}