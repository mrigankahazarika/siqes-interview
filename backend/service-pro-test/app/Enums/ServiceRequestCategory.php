<?php

namespace App\Enums;

enum ServiceRequestCategory: string
{
    case IT = 'IT';
    case HR = 'HR';
    case FINANCE = 'Finance';
    case OTHER = 'others';
}
