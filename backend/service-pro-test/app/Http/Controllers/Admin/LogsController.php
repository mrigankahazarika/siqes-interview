<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ActivityLogTracker;

class LogsController extends Controller
{
    public function index()
    {
        $logs = ActivityLogTracker::orderBy('created_at', 'desc')->get();

        return response()->json(['logs' => $logs]);
    }
}
