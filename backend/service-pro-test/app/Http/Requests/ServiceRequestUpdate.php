<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\ServiceRequestCategory;
use App\Enums\ServiceRequestStatuses;
use App\Enums\ServiceRequestPriority;
use Illuminate\Validation\Rules\Enum;

class ServiceRequestUpdate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return [
            'id' => 'sometimes|integer|exists:servcice_requests,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'created_by' => 'sometimes|integer',
            'status' => [new Enum(ServiceRequestStatuses::class)],
            'category' => [new Enum(ServiceRequestCategory::class)],
            'priority' => [new Enum(ServiceRequestPriority::class)],
        ];
    }
}
