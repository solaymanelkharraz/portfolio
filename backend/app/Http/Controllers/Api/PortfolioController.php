<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\AcademyProject;
use App\Models\CareerEvent;
use App\Models\Skill;
use App\Models\Bid;

class PortfolioController extends Controller
{
    public function projects(Request $request)
    {
        return response()->json(Project::orderBy('created_at', 'desc')->get());
    }

    public function academyProjects()
    {
        return response()->json(AcademyProject::orderBy('created_at', 'desc')->get());
    }

    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'project_type' => 'nullable|string',
            'problem' => 'nullable|string',
            'solution' => 'nullable|string',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'metrics' => 'nullable|array',
            'live_url' => 'nullable|string',
            'source_url' => 'nullable|string',
            'icon' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function updateProject(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'project_type' => 'nullable|string',
            'problem' => 'nullable|string',
            'solution' => 'nullable|string',
            'description' => 'nullable|string',
            'tech_stack' => 'nullable|array',
            'metrics' => 'nullable|array',
            'live_url' => 'nullable|string',
            'source_url' => 'nullable|string',
            'icon' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    public function destroyProject($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(null, 204);
    }

    public function careerEvents()
    {
        return response()->json(CareerEvent::all());
    }

    public function skills()
    {
        return response()->json(Skill::all());
    }

    public function getHero()
    {
        return response()->json(\App\Models\HeroSetting::first());
    }

    public function updateHero(Request $request)
    {
        $hero = \App\Models\HeroSetting::first();
        $validated = $request->validate([
            'name' => 'required|string',
            'title' => 'required|string',
            'tactical_position' => 'nullable|string',
            'ovr' => 'nullable|integer',
            'role_badge' => 'nullable|string',
            'location' => 'required|string',
            'bio' => 'required|string',
            'style_of_play' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        $hero->update($validated);
        return response()->json($hero);
    }

    public function storeSkill(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'icon_name' => 'nullable|string',
            'position_x' => 'nullable|string',
            'position_y' => 'nullable|string',
            'position_code' => 'nullable|string',
            'is_starter' => 'nullable|boolean',
        ]);

        $skill = Skill::create($validated);
        return response()->json($skill, 201);
    }

    public function updateSkill(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string',
            'category' => 'required|string',
            'icon_name' => 'nullable|string',
            'position_x' => 'nullable|string',
            'position_y' => 'nullable|string',
            'position_code' => 'nullable|string',
            'is_starter' => 'nullable|boolean',
        ]);

        $skill->update($validated);
        return response()->json($skill);
    }

    public function destroySkill($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();
        return response()->json(null, 204);
    }

    public function storeBid(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'deal_type' => 'required|string',
            'message' => 'required|string',
        ]);

        $bid = Bid::create($validated);

        return response()->json([
            'message' => 'Bid successfully submitted.',
            'bid' => $bid
        ], 201);
    }
}
