<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Group;

class GroupUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $groups = Group::all();

        foreach ($groups as $group) {
            $admin->groups()->attach($group->id);
        }

        $user1 = User::create([
            'name' => 'João da Silva',
            'email' => 'joao@example.com',
            'password' => bcrypt('password'),
        ]);
        $user1->groups()->attach([1, 3]);

        $user2 = User::create([
            'name' => 'Maria Souza',
            'email' => 'maria@example.com',
            'password' => bcrypt('password'),
        ]);
        $user2->groups()->attach([3, 4]);
    }
}
