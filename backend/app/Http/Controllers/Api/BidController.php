<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bid;
use Illuminate\Http\Request;

class BidController extends Controller
{
    /**
     * Display a listing of the bids (Protected).
     */
    public function index()
    {
        return response()->json(Bid::orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created bid (Public).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'deal_type' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $bid = Bid::create($validated);

        return response()->json([
            'message' => 'Bid submitted successfully!',
            'bid' => $bid
        ], 201);
    }

    /**
     * Remove the specified bid (Protected).
     */
    public function destroy($id)
    {
        $bid = Bid::findOrFail($id);
        $bid->delete();

        return response()->json(['message' => 'Bid deleted successfully.']);
    }
}
