<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\KeyValue;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Select::make('type')
                    ->options([
                        'first_team' => 'First Team',
                        'academy' => 'Academy',
                    ])
                    ->required(),
                TextInput::make('project_type'),
                Textarea::make('problem')
                    ->columnSpanFull(),
                Textarea::make('solution')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TagsInput::make('tech_stack')
                    ->placeholder('New tech stack item...'),
                KeyValue::make('metrics')
                    ->keyLabel('Metric Name')
                    ->valueLabel('Metric Value'),
                TextInput::make('live_url')
                    ->url(),
                TextInput::make('source_url')
                    ->url(),
                TextInput::make('icon'),
            ]);
    }
}
