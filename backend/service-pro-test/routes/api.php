<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthenController;
use App\Http\Controllers\Admin\ServciceRequestController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login' ,[AuthenController::class , 'login'])->name('login');

Route::apiResource('service_request', ServciceRequestController::class)->except('put');