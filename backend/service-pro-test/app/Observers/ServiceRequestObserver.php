<?php

namespace App\Observers;

use App\Models\ServciceRequestModel;
use App\Models\ActivityLogTracker;
use Illuminate\Support\Facades\Auth;


class ServiceRequestObserver
{


    /**
     * Handle the ServciceRequestModel "created" event.
     */
    public function created(ServciceRequestModel $servciceRequestModel): void
    {
        $this->log($servciceRequestModel, 'created', 'New request submitted');
    }

    /**
     * Handle the ServciceRequestModel "updated" event.
     */
    public function updated(ServciceRequestModel $servciceRequestModel): void
    {
        $this->log($servciceRequestModel, 'updated', 'Request updated');
        
    }

    /**
     * Handle the ServciceRequestModel "deleted" event.
     */
    public function deleted(ServciceRequestModel $servciceRequestModel): void
    {
                $this->log($servciceRequestModel, 'deleted', 'Request deleted');

    }

    /**
     * Handle the ServciceRequestModel "restored" event.
     */
    public function restored(ServciceRequestModel $servciceRequestModel): void
    {
        //
    }

    /**
     * Handle the ServciceRequestModel "force deleted" event.
     */
    public function forceDeleted(ServciceRequestModel $servciceRequestModel): void
    {
        //
    }


    protected function log($model, $action, $description, $changes = null)
    {
        ActivityLogTracker::create([
            // 'id' => $model->id,
            'user_id' => Auth::id(),
            'action' => $action,
            'description' => $description,
            'changes' => $changes, 
        ]);
    }
}
