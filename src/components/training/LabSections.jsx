import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Download } from 'lucide-react';

const LabCard = ({ title, badge, description, link, pdf, techStack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-emerald-900/10 p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono tracking-widest uppercase rounded-full border border-emerald-200">
            {badge}
          </span>
          {pdf && <FileText className="text-emerald-800/20" size={24} />}
        </div>
        
        <h3 className="text-2xl font-black text-emerald-950 mb-3 tracking-tighter uppercase font-heading">
          {title}
        </h3>
        
        <p className="text-gray-600 font-mono text-sm mb-4 leading-relaxed flex-grow">
          {description}
        </p>

        {techStack && (
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.map((tech, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[8px] font-bold font-mono uppercase tracking-tighter border border-gray-100 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-auto">
          {link ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-800 text-white font-bold font-mono text-[10px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-emerald-950 transition-colors shadow-md w-full justify-center"
            >
              Launch Live Demo <ExternalLink size={14} />
            </a>
          ) : (
            <a 
              href={`/pdf/${pdf}`} 
              download
              className="inline-flex items-center gap-2 border-2 border-emerald-800 text-emerald-800 font-bold font-mono text-[10px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-emerald-800 hover:text-white transition-all w-full justify-center"
            >
              Download Report <Download size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const CloudLabs = () => {
  const labs = [
    {
      badge: "TP 1",
      title: "Node.js Foundations",
      description: "Native HTTP server creation and understanding core backend architecture. Environment setup and module management.",
      link: "https://my-cloud-api.vercel.app/"
    },
    {
      badge: "TP 2, 3 & 4",
      title: "Secure REST API",
      description: "Full API creation: Express.js routing, MongoDB integration, and route security via JWT and password hashing.",
      link: "https://members-view-smoky.vercel.app/"
    },
    {
      badge: "TP 5",
      title: "Microservices Arch",
      description: "Distributed system development with 3 independent APIs communicating synchronously via Axios, deployed on Cloud.",
      pdf: "Application_Microservices.pdf"
    },
    {
      badge: "TP 6",
      title: "Async RabbitMQ",
      description: "Message Broker implementation to decouple services. Background workers for handling heavy tasks resiliently.",
      pdf: "Communication_Asynchrone.pdf"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {labs.map((lab, i) => <LabCard key={i} {...lab} />)}
    </div>
  );
};

export const DockerLabs = () => {
  const labs = [
    {
      badge: "TP 1",
      title: "Nginx Custom System",
      description: "Interactive exploration of Linux file systems. Hot-swappable customization and blueprint image creation.",
      pdf: "TP_1_Docker.pdf"
    },
    {
      badge: "TP 2",
      title: "Node.js Ramadan Hub",
      description: "Full automation with Dockerfile. Multi-stage builds and publication on Docker Hub.",
      pdf: "TP_2_Docker.pdf"
    },
    {
      badge: "TP 3",
      title: "Azure Orchestration",
      description: "Multi-container orchestration (PHP/MySQL) with Docker Compose and professional deployment on Azure Container Apps.",
      pdf: "TP_3_Docker.pdf"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {labs.map((lab, i) => <LabCard key={i} {...lab} />)}
    </div>
  );
};

export const LaravelLabs = () => {
  const labs = [
    { badge: "01", title: "Routing Engine", description: "Deep dive into Laravel's routing layer. Dynamic Parameters, Regex constraints, and JSON responses.", pdf: "Atelier1-Laravel-Soulayman.pdf" },
    { badge: "02", title: "Blade Engine", description: "Mastering the 'V' in MVC. Dynamic Product Catalog with Master Layouts and design consistency.", link: "https://first-of-his-name.vercel.app" },
    { badge: "03", title: "E-Commerce Core", description: "Foundational build focusing on Route Logic and Data Binding. Dynamic category routing.", link: "https://ecom-nu-coral.vercel.app" },
    { badge: "04", title: "Database & Cloud", description: "Full-stack implementation. Eloquent ORM, Migrations, and automated testing data via Faker.", pdf: "Atelier2-Laravel-Soulayman.pdf" },
    { badge: "05", title: "MVC & Deployment", description: "Transformed static store into MVC. Category filtering logic and deployment to AlwaysData.", pdf: "Atelier7-Laravel-Soulayman.pdf" },
    { badge: "06", title: "Pagination System", description: "Optimized data delivery with Eloquent Pagination. Custom Blade views for navigation.", pdf: "Atelier8-Laravel-Soulayman.pdf" },
    { badge: "07", title: "Cloud Integration", description: "Integrated Cloudinary API for image uploads on Vercel. Secure Admin Dashboard.", pdf: "Atelier9-Laravel-Soulayman.pdf" },
    { badge: "08", title: "Admin Operations", description: "Full CRUD system. Edit/Update workflows and secured Delete actions via Bootstrap Modals.", pdf: "Atelier10-Laravel-Soulayman.pdf" },
    { badge: "09", title: "React Frontend", description: "Headless architecture. Standalone React App consuming Laravel API via Axios.", link: "https://jbala-react-client.vercel.app" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {labs.map((lab, i) => <LabCard key={i} {...lab} />)}
    </div>
  );
};

export const ReactLabs = () => {
  const labs = [
    { badge: "Atelier 01", title: "FruityApp", description: "Introduction to React concepts. Built a responsive fruit application using Functional Components, Props, and State.", link: "https://solayman_the_first.gitlab.io/react/", techStack: ["React 18", "Vite", "JSX"] },
    { badge: "Atelier 02", title: "Profile Cards", description: "Dynamic profile manager. Mastered reusable Components and Props, integrated Bootstrap for layout.", link: "https://atelier2-25eaf7.gitlab.io", techStack: ["Bootstrap 5", "Props", "Lists"] },
    { badge: "Atelier 04", title: "User Preferences", description: "Interactive dashboard. Managed preferences with Radio Buttons and used useRef for bulk selection.", link: "https://atelier3-3c3f88.gitlab.io/", techStack: ["useRef", "State", "Conditional Rendering"] },
    { badge: "Atelier 05", title: "WorldQuest", description: "Dynamic global explorer. Mastered API integration using Axios and useEffect for search and sorting.", link: "https://atelier5-25cffd.gitlab.io/", techStack: ["Axios", "REST API", "useEffect"] },
    { badge: "Atelier 06", title: "Planify App", description: "Full-Stack Task Manager. Connected a React frontend to a custom Flask (Python) API with full CRUD.", link: "https://atelier6-25dc26.gitlab.io", techStack: ["React + Flask", "Python API", "CRUD"] },
    { badge: "Atelier 07", title: "Book Explorer", description: "Multi-page SPA using React Router. Features seamless navigation and dynamic URL parameters.", link: "https://atelier7-c288ff.gitlab.io", techStack: ["React Router", "SPA", "useParams"] },
    { badge: "Contrôle 1", title: "Gestion Salariés", description: "Employee Management System. Complete dashboard featuring forms and real-time filtering by service.", link: "https://cc-06c08e.gitlab.io", techStack: ["React Forms", "State", "Filtering"] },
    { badge: "Atelier 09", title: "Tangier CAN 2025", description: "Global State Management using Context API. Multilingual welcome app with Dark Mode switching.", link: "https://atelier8-7993dd.gitlab.io", techStack: ["Context API", "Multilingual", "Bootstrap"] },
    { badge: "Atelier 10", title: "Redux Todo List", description: "Centralized State Management with Redux. Implemented Store-Reducer pattern to manage global state.", link: "https://atelier9-01df22.gitlab.io", techStack: ["Redux", "Store", "Reducers"] },
    { badge: "Atelier 11", title: "Toolkit Todo", description: "Modern Redux Architecture. Simplified state management approach using Redux Toolkit and createSlice.", link: "https://atelier10-7db0b8.gitlab.io", techStack: ["Redux Toolkit", "createSlice", "Vite"] },
    { badge: "Atelier 12", title: "FullStack Shop", description: "E-Commerce Cart System. Built a complete shopping experience with Redux Toolkit and dynamic cart logic.", link: "https://fullstack-shop-9cde76.gitlab.io", techStack: ["Redux Toolkit", "Cart Logic", "Router"] },
    { 
      badge: "JavaScript", 
      title: "Interactive Web Tools", 
      description: "Collection of practical web utilities and interactive laboratory exercises (Atelier 1 & 2) built with Vanilla JavaScript.", 
      link: "https://atelier1-2-6d98e5.gitlab.io", 
      techStack: ["Vanilla JS", "Web Tools", "Interactive"] 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
      {labs.map((lab, i) => <LabCard key={i} {...lab} />)}
    </div>
  );
};

export const CMSLabs = () => {
  const labs = [
    { 
      badge: "WordPress", 
      title: "Photography Portfolio", 
      description: "Minimalist photography portfolio built with Fukasawa theme. Includes custom article formats (Gallery/Image) and Contact Form 7 integration.", 
      link: "https://portfolio2.free.nf", 
      techStack: ["WordPress", "Fukasawa", "Contact Form 7"] 
    },
    { 
      badge: "WooCommerce", 
      title: "Fullstackshop", 
      description: "Fully functional WooCommerce store with simple/variable products, static homepage, and customized storefront branding.", 
      link: "https://fullstackshop.free.nf", 
      techStack: ["WooCommerce", "Storefront", "E-commerce"] 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
      {labs.map((lab, i) => <LabCard key={i} {...lab} />)}
    </div>
  );
};

export const DatabaseLabs = () => {
  const labs = [
    { 
      badge: "SQL", 
      title: "SQL Data Reports", 
      description: "Advanced relational database queries and data reporting structures. Comprehensive SQL analysis and schema design.", 
      link: "https://mysql-raports-17e5dd.gitlab.io/sqldb.html", 
      techStack: ["MySQL", "Relational DB", "Queries"] 
    },
    { 
      badge: "NoSQL", 
      title: "NoSQL Aggregations", 
      description: "MongoDB aggregation pipelines and document-based data modeling for high-scale applications.", 
      link: "https://mysql-raports-17e5dd.gitlab.io/mongodb.html", 
      techStack: ["MongoDB", "NoSQL", "Aggregations"] 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
      {labs.map((lab, i) => <LabCard key={i} {...lab} />)}
    </div>
  );
};
