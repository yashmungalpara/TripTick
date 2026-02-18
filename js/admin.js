import supabase from './supabaseClient.js';
import Dashboard from './admin/Dashboard.js';
import Trips from './admin/Trips.js';
import Bookings from './admin/Bookings.js';
import Users from './admin/Users.js';
import Messages from './admin/Messages.js';
import Feedback from './admin/Feedback.js';
import Sidebar from './admin/Sidebar.js';

const appContainer = document.getElementById('admin-app');

// Admin Routes
const routes = {
    '': Dashboard,
    '#dashboard': Dashboard,
    '#trips': Trips,
    '#bookings': Bookings,
    '#users': Users,
    '#messages': Messages,
    '#feedback': Feedback
};

async function checkAdminAuth() {
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Not Logged In -> Show Login Form
    if (!user) {
        renderAdminLogin();
        return null;
    }

    // 2. Check Role
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    // 3. Logged in but Not Admin -> Show Access Denied
    if (error || profile?.role !== 'admin') {
        renderAccessDenied(user);
        return null;
    }

    return user;
}

function renderAdminLogin() {
    const appContainer = document.getElementById('admin-app');
    appContainer.innerHTML = `
        <div class="min-h-screen w-full flex items-center justify-center bg-gray-900 px-4">
            <div class="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
                <div class="px-8 py-6 bg-slate-800 text-white text-center">
                    <h2 class="text-2xl font-bold mb-1">Admin Panel</h2>
                    <p class="text-slate-400 text-sm">Secure Access Only</p>
                </div>
                <div class="p-8">
                    <form id="admin-login-form" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="admin-email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800 outline-none" placeholder="admin@triptick.com" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" id="admin-password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-800 outline-none" placeholder="••••••••" required>
                        </div>
                        <button type="submit" id="admin-login-btn" class="w-full bg-slate-800 text-white py-2.5 rounded-lg font-bold hover:bg-slate-900 transition">
                            Login
                        </button>
                    </form>
                    <div id="login-error" class="mt-4 text-center text-red-600 text-sm hidden"></div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;
        const errorDiv = document.getElementById('login-error');
        const btn = document.getElementById('admin-login-btn');

        btn.disabled = true;
        btn.innerText = 'Verifying...';
        errorDiv.classList.add('hidden');

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('hidden');
            btn.disabled = false;
            btn.innerText = 'Login';
        } else {
            // Success - Reload to trigger auth check again
            window.location.reload();
        }
    });
}

function renderAccessDenied(user) {
    const appContainer = document.getElementById('admin-app');
    appContainer.innerHTML = `
        <div class="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
            <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <i class="fas fa-lock text-3xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                <p class="text-gray-600 mb-6">
                    You are logged in as <strong>${user.email}</strong>, but this account does not have administrator privileges.
                </p>
                <button id="admin-logout-btn" class="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-black transition">
                    Logout & Use Different Account
                </button>
                <div class="mt-4">
                     <a href="index.html" class="text-sm text-gray-500 hover:text-gray-900 underline">Return to Website</a>
                </div>
            </div>
        </div>
    `;

    document.getElementById('admin-logout-btn').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.reload();
    });
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
