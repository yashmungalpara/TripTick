
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

// Router Logic
// Router Logic
const routes = {
    '': { component: Home, layout: 'default' },
    '#login': { component: Login, layout: 'auth' },
    '#signup': { component: Signup, layout: 'auth' }
};

function renderPage() {
    const mainContent = document.getElementById('main-content');
    const navbarContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    if (!mainContent) return;

    const hash = window.location.hash || '';
    const route = routes[hash] || routes['']; // Default to Home if route not found

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
