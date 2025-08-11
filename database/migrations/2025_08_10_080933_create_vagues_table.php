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
            $table->date('end_date');

            $table->timestamps();
        });

        Schema::create('module_vagues', function (Blueprint $table) {
            $table->id();

            $table->foreignId('vague_id')
                  ->constrained('vagues')
                  ->cascadeOnDelete();

            $table->foreignId('module_id')
                  ->nullable()
                  ->constrained('modules')
                  ->cascadeOnDelete();


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
