<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Payment routes
Route::middleware(['auth'])->prefix('payment')->group(function () {
    Route::get('/', [PaymentController::class, 'index'])->name('payment.index');
    Route::get('/create-setup-intent', [PaymentController::class, 'createSetupIntent'])->name('payment.createSetupIntent');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
