<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('category_id');
            $table->string('tags')->nullable();
            $table->text('description')->nullable();
            $table->string('location');
            $table->string('address');
            $table->string('zip');
            $table->integer('price');
            $table->boolean('isPaid')->dafault(false);
            $table->string('subscription')->default('free');
            $table->integer('user_id');
            $table->string('expires_at')->nullable();
            $table->text('photos');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listings');
    }
}
