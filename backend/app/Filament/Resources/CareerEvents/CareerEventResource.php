<?php

namespace App\Filament\Resources\CareerEvents;

use App\Filament\Resources\CareerEvents\Pages\CreateCareerEvent;
use App\Filament\Resources\CareerEvents\Pages\EditCareerEvent;
use App\Filament\Resources\CareerEvents\Pages\ListCareerEvents;
use App\Filament\Resources\CareerEvents\Schemas\CareerEventForm;
use App\Filament\Resources\CareerEvents\Tables\CareerEventsTable;
use App\Models\CareerEvent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CareerEventResource extends Resource
{
    protected static ?string $model = CareerEvent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return CareerEventForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CareerEventsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCareerEvents::route('/'),
            'create' => CreateCareerEvent::route('/create'),
            'edit' => EditCareerEvent::route('/{record}/edit'),
        ];
    }
}
