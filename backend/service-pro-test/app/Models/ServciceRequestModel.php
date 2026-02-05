<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ServciceRequestModel extends Model
{
    use softDeletes;    
protected $table = 'service_requests';


    // public $timestamps = false;

   protected $fillable = [
        'title',
        'description',
        'categiory',
        'priority',
        'status',
        'created_by'
    ];


    public function userGet(){
        return $this->belongsTo(User::class,'created_by');
    }
}
