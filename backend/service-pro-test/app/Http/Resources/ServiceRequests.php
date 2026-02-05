<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceRequests extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // :)
    public function toArray(Request $request): array
    {
        return [

            "id" => $this->id,
            "title" => $this->title . 'this too',
            "description" => $this->description . 'we can modyfy the data on api resources',
            "category" => $this->category,
            "priority" => $this->priority,
            "status" => $this->status,
            // "created_by" => $this->created_by,
             "user" =>  [
                    'id' => $this->userGet->id,
                    'name' => $this->userGet->name,
                    'email' => $this->userGet->email,
                    'avatar' => $this->userGet->avatar,
                ],
            "created_at" => $this->created_at,
            // "updated_at" => $this->updated_at->format('Y-m-d'),
            ];
    }
}
