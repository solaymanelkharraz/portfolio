<?php

namespace App\Filament\Resources\CareerEvents\Pages;

use App\Filament\Resources\CareerEvents\CareerEventResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCareerEvents extends ListRecords
{
    protected static string $resource = CareerEventResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
