<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category_id',
        'tags',
        'description',
        'location',
        'address',
        'zip',
        'price',
        'negotiable',
        'photos',
        'subscription',
        'isPaid',
        'user_id',
        'expires_at'
    ];
}
