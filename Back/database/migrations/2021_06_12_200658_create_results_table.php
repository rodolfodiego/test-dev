<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('polls_id')->nullable();
            $table->foreign('polls_id')->references('id')->on('polls')->onDelete('cascade');

            $table->unsignedBigInteger('option_id')->nullable();
            $table->foreign('option_id')->references('id')->on('options')->onDelete('cascade');

            $table->integer('result');
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
        Schema::dropIfExists('results');
    }
}
