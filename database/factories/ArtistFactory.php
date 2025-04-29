<?php

namespace Database\Factories;

use App\Models\Artist;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artist>
 */
class ArtistFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Artist::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->name() . ' ' . $this->faker->lastName();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'bio' => $this->faker->paragraphs(2, true),
            'website' => $this->faker->url(),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Artist $artist) {
            // Generate a random image for the artist's profile
            $imageUrl = 'https://picsum.photos/id/' . rand(1, 1000) . '/300/300.jpg';

            // Download and add to media library
            $artist->addMediaFromUrl($imageUrl)
                ->toMediaCollection('profile_image');
        });
    }
}