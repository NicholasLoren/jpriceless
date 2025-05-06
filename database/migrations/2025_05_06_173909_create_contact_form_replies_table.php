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
        Schema::create('contact_form_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_form_id')->constrained('contact_forms')->onDelete('cascade');
            $table->text('message');
            $table->string('subject');
            $table->foreignId('replied_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_form_replies');
    }
};
