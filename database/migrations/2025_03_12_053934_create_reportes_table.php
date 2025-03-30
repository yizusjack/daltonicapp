<?php

use App\Models\User;
use App\Enums\TipoReporteEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reportes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->enum('tipo', TipoReporteEnum::names());
            $table->string('explicacion')->nullable()->default(null);
            $table->string('reportable_type');
            $table->bigInteger('reportable_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reportes');
    }
};
