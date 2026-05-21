<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BidController;
use App\Http\Controllers\Api\JourneyController;

Route::get('/projects', [PortfolioController::class, 'projects']);
Route::get('/academy-projects', [PortfolioController::class, 'academyProjects']);
Route::get('/career-events', [JourneyController::class, 'index']);
Route::get('/journey', [JourneyController::class, 'index']);
Route::get('/skills', [PortfolioController::class, 'skills']);
Route::get('/hero', [PortfolioController::class, 'getHero']);
Route::post('/bids', [BidController::class, 'store']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/settings', [AuthController::class, 'updateSettings']);
    Route::put('/hero', [PortfolioController::class, 'updateHero']);
    Route::post('/skills', [PortfolioController::class, 'storeSkill']);
    Route::put('/skills/{id}', [PortfolioController::class, 'updateSkill']);
    Route::delete('/skills/{id}', [PortfolioController::class, 'destroySkill']);
    
    // Project Management
    Route::post('/projects', [PortfolioController::class, 'storeProject']);
    Route::put('/projects/{id}', [PortfolioController::class, 'updateProject']);
    Route::delete('/projects/{id}', [PortfolioController::class, 'destroyProject']);

    // Bid Management
    Route::get('/bids', [BidController::class, 'index']);
    Route::delete('/bids/{id}', [BidController::class, 'destroy']);

    // Journey Management
    Route::post('/journey', [JourneyController::class, 'store']);
    Route::put('/journey/{id}', [JourneyController::class, 'update']);
    Route::delete('/journey/{id}', [JourneyController::class, 'destroy']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
