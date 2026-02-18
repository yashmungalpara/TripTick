
import supabase from '../supabaseClient.js';

const Dashboard = {
    render: async () => {
        // Parallel data fetching for performance
        const [
            { count: tripsCount },
            { count: bookingsCount, data: bookings },
            { count: usersCount, data: users },
            { count: feedbackCount, data: feedback },
            { count: messagesCount, data: messages }
        ] = await Promise.all([
            supabase.from('trips').select('*', { count: 'exact', head: true }),
            supabase.from('bookings').select('*, trips(title)', { count: 'exact' }).order('created_at', { ascending: false }),
            supabase.from('profiles').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
            supabase.from('feedback').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5),
            supabase.from('messages').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(5)
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

        // Format Revenue
        const formattedRevenue = totalRevenue.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        });

        // Prepare Recent Activity
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
        feedback?.forEach(f => {
            activity.push({
                type: 'feedback',
                text: `New feedback from "${f.name || 'Anonymous'}"`,
                date: new Date(f.created_at),
                icon: 'fa-comment-alt',
                color: 'text-purple-500'
            });
        });
        messages?.forEach(m => {
            activity.push({
                type: 'message',
                text: `New message from "${m.name || 'Anonymous'}"`,
                date: new Date(m.created_at),
                icon: 'fa-envelope',
                color: 'text-orange-500'
            });
        });

        // Sort and take top 5
        const recentActivity = activity.sort((a, b) => b.date - a.date).slice(0, 5);

        // Prepare Chart Data
        const currentYear = new Date().getFullYear();
        const bookingsPerMonth = new Array(12).fill(0);

        bookings?.forEach(b => {
            const date = new Date(b.created_at);
            if (date.getFullYear() === currentYear) {
                bookingsPerMonth[date.getMonth()]++;
            }
        });

        // Store chart data globally
        window.dashboardChartData = bookingsPerMonth;

        return `
            <h2 class="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>
            
            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                <!-- Card 1: Revenue -->
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
                <!-- Card 2: Bookings -->
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
                <!-- Card 3: Trips -->
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
                <!-- Card 4: Users -->
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
                 <!-- Card 5: Feedback -->
                <div class="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium uppercase">Total Feedback</p>
                            <h3 class="text-2xl font-bold text-gray-800">${feedbackCount || 0}</h3>
                        </div>
                        <div class="p-3 bg-purple-100 rounded-full text-purple-500">
                            <i class="fas fa-comments text-xl"></i>
                        </div>
                    </div>
                </div>
                <!-- Card 6: Messages (New) -->
                <div class="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-gray-500 text-sm font-medium uppercase">Messages</p>
                            <h3 class="text-2xl font-bold text-gray-800">${messagesCount || 0}</h3>
                        </div>
                        <div class="p-3 bg-orange-100 rounded-full text-orange-500">
                            <i class="fas fa-envelope text-xl"></i>
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
