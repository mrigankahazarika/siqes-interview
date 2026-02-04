<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthenController;
use App\Http\Controllers\Admin\ServciceRequestController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login' ,[AuthenController::class , 'login'])->name('login');

// to save time calligng multiple apis , i set it into one api ,
// Route::get('service_request/statues', [ServciceRequestController::class, 'getTypesx']);
// Route::get('service_request/priority', [ServciceRequestController::class, 'getPriority']);
// Route::get('service_request/category', [ServciceRequestController::class, 'getTypesx']);

Route::get('service_request/types',[ServciceRequestController::class, 'getTypesx']);
Route::apiResource('service_request', ServciceRequestController::class)->except('put');
