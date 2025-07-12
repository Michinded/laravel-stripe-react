<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    /**
     * Boot the model and its traits.
     * 
     * This method automatically creates a Stripe customer for every new user
     * by registering a "created" event listener. The listener calls
     * createAsStripeCustomer() on each newly created user instance.
     * 
     * NOTE: This affects ALL user creation across the application.
     * If you need selective Stripe customer creation, consider:
     * 1. Removing this global listener
     * 2. Manually calling createAsStripeCustomer() where needed
     * 3. Creating a separate trait or service for Stripe customer creation
     * 
     * @see \Laravel\Cashier\Billable::createAsStripeCustomer()
     * @return void
     */
    // Override create method to create stripe customer
    protected static function booted(): void
    {
        static::created(function ($user) {
            // Create a Stripe customer when a new user is created
            $user->createAsStripeCustomer();
        });
    }
}
