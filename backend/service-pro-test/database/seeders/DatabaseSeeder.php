<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('Password@123'),
            'Avatar' => 'https://placehold.co/600x400?text=Hello+World'
        ]);
    }
}
