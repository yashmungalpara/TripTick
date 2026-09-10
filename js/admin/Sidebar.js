export default function Sidebar() {
    return `
    <div id="admin-sidebar" class="flex flex-col w-64 bg-gray-800 h-screen text-white">
        <div class="flex items-center justify-center h-20 shadow-md">
            <h1 class="text-2xl font-bold uppercase text-indigo-500">TripTick Admin</h1>
        </div>
        <ul class="flex flex-col py-4">
            <li>
                <a href="#dashboard" class="admin-nav-link flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-white hover:bg-gray-700 pr-6">
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="fas fa-tachometer-alt"></i></span>
                    <span class="text-sm font-medium">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#trips" class="admin-nav-link flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-white hover:bg-gray-700 pr-6">
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="fas fa-plane"></i></span>
                    <span class="text-sm font-medium">Trips</span>
                </a>
            </li>
            <li>
                <a href="#bookings" class="admin-nav-link flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-white hover:bg-gray-700 pr-6">
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="fas fa-book"></i></span>
                    <span class="text-sm font-medium">Bookings</span>
                </a>
            </li>
            <li>
                <a href="#users" class="admin-nav-link flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-white hover:bg-gray-700 pr-6">
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="fas fa-users"></i></span>
                    <span class="text-sm font-medium">Users</span>
                </a>
            </li>
             <li>
                <a href="index.html" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-white hover:bg-gray-700 pr-6">
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="fas fa-sign-out-alt"></i></span>
                    <span class="text-sm font-medium">Back to Site</span>
                </a>
            </li>
        </ul>
    </div>
    `;
}
