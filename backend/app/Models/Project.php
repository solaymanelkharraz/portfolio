<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'project_type', 'problem', 'solution', 'description', 
        'tech_stack', 'metrics', 'live_url', 'source_url', 'icon', 'is_featured'
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'metrics' => 'array',
    ];
}
