
import supabase from './supabaseClient.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'

// Initialize Fixed Components
const navbarEl = document.getElementById('navbar-container');
const footerEl = document.getElementById('footer-container');
if (navbarEl) navbarEl.innerHTML = Navbar();
if (footerEl) footerEl.innerHTML = Footer();

import Booking from './pages/Booking.js'
import Packages from './pages/Packages.js'
import Contact from './pages/Contact.js'
import Destinations from './pages/Destinations.js'

// ... existing imports ...

// Router Logic
const routes = {
    '': { component: Home, layout: 'default' },
    '#login': { component: Login, layout: 'auth' },
    '#signup': { component: Signup, layout: 'auth' },
    '#booking': { component: Booking, layout: 'default' },
    '#packages': { component: Packages, layout: 'default' },
    '#contact': { component: Contact, layout: 'default' },
    '#destinations': { component: Destinations, layout: 'default' }
};

function renderPage() {
    const mainContent = document.getElementById('main-content');
    const navbarContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    if (!mainContent) return;

    // Handle hash with parameters (e.g. #booking?id=1)
    const hashFull = window.location.hash || '';
    const hashPath = hashFull.split('?')[0]; // Get base path

    const route = routes[hashPath] || routes['']; // Default to Home if route not found

    // Handle Layouts
    if (route.layout === 'auth') {
        // Hide Navbar & Footer
        if (navbarContainer) navbarContainer.style.display = 'none';
        if (footerContainer) footerContainer.style.display = 'none';
        // Remove top padding (used for fixed navbar)
        mainContent.classList.remove('pt-[72px]');
    } else {
        // Show Navbar & Footer (Default)
        if (navbarContainer) navbarContainer.style.display = 'block';
        if (footerContainer) footerContainer.style.display = 'block';
        // Add top padding back
        mainContent.classList.add('pt-[72px]');
    }

    mainContent.innerHTML = route.component();
    window.scrollTo(0, 0);

    // Update Navbar Active State
    updateActiveNavbar(hashPath);
}

function updateActiveNavbar(hash) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        // Reset the span width via inline style if needed, or rely on CSS class
    });

    // Map Routes to IDs
    const navMap = {
        '': 'nav-home',
        '#destinations': 'nav-destinations',
        '#packages': 'nav-packages',
        '#contact': 'nav-contact'
    };

    const activeId = navMap[hash];
    if (activeId) {
        const activeLink = document.getElementById(activeId);
        if (activeLink) activeLink.classList.add('active');
    }
}

// Initial Render
renderPage();

// Listen for hash changes
window.addEventListener('hashchange', renderPage);

// Setup Mobile Menu Toggle (Simple implementation)
const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
const navbarMenu = document.getElementById('navbar-sticky');
if (toggleBtn && navbarMenu) {
    toggleBtn.addEventListener('click', () => {
        navbarMenu.classList.toggle('hidden');
    });
}

// Connection Check (Optional, keep for debugging)
async function checkConnection() {
    try {
        const { data, error } = await supabase.from('test').select('*').limit(1);
        console.log('Supabase check:', error ? error.message : 'Success');
    } catch (err) {
        console.error('Supabase check failed:', err);
    }
}
checkConnection();
