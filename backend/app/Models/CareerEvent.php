<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareerEvent extends Model
{
    protected $fillable = ['year', 'title', 'description', 'side'];
}
