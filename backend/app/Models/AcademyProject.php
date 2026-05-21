<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademyProject extends Model
{
    protected $fillable = [
        'title', 'project_type', 'description', 'icon', 'tech_stack', 'metrics'
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'metrics' => 'array'
    ];
}
