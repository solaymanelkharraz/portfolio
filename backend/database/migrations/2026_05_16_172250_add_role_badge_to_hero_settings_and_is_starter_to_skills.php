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
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->string('role_badge')->default('ST')->after('ovr');
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->boolean('is_starter')->default(true)->after('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_settings', function (Blueprint $table) {
            $table->dropColumn('role_badge');
        });

        Schema::table('skills', function (Blueprint $table) {
            $table->dropColumn('is_starter');
        });
    }
};
