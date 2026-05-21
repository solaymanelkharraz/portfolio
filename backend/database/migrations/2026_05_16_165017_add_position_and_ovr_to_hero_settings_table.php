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
            $table->string('tactical_position')->nullable()->after('title');
            $table->integer('ovr')->default(99)->after('tactical_position');
        });
    }

    public function down(): void
    {
        Schema::table('hero_settings', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->dropColumn(['tactical_position', 'ovr']);
        });
    }
};
