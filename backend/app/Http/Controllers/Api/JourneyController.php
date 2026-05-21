<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CareerEvent;
use Illuminate\Http\Request;

class JourneyController extends Controller
{
    /**
     * Fetch all journey events.
     */
    public function index()
    {
        return response()->json(CareerEvent::orderBy('year', 'asc')->get());
    }

    /**
     * Store a new journey event.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'side' => 'required|string|in:left,right',
        ]);

        $event = CareerEvent::create($validated);

        return response()->json([
            'message' => 'Milestone added successfully!',
            'event' => $event
        ], 201);
    }

    /**
     * Update an existing journey event.
     */
    public function update(Request $request, $id)
    {
        $event = CareerEvent::findOrFail($id);

        $validated = $request->validate([
            'year' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'side' => 'required|string|in:left,right',
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Milestone updated successfully!',
            'event' => $event
        ]);
    }

    /**
     * Remove a journey event.
     */
    public function destroy($id)
    {
        $event = CareerEvent::findOrFail($id);
        $event->delete();

        return response()->json(['message' => 'Milestone removed from history.']);
    }
}
