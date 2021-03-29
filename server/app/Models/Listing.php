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
        'names',
        'email',
        'phone_number',
        'photos',
        'user_id',
        'expires_at'
    ];
}
