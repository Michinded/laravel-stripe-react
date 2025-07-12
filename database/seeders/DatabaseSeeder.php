<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ⚠️ NOTE: IF YOU UNCOMMENT THE USER FACTORY, MAKE SURE TO SET UP YOUR STRIPE KEYS IN .env FILE
        // AND THIS WILL CREATE STRIPE CUSTOMERS FOR EACH USER. BE CAREFUL WITH THIS IN PRODUCTION AS IT WILL CREATE MANY STRIPE CUSTOMERS.

        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Create random products
        $this->command->info('Creating random products, please wait...');
        Product::factory(10)->create();
        $this->command->info('Random products created successfully!');

        // You can also create specific products if needed
        // Product::factory()->create([
        //     'name' => 'Sample Product',
        //     'image' => 'https://picsum.photos/200',
        //     'description' => 'This is a sample product description.',
        //     'price' => 19.99,
        // ]);

    }
}
