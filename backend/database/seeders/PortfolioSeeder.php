<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\AcademyProject;
use App\Models\CareerEvent;
use App\Models\Skill;
use App\Models\HeroSetting;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cleanup to prevent duplicates
        Project::truncate();
        AcademyProject::truncate();
        CareerEvent::truncate();
        Skill::truncate();
        HeroSetting::truncate();

        // Hero Settings
        HeroSetting::create([
            'name' => 'Solayman El Kharraz',
            'title' => 'Full-Stack Playmaker',
            'location' => 'Tangier, Morocco',
            'bio' => 'Building robust B2B platforms. No fluff, just scalable results.',
            'style_of_play' => 'High-speed UI (React) grounded by rock-solid architecture (Laravel).',
            'status' => 'OPEN FOR HIGH-PERFORMANCE CONTRACTS'
        ]);

        // First Team Projects (Match Highlights)
        Project::create([
            'title' => 'SmartInvoice Pro',
            'project_type' => 'SaaS Architecture',
            'problem' => 'Small agencies struggled with messy billing and manual payment tracking.',
            'solution' => 'Built an automated invoicing engine with real-time tracking and Stripe integration.',
            'description' => 'A comprehensive B2B SaaS platform...',
            'tech_stack' => ['Laravel', 'React', 'Stripe', 'Tailwind'],
            'metrics' => ['Lighthouse' => '98%', 'Query' => '42ms', 'DB Load' => '8%'],
            'is_featured' => true,
            'live_url' => 'https://smartinvoice.pro',
            'source_url' => 'https://github.com/solaymanelkharraz/smart-invoice'
        ]);

        Project::create([
            'title' => 'CampusHub',
            'project_type' => 'Enterprise System',
            'problem' => 'University administration was bottlenecked by fragmented student data.',
            'solution' => 'Centralized student management with a high-performance RESTful API.',
            'description' => 'University management portal...',
            'tech_stack' => ['Node.js', 'React', 'MongoDB', 'Redis'],
            'metrics' => ['Lighthouse' => '95%', 'Query' => '38ms', 'DB Load' => '12%'],
            'is_featured' => true,
            'live_url' => 'https://campushub.edu',
            'source_url' => 'https://github.com/solaymanelkharraz/campus-hub'
        ]);

        Project::create([
            'title' => 'Adify Engine',
            'project_type' => 'Ad-Tech Infrastructure',
            'problem' => 'Ad delivery latency was causing 15% revenue loss in peak hours.',
            'solution' => 'Refactored delivery logic with edge caching and optimized SQL queries.',
            'description' => 'Scalable advertising platform...',
            'tech_stack' => ['PHP 8', 'Vue.js', 'MySQL', 'AWS'],
            'metrics' => ['Lighthouse' => '99%', 'Query' => '22ms', 'DB Load' => '5%'],
            'is_featured' => true,
            'live_url' => 'https://adify.io',
            'source_url' => '#'
        ]);

        Project::create([
            'title' => 'RihlatBladna',
            'project_type' => 'Travel Marketplace',
            'problem' => 'Fragmentation in Moroccan local tourism bookings.',
            'solution' => 'Centralized agency marketplace with real-time availability.',
            'description' => 'Tourism marketplace platform...',
            'tech_stack' => ['React', 'Tailwind', 'Node.js'],
            'metrics' => ['Lighthouse' => '94%', 'Query' => '55ms', 'DB Load' => '15%'],
            'is_featured' => false,
            'live_url' => 'https://rihlatbladna.ma',
            'source_url' => '#'
        ]);

        // Academy Projects (School)
        AcademyProject::create([
            'title' => 'EcoTrack Dashboard',
            'project_type' => 'Frontend Engine',
            'description' => 'A responsive carbon footprint tracker visualizing user habits with modern charts and animated state transitions.',
            'tech_stack' => ['React', 'Tailwind', 'Recharts'],
            'metrics' => ['Logic' => 88, 'UI' => 92, 'DB' => 75],
            'icon' => 'Layout',
        ]);

        AcademyProject::create([
            'title' => 'AuthFlow Microservice',
            'project_type' => 'Backend System',
            'description' => 'A robust JWT-based authentication API with role-based access control and rate-limiting defenses.',
            'tech_stack' => ['Node.js', 'Express', 'MongoDB'],
            'metrics' => ['Logic' => 95, 'UI' => 60, 'DB' => 88],
            'icon' => 'Server',
        ]);

        AcademyProject::create([
            'title' => 'Inventory API',
            'project_type' => 'Database Logic',
            'description' => 'A relational database schema and API managing complex product variants, stock tracking, and supplier logs.',
            'tech_stack' => ['Laravel', 'MySQL', 'Eloquent'],
            'metrics' => ['Logic' => 90, 'UI' => 65, 'DB' => 94],
            'icon' => 'Database',
        ]);

        // Career Events
        CareerEvent::create([
            'year' => '2006',
            'title' => 'The Kickoff',
            'description' => 'Born and started the journey. Building the foundation and early curiosity.',
            'side' => 'right',
        ]);

        CareerEvent::create([
            'year' => '2018',
            'title' => 'The Big Transfer',
            'description' => 'Moved to Tangier for High School. Establishing the base and focusing on technical maturity.',
            'side' => 'left',
        ]);

        CareerEvent::create([
            'year' => '2023',
            'title' => 'Academy Signing',
            'description' => 'Joined OFPPT Tangier. Deep diving into architecture and full-stack development.',
            'side' => 'right',
        ]);

        CareerEvent::create([
            'year' => '2026',
            'title' => 'The First Team',
            'description' => 'PFE completion and professional career start. Open for high-performance contracts.',
            'side' => 'left',
        ]);

        // Skills (Starting XI)
        // ATTACKERS
        Skill::create(['name' => 'Tailwind v4', 'category' => 'Attack', 'icon_name' => 'Layout', 'position_x' => '25%', 'position_y' => '20%']);
        Skill::create(['name' => 'React 19', 'category' => 'Attack', 'icon_name' => 'Zap', 'position_x' => '50%', 'position_y' => '15%']);
        Skill::create(['name' => 'Framer Motion', 'category' => 'Attack', 'icon_name' => 'Activity', 'position_x' => '75%', 'position_y' => '20%']);
        
        // MIDFIELD
        Skill::create(['name' => 'APIs', 'category' => 'Midfield', 'icon_name' => 'Network', 'position_x' => '30%', 'position_y' => '42%']);
        Skill::create(['name' => 'JavaScript', 'category' => 'Midfield', 'icon_name' => 'Code', 'position_x' => '50%', 'position_y' => '35%']);
        Skill::create(['name' => 'n8n', 'category' => 'Midfield', 'icon_name' => 'Cpu', 'position_x' => '70%', 'position_y' => '42%']);
        
        // DEFENSE
        Skill::create(['name' => 'Docker', 'category' => 'Defense', 'icon_name' => 'Box', 'position_x' => '20%', 'position_y' => '65%']);
        Skill::create(['name' => 'Laravel 11', 'category' => 'Defense', 'icon_name' => 'Shield', 'position_x' => '40%', 'position_y' => '70%']);
        Skill::create(['name' => 'PHP', 'category' => 'Defense', 'icon_name' => 'Code', 'position_x' => '60%', 'position_y' => '70%']);
        Skill::create(['name' => 'MongoDB', 'category' => 'Defense', 'icon_name' => 'Database', 'position_x' => '80%', 'position_y' => '65%']);
        
        // GOALKEEPER
        Skill::create(['name' => 'MySQL', 'category' => 'GK', 'icon_name' => 'Database', 'position_x' => '50%', 'position_y' => '88%']);
    }
}
