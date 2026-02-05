<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\UserResource;

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
            'user' => auth()->user()
        ]);
    }

    public function me()
    {
        $user = auth()->user();

        return response()->json(new UserResource($user));
    }
    
    public function login(LoginRequest $login){
        $credentials = $login->validated();

        // return $credentials;
         if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);

        // for laravel 12 some cors issue i am afcing , for that cookie auth wanst set . i am using lcoal storage for the token managemnt
    //     return response()->json([
    //         'message' => 'Authenticated'
    //         ])->cookie(
    //             'token',           
    //             // respondWithToken($token),            
    //             $token,            
    //             60,                
    //             '/',               
    //             null,              
    //             true,              
    //             true,              
    //             false,             
    //             'Strict'           
    //         );
    }   

    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,'.$user->id,
            'password' => 'sometimes|string|min:6|confirmed',
            'avatar' => 'sometimes|image|max:2048',
        ]);

        // if ($request->has('name')) {
        //     $user->name = $request->input('name');
        // }

        // if ($request->has('email')) {
        //     $user->email = $request->input('email');
        // }

        // if ($request->has('password')) {
        //     $user->password = bcrypt($request->input('password'));
        // }

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = time() . '.' . $avatar->getClientOriginalExtension();
            $path = $request->file('avatar')->store('avatars', 'public');
            // $avatar->move(public_path('avatars'), $avatarName);

            $user->avatar = $path;
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user], 200);
    }


}
