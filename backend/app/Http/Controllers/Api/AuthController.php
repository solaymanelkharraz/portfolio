<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'current_password' => 'required',
            'new_password' => 'nullable|min:6',
        ]);

        $user = $request->user();

        if (! Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'The provided current password is incorrect.',
                'errors' => ['current_password' => ['Incorrect current password.']]
            ], 422);
        }

        $user->email = $request->email;
        if ($request->filled('new_password')) {
            $user->password = Hash::make($request->new_password);
        }
        $user->save();

        return response()->json([
            'message' => 'Settings updated successfully.',
            'user' => $user,
        ]);
    }
}
