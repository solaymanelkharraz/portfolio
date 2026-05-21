<?php

namespace App\Filament\Resources\CareerEvents\Pages;

use App\Filament\Resources\CareerEvents\CareerEventResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCareerEvent extends EditRecord
{
    protected static string $resource = CareerEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
