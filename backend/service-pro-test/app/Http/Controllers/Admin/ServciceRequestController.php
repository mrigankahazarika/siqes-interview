<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\ServciceRequestModel;

class ServciceRequestController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->page;
        $limit = $request->limit;

        $requests = ServciceRequestModel::latest()->paginate($page || 1, $limit || 15);

        return response()->json($requests);
    }

    public function store(ServciceRequest $request)
    {
        $create = ServciceRequestModel::create($request->validated());

        return response()->json([
            'data' => $create
        ]);

       
    }
}
