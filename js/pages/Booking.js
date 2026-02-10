import { allTrips } from '../data/trips.js';

export default function Booking() {
    // 1. Get ID from URL hash (e.g. #booking?id=123)
    const hashParams = window.location.hash.split('?')[1];
    const urlParams = new URLSearchParams(hashParams);
    const tripId = parseInt(urlParams.get('id'));

    // 2. Find Trip
    const trip = allTrips.find(t => t.id === tripId);

    // 3. Fallback if no trip found
    if (!trip) {
        return `
            <div class="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
                    <p class="text-gray-600 mb-8">We couldn't find the trip you're looking for.</p>
                    <a href="#" class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">Return Home</a>
                </div>
            </div>
        `;
    }

    // 4. Render Booking Page
    return `
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
                            
                            <form id="booking-form" onsubmit="event.preventDefault(); alert('Booking Confirmed! Check your email.'); window.location.hash='';">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                        <input type="text" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="John" required>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                        <input type="text" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="Doe" required>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input type="email" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="john@example.com" required>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                        <input type="tel" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="+91 98765 43210" required>
                                    </div>
                                </div>

                                <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                    Trip Options
                                </h3>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
                                        <input type="date" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" required>
                                        <p class="mt-1 text-xs text-gray-500">Suggested: ${trip.bestTime}</p>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                                        <select class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition">
                                            <option>1 Person</option>
                                            <option selected>2 People</option>
                                            <option>3 People</option>
                                            <option>4 People</option>
                                            <option>5+ People</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200 pt-6">
                                    <button type="submit" class="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transform transition hover:-translate-y-0.5 focus:ring-4 focus:ring-red-300 text-lg">
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
}
