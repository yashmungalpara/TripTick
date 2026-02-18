
import supabase from './supabaseClient.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Profile from './pages/Profile.js'

// Initialize Fixed Components
const navbarContainer = document.getElementById('navbar-container');
const footerContainer = document.getElementById('footer-container');

// Helper to render Navbar with user data
async function renderNavbar() {
    if (!navbarContainer) return;
    const { data: { user } } = await supabase.auth.getUser();

    let isAdmin = false;
    if (user) {
        // Check if user is admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        isAdmin = profile?.role === 'admin';
    }

    navbarContainer.innerHTML = Navbar(user, isAdmin);
    setupLogoutListener();
}

function renderFooter() {
    if (footerContainer) footerContainer.innerHTML = Footer();
}

// Initial Render
renderNavbar();
renderFooter();

import Booking from './pages/Booking.js'
import Packages from './pages/Packages.js'
import Contact from './pages/Contact.js'
import Destinations from './pages/Destinations.js'

// Router Logic
const routes = {
    '': { component: Home, layout: 'default' },
    '#login': { component: Login, layout: 'auth' },
    '#signup': { component: Signup, layout: 'auth' },
    '#profile': { component: Profile, layout: 'default' },
    '#booking': { component: Booking, layout: 'default' },
    '#packages': { component: Packages, layout: 'default' },
    '#contact': { component: Contact, layout: 'default' },
    '#destinations': { component: Destinations, layout: 'default' }
};

function renderPage() {
    const mainContent = document.getElementById('main-content');

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

    // Render Content
    const componentOutput = route.component();

    if (typeof componentOutput === 'string') {
        // Legacy: Component returns just HTML string
        mainContent.innerHTML = componentOutput;
    } else if (typeof componentOutput === 'object' && componentOutput.render) {
        // New: Component returns { render, afterRender }
        mainContent.innerHTML = componentOutput.render();
        if (componentOutput.afterRender) {
            // Execute after DOM update
            componentOutput.afterRender();
        }
    }

    window.scrollTo(0, 0);

    // Update Navbar Active State
    updateActiveNavbar(hashPath);
}

function updateActiveNavbar(hash) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
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

// Initial Page Render
renderPage();

// Listen for hash changes
window.addEventListener('hashchange', renderPage);

// Listen for Auth Changes
supabase.auth.onAuthStateChange((event, session) => {
    // Re-render Navbar to show/hide Login/Profile buttons
    const user = session ? session.user : null;
    if (navbarContainer) navbarContainer.innerHTML = Navbar(user);
    setupLogoutListener();


    // Redirect if logging out while on profile
    if (event === 'SIGNED_OUT') {
        showToast('You have been logged out.', 'info');
        if (window.location.hash === '#profile') {
            window.location.hash = '#login';
        }
    }

});

// Helper to attach logout listener (since Navbar is re-rendered string)
function setupLogoutListener() {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        // Remove old listener to avoid duplicates if re-rendering (simple way)
        logoutBtn.replaceWith(logoutBtn.cloneNode(true));
        const newBtn = document.getElementById('logout-btn');

        newBtn.addEventListener('click', async () => {
            await supabase.auth.signOut();
            window.location.hash = '';
        });
    }

    // Also re-attach Mobile Menu Toggle
    const toggleBtn = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
    const navbarMenu = document.getElementById('navbar-sticky');

    if (toggleBtn && navbarMenu) {
        // Clone to clear listeners
        toggleBtn.replaceWith(toggleBtn.cloneNode(true));
        const newToggle = document.querySelector('[data-collapse-toggle="navbar-sticky"]');

        newToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('hidden');
        });
    }
}


import { showToast } from './components/Toast.js';

// Global Booking Handler (Protected Route)
window.handleBooking = async (tripId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        window.location.hash = `#booking?id=${tripId}`;
    } else {
        showToast('Please log in to book a trip!', 'error');
        // Deliberately delay redirect slightly so user sees the toast
        setTimeout(() => {
            window.location.hash = '#login';
        }, 1000);
    }
};

