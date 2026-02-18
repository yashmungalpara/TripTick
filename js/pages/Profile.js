
import supabase from '../supabaseClient.js'

export default function Profile() {
    return {
        render: () => `
        <div class="container mx-auto px-4 py-8 md:py-12 mt-20 max-w-4xl">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Left Sidebar: Profile Info -->
                <div class="md:col-span-1">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
                        <div class="bg-gradient-to-r from-red-600 to-red-400 h-32 relative">
                            <div class="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                <div class="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                                    <div class="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-4xl text-gray-400">
                                        <i class="fas fa-user"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="pt-16 pb-8 px-8 text-center">
                            <h2 id="profile-name" class="text-2xl font-bold text-gray-900 mb-1">Loading...</h2>
                            <p id="profile-email" class="text-gray-500 mb-6 font-medium text-sm">...</p>

                            <div class="border-t border-gray-100 pt-6">
                                <button id="profile-logout-btn" class="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-xl text-red-600 font-bold text-sm transition-colors group">
                                    <span><i class="fas fa-sign-out-alt mr-2"></i> Sign Out</span>
                                    <i class="fas fa-chevron-right text-red-400 group-hover:text-red-600 transition-transform group-hover:translate-x-1"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Content: Bookings -->
                <div class="md:col-span-2">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <i class="fa-solid fa-suitcase-rolling mr-3 text-red-500"></i> My Trips
                    </h2>

                    <div id="bookings-list" class="space-y-4">
                        <!-- Loading State -->
                        <div class="bg-white rounded-xl p-8 text-center shadow-lg animate-pulse">
                            <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                            <div class="h-3 bg-gray-100 rounded w-1/2 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
        afterRender: async () => {
            const nameEl = document.getElementById('profile-name');
            const emailEl = document.getElementById('profile-email');
            const logoutBtn = document.getElementById('profile-logout-btn');
            const bookingsList = document.getElementById('bookings-list');

            // 1. Get User Data
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                nameEl.textContent = user.user_metadata?.full_name || user.user_metadata?.firstName + ' ' + user.user_metadata?.lastName || 'Adventurer';
                emailEl.textContent = user.email;

                // 2. Fetch Bookings
                fetchBookings(user.id);

            } else {
                // Not logged in? Redirect
                window.location.hash = '#login';
            }

            // 3. Handle Logout
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async () => {
                    await supabase.auth.signOut();
                    // app.js listener will handle redirect/navbar update
                });
            }

            async function fetchBookings(userId) {
                // Fetch bookings
                const { data: bookings, error } = await supabase
                    .from('bookings')
                    .select('*, trips(title, image, location, price)')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching bookings:', error);
                    bookingsList.innerHTML = `
                        <div class="bg-white rounded-xl p-8 text-center shadow-sm border border-red-100">
                            <p class="text-red-500">Failed to load bookings. Please try again.</p>
                        </div>
                    `;
                    return;
                }

                if (!bookings || bookings.length === 0) {
                    bookingsList.innerHTML = `
                        <div class="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <i class="fa-solid fa-map-location-dot text-3xl"></i>
                            </div>
                            <h3 class="text-lg font-bold text-gray-900 mb-2">No Scheduled Trips</h3>
                            <p class="text-gray-500 mb-6 text-sm">You haven't booked any adventures yet.</p>
                            <a href="#" class="inline-block bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition shadow-md hover:shadow-lg">
                                Explore Destinations
                            </a>
                        </div>
                    `;
                    return;
                }

                bookingsList.innerHTML = bookings.map(booking => {
                    const travelDate = new Date(booking.travel_date);
                    const now = new Date();
                    // Calculate difference in hours
                    const diffTime = travelDate - now;
                    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

                    const isCancellable = diffHours >= 48 && booking.status !== 'cancelled';

                    return `
                    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 relative">
                        <div class="flex flex-col sm:flex-row">
                            <!-- Image -->
                            <div class="sm:w-48 h-48 sm:h-auto relative">
                                <img src="${booking.trips?.image || 'https://via.placeholder.com/150'}" alt="${booking.trips?.title}" class="w-full h-full object-cover">
                                <div class="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">
                                    ${travelDate.toLocaleDateString()}
                                </div>
                            </div>

                            <!-- Details -->
                            <div class="p-6 flex flex-col justify-between flex-1">
                                <div>
                                    <div class="flex justify-between items-start mb-2">
                                        <h3 class="text-xl font-bold text-gray-900 leading-tight">${booking.trips?.title}</h3>
                                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        } capitalize">
                                            ${booking.status}
                                        </span>
                                    </div>
                                    <p class="text-gray-500 text-sm mb-4"><i class="fa-solid fa-location-dot mr-1 text-red-500"></i> ${booking.trips?.location}</p>
                                </div>
                                
                                <div class="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                    <div class="text-sm text-gray-500">
                                        <span class="font-bold text-gray-900">${booking.guests}</span> Guests
                                    </div>
                                    
                                    <div class="flex items-center gap-4">
                                        <div class="text-lg font-bold text-gray-900">
                                            ${booking.total_price}
                                        </div>
                                        
                                        ${isCancellable ? `
                                            <button onclick="window.cancelBooking(${booking.id})" class="text-red-500 hover:text-red-700 text-sm font-semibold underline decoration-red-200 hover:decoration-red-700 transition">
                                                Cancel Trip
                                            </button>
                                        ` : booking.status !== 'cancelled' ? `
                                            <span class="text-gray-400 text-xs italic" title="Less than 48 hours to trip">Non-refundable</span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `}).join('');

                // Expose cancel function globally
                window.cancelBooking = async (bookingId) => {
                    if (!confirm('Are you sure you want to cancel this trip? This action cannot be undone.')) return;

                    const { error } = await supabase
                        .from('bookings')
                        .update({ status: 'cancelled' })
                        .eq('id', bookingId);

                    if (error) {
                        alert('Error cancelling booking: ' + error.message);
                    } else {
                        // Refresh bookings
                        fetchBookings(userId);
                        // Optional: Show toast
                    }
                };
            }
        }
    };
}
