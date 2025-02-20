<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GroupController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('groups', GroupController::class);

    Route::post('/groups/{id}/add-user', [GroupController::class, 'addUserToGroup']);
    Route::post('/groups/{id}/remove-user', [GroupController::class, 'removeUserFromGroup']);
});
