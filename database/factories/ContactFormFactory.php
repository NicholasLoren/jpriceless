<?php

namespace Database\Factories;

use App\Models\ContactForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContactForm>
 */
class ContactFormFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ContactForm::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'subject' => $this->faker->sentence(),
            'message' => $this->faker->paragraphs(3, true),
            'status' => $this->faker->randomElement(['pending', 'replied', 'spam']),
            'created_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'updated_at' => function (array $attributes) {
                return $this->faker->dateTimeBetween($attributes['created_at'], 'now');
            },
        ];
    }

    /**
     * Indicate that the contact form is pending.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function pending()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'pending',
            ];
        });
    }

    /**
     * Indicate that the contact form has been replied to.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function replied()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'replied',
            ];
        });
    }

    /**
     * Indicate that the contact form is marked as spam.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function spam()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'spam',
            ];
        });
    }
}