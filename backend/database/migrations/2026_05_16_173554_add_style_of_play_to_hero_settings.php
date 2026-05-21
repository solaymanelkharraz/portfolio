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
        Schema::table('hero_settings', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->text('style_of_play')->nullable()->after('bio');
        });
    }

    public function down(): void
    {
        Schema::table('hero_settings', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->dropColumn('style_of_play');
        });
    }
};
