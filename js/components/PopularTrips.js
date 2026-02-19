import supabase from '../supabaseClient.js';

export default function PopularTrips() {

    async function loadPopularTrips() {
        // Select top 6 highest rated trips instead of hardcoded IDs
        const { data: trips, error } = await supabase
            .from('trips')
            .select('*')
            .order('rating', { ascending: false })
            .limit(6);

        const container = document.getElementById('popular-trips-scroll');

        if (error) {
            console.error('Error loading popular trips:', error);
            if (container) container.innerHTML = '<div class="p-4 text-center w-full text-gray-400">Failed to load popular trips.</div>';
            return;
        }

        if (!trips || trips.length === 0) {
            console.warn('No popular trips found.');
            if (container) container.innerHTML = '<div class="p-4 text-center w-full text-gray-400">No popular trips available.</div>';
            return;
        }

        if (!container) return;

        const cards = trips.map(trip => `
            <div class="min-w-[320px] md:min-w-[380px] bg-white rounded-xl shadow-lg overflow-hidden snap-center flex flex-col group relative">
                 <div class="relative h-56 overflow-hidden">
                    <img src="${trip.image}" alt="${trip.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                 </div>
                 
                 <div class="p-5 flex flex-col flex-1">
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center space-x-2">
                            <img src="${trip.flag}" alt="${trip.country} flag" class="w-5 h-auto rounded-sm shadow-sm">
                            <span class="font-bold text-gray-800">${trip.country}</span>
                        </div>
                         <span class="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">${trip.days}</span>
                    </div>
                    
                    <h3 class="text-xl font-bold text-gray-900 mb-1 leading-tight">${trip.title}</h3>
                    <p class="text-gray-500 text-sm mb-3">${trip.location}</p>
                    
                    <div class="flex items-center mb-4 text-yellow-500 text-sm">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <span class="ml-2 text-gray-400 text-xs font-medium">${trip.rating}</span>
                    </div>

                    <div class="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                        <div class="text-2xl font-bold text-red-500">${trip.price}</div>
                        <button onclick="handleBooking(${trip.id})" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow-md transition-colors text-sm transform active:scale-95">
                            Book Now
                        </button>
                    </div>
                 </div>
            </div>
        `).join('');

        // Inject content (Original + Duplicate for loop)
        container.innerHTML = cards + cards;
    }

    // Trigger load
    setTimeout(loadPopularTrips, 0);

    return `
    <section class="py-20 bg-gray-50 from-gray-50 to-white">
        <div class="container mx-auto px-4">
            
            <div class="flex justify-between items-end mb-12">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Popular <span class="text-red-600">Trips</span>
                    </h2>
                    <p class="text-gray-600 text-lg max-w-xl">
                        Discover our most loved destinations, curated just for you.
                    </p>
                </div>
                
                <!-- Navigation Buttons Removed as per request -->
            </div>

            <!-- Horizontal Scroll Container -->
            <div class="relative overflow-hidden group">
                <!-- Fade Gradients for smooth edges -->
                <div class="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div class="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

                <div id="popular-trips-scroll" class="flex gap-8 animate-scroll hover:pause" style="width: max-content;">
                    <!-- Loading State -->
                     <div class="w-full text-center p-8 flex items-center gap-4 text-gray-500">
                        <div class="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        Loading popular trips...
                    </div>
                </div>
            </div>
            
            <div class="flex justify-center mt-8">
                 <button class="md:hidden bg-red-100 text-red-600 px-6 py-2 rounded-full font-bold text-sm">
                    View All Trips
                 </button>
            </div>

        </div>
    </section>
    <style>
        @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-scroll {
            animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
            animation-play-state: paused;
        }
    </style>
    `;
}


