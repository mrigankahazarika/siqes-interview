<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Enums\ServiceRequestCategory;
use App\Enums\ServiceRequestPriority;
use App\Enums\ServiceRequestStatuses;
use App\Http\Requests\ServciceRequest;
use App\Models\ServciceRequestModel;
use Illuminate\Support\Facades\DB;

use App\Http\Resources\ServiceRequests;

class ServciceRequestController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->page;
        $limit = $request->limit;

        // $requests = ServciceRequestModel::paginate($page || 1, $limit || 15);
        $requests = ServciceRequestModel::paginate($limit, ['*'], 'page', $page);

        // return response()->json($requests);

        return ServiceRequests::collection($requests);
    }

    public function store(ServciceRequest $request)
    {
        DB::beginTransaction();
        try {
            // once the auth is set , i will add it  currently user is staically set no 1  for testing purpose todo :
            $data = array_merge($request->validated(), [
                    // 'created_by' => auth()->id() 
                    'created_by' => 1 
                ]);
                $create = ServciceRequestModel::create($request->validated());
                DB::commit();
            return response()->json([
                'data' => $create
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
            'message' => 'Failed to create request',
            'error' => $e->getMessage()
        ], 500);
        }

       
    }

    public function getTypesx() {
        $enumsCategory =  ServiceRequestCategory::options();
        $enumsPriority =  ServiceRequestPriority::options();
        $enumsStattues =  ServiceRequestStatuses::options();

        return response()->json([
            'category' =>$enumsCategory,
            'priority' => $enumsPriority,
            'statues' => $enumsStattues
        ]);
    }

    public function destroy($id)
    {
        $request = ServciceRequestModel::find($id);

        $request->delete();

        return response()->json(['message' => 'service request delete done']);
    }

public function show($id)
    {
        $request = ServciceRequestModel::find($id);

        return response()->json(['data' => $request]);
    }

    public function update(ServciceRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $serviceRequest = ServciceRequestModel::find($id);
            $serviceRequest->update($request->validated());
            DB::commit();
            return response()->json([
                'data' => $serviceRequest
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
            'message' => 'Failed to update request',
            'error' => $e->getMessage()
        ], 500);
        }
    }   

}
