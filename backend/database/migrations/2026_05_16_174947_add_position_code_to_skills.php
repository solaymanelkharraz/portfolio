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
        Schema::table('skills', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->string('position_code')->nullable()->after('category');
        });
    }

    public function down(): void
    {
        Schema::table('skills', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->dropColumn('position_code');
        });
    }
};
