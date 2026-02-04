<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServciceRequestModel extends Model
{
    protected $table = 'service_requests';
    public $timestamps = false;

   protected $fillable = [
        'title',
        'description',
        'categiory',
        'priority',
        'status',
        'created_by'
    ];
}
