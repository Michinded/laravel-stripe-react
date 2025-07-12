<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        // Get the final redirected URL from Lorem Picsum
        // Note: This will make a request to Picsum every time you create a product.
        // If this take too long, you can use a static URL instead or another image service
        $imageUrl = $this->getPicsumImageUrl();

        return [
            'name' => $this->faker->word(),
            'image' => $imageUrl,
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 1, 1000), // Random price between 1 and 1000
        ];
    }

    /**
     * Get a random image URL from Lorem Picsum by following the redirect
     */
    private function getPicsumImageUrl(): string
    {
        // Configure the Picsum URL
        // You can change the dimensions as needed
        // Example: 'https://picsum.photos/400/300'
        // This URL will redirect to a random image each time
        // Visit https://picsum.photos/ for more options
        $picsumUrl = 'https://picsum.photos/400/300';
        
        // Create a context to follow redirects and get the final URL
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'follow_location' => 0, // Don't follow redirects automatically
                'timeout' => 10,
            ]
        ]);

        // Make the request and get headers
        $headers = get_headers($picsumUrl, 1, $context);
        
        // Check if we got a redirect (301 or 302)
        if (isset($headers['Location'])) {
            return $headers['Location'];
        }
        
        // Fallback if no redirect found
        return $picsumUrl;
    }
}
