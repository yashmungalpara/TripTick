import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

export default function Booking() {
    // 1. Get ID from URL hash (e.g. #booking?id=123)
    const hashParams = window.location.hash.split('?')[1];
    const urlParams = new URLSearchParams(hashParams);
    const tripId = parseInt(urlParams.get('id'));

    // Container for async content
    const containerId = 'booking-container';

    // Async render function
    setTimeout(async () => {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Fetch Trip Data
        const { data: trip, error } = await supabase
            .from('trips')
            .select('*')
            .eq('id', tripId)
            .single();

        if (error || !trip) {
            container.innerHTML = `
                <div class="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
                        <p class="text-gray-600 mb-8">We couldn't find the trip you're looking for.</p>
                        <a href="#" class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">Return Home</a>
                    </div>
                </div>
            `;
            return;
        }

        // Fetch Current User
        const { data: { user } } = await supabase.auth.getUser();

        // Render Booking Page
        container.innerHTML = `
            <div class="bg-gray-50 min-h-screen pb-20 pt-10">
                <div class="container mx-auto px-4">
                    
                    <!-- Header -->
                    <div class="max-w-4xl mx-auto mb-8">
                        <a href="#" class="inline-flex items-center text-gray-500 hover:text-black mb-4 transition">
                            <i class="fa-solid fa-arrow-left mr-2"></i> Back to Home
                        </a>
                        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 border-l-4 border-red-500 pl-4">
                            Confirm Your Booking
                        </h1>
                    </div>

                    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <!-- Left Column: Trip Summary Card -->
                        <div class="lg:col-span-1 h-fit">
                            <div class="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
                                <div class="relative h-48">
                                    <img src="${trip.image}" alt="${trip.title}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/20"></div>
                                    <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow text-sm font-bold text-gray-800">
                                        ${trip.days}
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h2 class="text-2xl font-bold text-gray-900 mb-1 leading-tight">${trip.title}</h2>
                                    <p class="text-gray-500 text-sm mb-4 flex items-center">
                                        <i class="fa-solid fa-location-dot mr-2 text-red-500"></i> ${trip.location}
                                    </p>
                                    
                                    <div class="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                                        <span class="text-gray-500 text-sm">Base Price</span>
                                        <span class="text-xl font-bold text-gray-900">${trip.price}</span>
                                    </div>

                                    <div class="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm flex items-start">
                                        <i class="fa-solid fa-star mt-1 mr-2 text-yellow-500"></i>
                                        <span>rated ${trip.rating} by ${trip.reviews}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Booking Form -->
                        <div class="lg:col-span-2">
                            <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                    Guest Details
                                </h3>
                                
                                <form id="booking-form">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                            <input type="text" name="firstName" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="John" required value="${user?.user_metadata?.firstName || ''}">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                            <input type="text" name="lastName" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="Doe" required value="${user?.user_metadata?.lastName || ''}">
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                            <input type="email" name="email" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="john@example.com" required value="${user?.email || ''}" readonly class="cursor-not-allowed opacity-70">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" name="phone" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="+91 98765 43210" required>
                                        </div>
                                    </div>

                                    <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                        Trip Options
                                    </h3>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
                                            <input type="date" id="travelDate" name="travelDate" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" required>
                                            <p class="mt-1 text-xs text-gray-500">Suggested: ${trip.best_time || trip.bestTime}</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                                            <select name="guests" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition">
                                                <option value="1">1 Person</option>
                                                <option value="2" selected>2 People</option>
                                                <option value="3">3 People</option>
                                                <option value="4">4 People</option>
                                                <option value="5">5+ People</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="border-t border-gray-200 pt-6">
                                        <button type="submit" id="submit-btn" class="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 focus:ring-4 focus:ring-red-300 text-lg flex items-center justify-center">
                                            Confirm Reservation
                                            <i class="fa-solid fa-arrow-right ml-2 opacity-80"></i>
                                        </button>
                                        <p class="mt-4 text-sm text-gray-400 text-center md:text-left">
                                            <i class="fa-solid fa-lock mr-1"></i> Secure booking powered by TripTick
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Set Min Date to Today
        const dateInput = document.getElementById('travelDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        // Handle Form Submission
        document.getElementById('booking-form').addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const travelDate = formData.get('travelDate');

            // Client-side Validation for Past Dates
            const selectedDate = new Date(travelDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to midnight for fair comparison

            if (selectedDate < today) {
                showToast('Please select a valid future date.', 'error');
                return;
            }

            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            btn.disabled = true;

            const bookingData = {
                trip_id: tripId,
                user_id: user.id,
                first_name: formData.get('firstName'),
                last_name: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                travel_date: travelDate,
                guests: parseInt(formData.get('guests')),
                total_price: trip.price, // Ideally calculate based on guests, but simplifying for now
                status: 'confirmed'
            };

            const { error: insertError } = await supabase
                .from('bookings')
                .insert([bookingData]);

            if (insertError) {
                console.error('Booking Error:', insertError);
                showToast('Failed to book trip. Please try again.', 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
            } else {
                showToast('Booking Confirmed! Check your profile.', 'success');
                setTimeout(() => {
                    window.location.hash = '#profile';
                }, 1500);
            }
        });

    }, 0);

    return `
        <div id="${containerId}">
             <div class="min-h-screen flex items-center justify-center">
                <div class="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
            </div>
        </div>
    `;
}
