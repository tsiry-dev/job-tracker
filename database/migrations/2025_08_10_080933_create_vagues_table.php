<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vagues', function (Blueprint $table) {
            $table->id();

            $table->foreignId('level_id')
                  ->nullable()
                  ->constrained('levels')
                  ->nullOnDelete();

            $table->string('name');
            $table->string('slug');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('status')->default(true);

            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_vagues');
        Schema::dropIfExists('vagues');
    }
};
