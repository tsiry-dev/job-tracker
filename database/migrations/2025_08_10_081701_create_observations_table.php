<?php

use App\Models\Observation;
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
        Schema::create('observations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')
                  ->constrained('students')
                  ->cascadeOnDelete();

            $table->foreignId('module_id')
                  ->constrained('modules')
                  ->cascadeOnDelete();

            $table->text('description');
            $table->enum('status', [Observation::STATUS_ADMIN, Observation::STATUS_RECALE]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observations');
    }
};
