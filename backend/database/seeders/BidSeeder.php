<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bid;

class BidSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bid::truncate();

        Bid::create([
            'company' => 'Real Madrid Tech',
            'email' => 'scout@realmadrid.com',
            'deal_type' => 'Permanent Transfer',
            'message' => 'We have been following your development. Your full-stack capabilities fit perfectly with our Galacticos project. We are prepared to offer a 5-year contract.'
        ]);

        Bid::create([
            'company' => 'Silicon Valley FC',
            'email' => 'recruitment@svfc.io',
            'deal_type' => 'Loan with Option to Buy',
            'message' => 'We need a creative playmaker for our upcoming startup season. We are offering an initial 6-month loan with a significant option to buy if targets are met.'
        ]);
    }
}
