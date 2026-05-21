<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['name', 'category', 'icon_name', 'position_x', 'position_y', 'position_code', 'is_starter'];
}
