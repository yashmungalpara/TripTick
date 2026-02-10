import supabase from './supabaseClient.js';
import Dashboard from './admin/Dashboard.js';
import Trips from './admin/Trips.js';
import Bookings from './admin/Bookings.js';
import Users from './admin/Users.js';
import Sidebar from './admin/Sidebar.js';

const appContainer = document.getElementById('admin-app');

// Admin Routes
const routes = {
    '': Dashboard,
    '#dashboard': Dashboard,
    '#trips': Trips,
    '#bookings': Bookings,
    '#users': Users
};

async function checkAdminAuth() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = 'index.html#login'; // Redirect to main login
        return null;
    }

    // Check if user has 'admin' role in profiles
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (error || profile?.role !== 'admin') {
        alert('Access Denied: You are not an administrator.');
        window.location.href = 'index.html';
        return null;
    }

    return user;
}

function renderSidebar() {
    // Only render if not already there
    if (!document.getElementById('admin-sidebar')) {
        const sidebarHTML = Sidebar();
        // Prepend sidebar
        const div = document.createElement('div');
        div.innerHTML = sidebarHTML;
        appContainer.prepend(div.firstElementChild);
    }
}

async function renderPage() {
    const user = await checkAdminAuth();
    if (!user) return;

    // Remove loading spinner if present
    const loading = document.getElementById('loading');
    if (loading) loading.remove();

    // Render Layout (Sidebar)
    renderSidebar();

    // Get current route
    const hash = window.location.hash || '#dashboard';
    const component = routes[hash] || Dashboard;

    // Render Main Content Area
    let mainContent = document.getElementById('main-content');
    if (!mainContent) {
        mainContent = document.createElement('main');
        mainContent.id = 'main-content';
        mainContent.className = 'flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6';
        appContainer.appendChild(mainContent);
    }

    mainContent.innerHTML = await component.render();
    if (component.afterRender) {
        component.afterRender();
    }

    // Update active state in sidebar
    updateSidebarActive(hash);
}

function updateSidebarActive(hash) {
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('bg-gray-700', 'text-white');
        link.classList.add('text-gray-300', 'hover:bg-gray-700', 'hover:text-white');

        if (link.getAttribute('href') === hash) {
            link.classList.add('bg-gray-700', 'text-white');
            link.classList.remove('text-gray-300');
        }
    });
}

// Init
window.addEventListener('hashchange', renderPage);
renderPage();
