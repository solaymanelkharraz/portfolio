<?php

namespace App\Filament\Resources\Skills\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SkillForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Select::make('category')
                    ->options([
                        'Attack' => 'Attack',
                        'Midfield' => 'Midfield',
                        'Defense' => 'Defense',
                        'GK' => 'Goalkeeper'
                    ])
                    ->required(),
                TextInput::make('icon_name')
                    ->placeholder('e.g. Code, Database, Layout'),
                TextInput::make('position_x')
                    ->placeholder('e.g. 50%'),
                TextInput::make('position_y')
                    ->placeholder('e.g. 80%'),
            ]);
    }
}
