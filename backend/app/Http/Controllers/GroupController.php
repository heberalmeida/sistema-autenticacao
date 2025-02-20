<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        return response()->json(Group::all());
    }

    public function store(Request $request)
    {
        $group = Group::create($request->validate(['name' => 'required|string|unique:groups']));
        return response()->json($group, 201);
    }

    public function show(Group $group)
    {
        return response()->json($group);
    }

    public function update(Request $request, Group $group)
    {
        $group->update($request->only(['name']));
        return response()->json($group);
    }

    public function destroy(Group $group)
    {
        $group->delete();
        return response()->json(['message' => 'Grupo excluído com sucesso']);
    }

    public function addUserToGroup(Request $request, $groupId)
    {
        $group = Group::findOrFail($groupId);
        $user = User::findOrFail($request->user_id);

        $group->users()->attach($user->id);

        return response()->json(['message' => 'Usuário adicionado ao grupo com sucesso']);
    }

    public function removeUserFromGroup(Request $request, $groupId)
    {
        $group = Group::findOrFail($groupId);
        $user = User::findOrFail($request->user_id);

        $group->users()->detach($user->id);

        return response()->json(['message' => 'Usuário removido do grupo']);
    }
}
