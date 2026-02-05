<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthenController;
use App\Http\Controllers\Admin\ServciceRequestController;
use App\Http\Controllers\Admin\LogsController;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('login' ,[AuthenController::class , 'login'])->name('login');

Route::group(['middleware' => ['auth:api'], 'prefix' => 'auth'], function () {

    Route::get('/test', function(Request $request){
        return response()->json(['message' => 'check auth route']);
    });

    Route::get('me', [AuthenController::class , 'me']);

    Route::patch('me', [AuthenController::class , 'updateProfile']);
    // for all the auth route set here with auth middleware
    Route::get('service_request/types',[ServciceRequestController::class, 'getTypesx']);
    Route::apiResource('service_request', ServciceRequestController::class)->except('put');

    Route::get('logs', [LogsController::class, 'index']);

    });



// to save time calligng multiple apis , i set it into one api ,
// Route::get('service_request/statues', [ServciceRequestController::class, 'getTypesx']);
// Route::get('service_request/priority', [ServciceRequestController::class, 'getPriority']);
// Route::get('service_request/category', [ServciceRequestController::class, 'getTypesx']);

