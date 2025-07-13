<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display the payment management page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        //Refresh user authentication to ensure the user is logged in
        auth()->user()->refresh();

        //If the user has payment methods, retrieve them
        if (auth()->user()->paymentMethods()) {
            $paymentMethods = auth()->user()->paymentMethods();
        } else {
            $paymentMethods = [];
        }

        return Inertia::render('payment/index', [
            'stripeKey' => env('STRIPE_KEY'),
            'paymentMethods' => $paymentMethods,
        ]);
    }

    /**
     * Function to generate a new setup intent.
     * This can be used to create a new payment method.
     */
    public function createSetupIntent(){

        // Refresh user authentication to ensure the user is logged in
        auth()->user()->refresh();
        
        // Ensure the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // Check if the user has a Stripe customer ID
        if (!auth()->user()->stripe_id) {
            return response()->json(['error' => 'No Stripe customer ID found'], 400);
        }

        // Create a new setup intent for the authenticated user
        $intent = auth()->user()->createSetupIntent();

        return response()->json([
            'client_secret' => $intent->client_secret,
        ]);
    }
}
