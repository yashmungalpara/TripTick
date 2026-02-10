
import supabase from '../supabaseClient.js';

const Dashboard = {
    render: async () => {
        // Parallel data fetching for performance
        const [
            { count: tripsCount },
            { count: bookingsCount, data: bookings },
            { count: usersCount, data: users }
        ] = await Promise.all([
            supabase.from('trips').select('*', { count: 'exact', head: true }),
            supabase.from('bookings').select('*, trips(title)').order('created_at', { ascending: false }),
            supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5)
        ]);

        // Calculate Revenue
        let totalRevenue = 0;
        if (bookings) {
            totalRevenue = bookings.reduce((sum, booking) => {
                // Parse price strings like "$1,200" or "₹45,000"
                const priceString = booking.total_price || '0';
                const priceValue = parseFloat(priceString.replace(/[^0-9.]/g, ''));
                return sum + (isNaN(priceValue) ? 0 : priceValue);
            }, 0);
        }

        // Format Revenue (assuming predominantly one currency, using generic locale for now or hardcoded symbol if mixed)
        // For this app, let's assume we want to show it nicely. 
        // If data has mixed currencies, this is complex, but let's assume specific currency from data or default.
        const formattedRevenue = totalRevenue.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        });

        // Prepare Recent Activity
        // Combine recent bookings and new users, sort by date
        const activity = [];
        bookings?.slice(0, 5).forEach(b => {
            activity.push({
                type: 'booking',
                text: `New booking for "${b.trips?.title || 'Unknown Trip'}"`,
                date: new Date(b.created_at),
                icon: 'fa-calendar-check',
                color: 'text-green-500'
            });
        });
        users?.forEach(u => {
            activity.push({
                type: 'user',
                text: `User "${u.full_name || 'Unknown'}" registered`,
                date: new Date(u.created_at),
                icon: 'fa-user-plus',
                color: 'text-blue-500'
            });
        });

        // Sort and take top 5
        const recentActivity = activity.sort((a, b) => b.date - a.date).slice(0, 5);

        // Prepare Chart Data (Bookings per month for current year)
        const currentYear = new Date().getFullYear();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const bookingsPerMonth = new Array(12).fill(0);

        bookings?.forEach(b => {
            const date = new Date(b.created_at);
            if (date.getFullYear() === currentYear) {
                bookingsPerMonth[date.getMonth()]++;
            }
        });

        // Store chart data globally or in a way accessible to afterRender
        window.dashboardChartData = bookingsPerMonth;

        return `
            <h2 class="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
            
            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- Card 1 -->
                <div class="bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium uppercase">Total Revenue</p>
                            <h3 class="text-2xl font-bold text-gray-800">${formattedRevenue}</h3>
                        </div>
                        <div class="p-3 bg-indigo-100 rounded-full text-indigo-500">
                            <i class="fas fa-dollar-sign text-xl"></i>
                        </div>
                    </div>
                </div>
                <!-- Card 2 -->
                <div class="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium uppercase">Total Bookings</p>
                            <h3 class="text-2xl font-bold text-gray-800">${bookingsCount || 0}</h3>
                        </div>
                        <div class="p-3 bg-green-100 rounded-full text-green-500">
                            <i class="fas fa-calendar-check text-xl"></i>
                        </div>
                    </div>
                </div>
                <!-- Card 3 -->
                <div class="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium uppercase">Total Trips</p>
                            <h3 class="text-2xl font-bold text-gray-800">${tripsCount || 0}</h3>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-full text-blue-500">
                            <i class="fas fa-plane text-xl"></i>
                        </div>
                    </div>
                </div>
                <!-- Card 4 -->
                <div class="bg-white rounded-lg p-6 shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium uppercase">Users</p>
                            <h3 class="text-2xl font-bold text-gray-800">${usersCount || 0}</h3>
                        </div>
                        <div class="p-3 bg-yellow-100 rounded-full text-yellow-500">
                            <i class="fas fa-users text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Container -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Bookings Overview (${currentYear})</h3>
                    <div class="relative h-64">
                         <canvas id="bookingsChart"></canvas>
                    </div>
                </div>
                 <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                     <ul class="divide-y divide-gray-200">
                        ${recentActivity.map(item => `
                            <li class="py-3 flex justify-between items-start text-sm text-gray-600">
                                <div class="flex items-start">
                                    <i class="fas ${item.icon} ${item.color} mt-0.5 mr-3"></i>
                                    <span>${item.text}</span>
                                </div>
                                <span class="text-gray-400 text-xs whitespace-nowrap ml-2">${getTimeAgo(item.date)}</span>
                            </li>
                        `).join('')}
                        ${recentActivity.length === 0 ? '<li class="text-gray-500 text-center py-4">No recent activity.</li>' : ''}
                    </ul>
                </div>
            </div>
        `;
    },
    afterRender: () => {
        const ctx = document.getElementById('bookingsChart')?.getContext('2d');
        if (ctx && window.dashboardChartData) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Bookings',
                        data: window.dashboardChartData,
                        backgroundColor: 'rgba(79, 70, 229, 0.2)', // Indigo-500 with opacity
                        borderColor: 'rgba(79, 70, 229, 1)', // Indigo-500
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }
};

// Helper for relative time
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return Math.floor(seconds) + " seconds ago";
}

export default Dashboard;
