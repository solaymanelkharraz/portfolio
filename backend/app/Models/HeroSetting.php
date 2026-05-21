<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    protected $fillable = [
        'name',
        'title',
        'tactical_position',
        'ovr',
        'role_badge',
        'location',
        'bio',
        'style_of_play',
        'status'
    ];
}
