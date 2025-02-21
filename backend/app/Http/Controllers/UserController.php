<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::with('groups')->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5',
            'group_ids' => 'array',
            'group_ids.*' => 'exists:groups,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (!empty($request->group_ids)) {
            $user->groups()->sync($request->group_ids);
        }

        return response()->json($user->load('groups'), 201);
    }

    public function show(User $user)
    {
        return response()->json($user->load('groups'));
    }

    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'group_ids' => 'array',
            'group_ids.*' => 'exists:groups,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'password' => isset($request->password) ? Hash::make($request->password) : $user->password,
        ]);

        if (!empty($request->group_ids)) {
            $user->groups()->sync($request->group_ids);
        }

        return response()->json($user->load('groups'));
    }

    public function destroy(User $user)
    {
        $user->groups()->detach();
        $user->delete();

        return response()->json(['message' => 'Usuário excluído com sucesso']);
    }
}
