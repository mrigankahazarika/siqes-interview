<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;

class AuthenController extends Controller
{

    //   public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login']]);
    // }

     protected function respondWithToken($token)
    {
        return response()->json([
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'access_token' => $token,
        ]);
    }
    
    public function login(LoginRequest $login){
        $credentials = $login->validated();

        // return $credentials;
         if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // return $this->respondWithToken($token);
        return response()->json([
            'message' => 'Authenticated'
            ])->cookie(
                'token',           
                respondWithToken($token),            
                60,                
                '/',               
                null,              
                true,              
                true,              
                false,             
                'Strict'           
            );
    }   
}
