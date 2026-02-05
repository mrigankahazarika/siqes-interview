<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLogTracker extends Model
{
    protected $table = 'activity_logs';

    protected $fillable = [
        'user_id',
        'action',
        'description',
        'changes',
    ];
}
