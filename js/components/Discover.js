import supabase from '../supabaseClient.js';

export default function Discover({ limit = null, showFilters = true } = {}) {
    // Initialize global storage for trips if not exists
    window.allTrips = [];

    // Unique ID for this instance to avoid conflicts if multiple on same page (simple approach)
    // For now, we'll stick to the existing global ID structure but handle logic within closure where possible.
    // However, the global `window.filterDiscover` needs to know which container to target if we had multiple.
    // Since we likely only have one "Discover" section active at a time or they share data, 
    // we will keep the global simple but respect the `limit` passed to this specific render.

    // Store config for this session (simulating component state)
    const componentConfig = { limit, showFilters };

    // Expose filter logic globally
    window.filterDiscover = (category) => {
        const container = document.getElementById('discover-grid');
        const buttons = document.querySelectorAll('.discover-btn');

        if (!container) return;

        // Update Buttons (only if filters are shown)
        if (showFilters) {
            buttons.forEach(btn => {
                if (btn.dataset.category === category) {
                    btn.classList.remove('bg-gray-100', 'text-gray-600');
                    btn.classList.add('bg-black', 'text-white');
                } else {
                    btn.classList.add('bg-gray-100', 'text-gray-600');
                    btn.classList.remove('bg-black', 'text-white');
                }
            });
        }

        // Filter Data
        let filtered = window.allTrips;
        if (category === 'All') {
            filtered = window.allTrips;
        } else if (category === 'Budget') {
            filtered = window.allTrips.filter(t => {
                const priceValue = parseInt(t.price.replace(/[^\d]/g, ''), 10);
                return priceValue < 100000;
            });
        } else if (category === 'Luxury') {
            filtered = window.allTrips.filter(t => {
                const priceValue = parseInt(t.price.replace(/[^\d]/g, ''), 10);
                return priceValue >= 100000;
            });
        } else {
            filtered = window.allTrips.filter(t => t.category === category);
        }

        // Apply Limit if set
        if (componentConfig.limit) {
            filtered = filtered.slice(0, componentConfig.limit);
        }

        if (filtered.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">No trips found in this category.</div>`;
            return;
        }

        // Render Cards
        container.innerHTML = filtered.map(trip => `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group relative transition-all duration-300 hover:shadow-xl cursor-pointer" onclick="openTripDetailsPopup(${trip.id})">
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
                        <button onclick="openTripDetailsPopup(${trip.id}); event.stopPropagation();" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded shadow-md transition-colors text-sm">
                            View Details
                        </button>
                    </div>
                 </div>
            </div>
        `).join('');
    };

    // --- Modal Logic ---
    window.openTripDetailsPopup = (id) => {
        const trip = window.allTrips.find(t => t.id === id);
        if (!trip) return;

        const modal = document.getElementById('details-modal');
        const container = document.getElementById('details-content');

        // Defaults if missing (for legacy or filler data)
        const desc = trip.description || "Experience an unforgettable journey to " + trip.title;
        const bestTime = trip.best_time || trip.bestTime || "Year Round"; // Handle snake_case from DB
        const difficulty = trip.difficulty || "Moderate";
        const groupSize = trip.group_size || trip.groupSize || "2-12";
        const accommodation = trip.accommodation || "Hotels & Resorts";

        // Itinerary might be string (DB) or already parsed? DB is text.
        const itinerary = trip.itinerary || `${trip.country} City Tour → Cultural Sites → Departure`;

        // Highlights might be array (DB text[]) or needs parsing if text
        // Highlights might be array (DB text[]) or needs parsing if text
        let highlights = trip.highlights;

        if (typeof highlights === 'string') {
            try {
                // Try JSON first
                // If it looks like JSON array [...]
                highlights = JSON.parse(highlights);
            } catch (e) {
                // Try Postgres Array format: {"Item 1", "Item 2"}
                if (highlights.trim().startsWith('{') && highlights.trim().endsWith('}')) {
                    highlights = highlights
                        .trim()
                        .slice(1, -1) // Remove { }
                        // Split by comma, but ignore commas inside double quotes
                        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                        .map(item => {
                            // Trim whitespace, remove surrounding quotes if exist, unescape double quotes
                            return item.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
                        });
                }
            }
        }

        // Fallback default if still not array or empty
        if (!Array.isArray(highlights) || highlights.length === 0) {
            highlights = ["City Tour", "Local Cuisine", "Cultural Sites", "Scenic Drives"];
        }

        const reviews = trip.reviews || "100+ Reviews";

        // HTML Content for Modal
        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 h-full">
                <!-- Left: Image -->
                <div class="h-64 md:h-full relative">
                    <img src="${trip.image}" class="w-full h-full object-cover" alt="${trip.title}">
                     <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm md:hidden">
                        ${trip.price}
                    </div>
                </div>

                <!-- Right: Details -->
                <div class="p-12 md:p-8 overflow-y-auto max-h-[80vh] md:max-h-[80vh]">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h2 class="text-3xl font-bold text-gray-900 leading-tight mb-1">${trip.title}</h2>
                             <div class="flex items-center space-x-2 text-gray-600 mb-3">
                                <img src="${trip.flag}" class="w-5 h-auto rounded-sm" alt="Flag">
                                <span class="font-medium text-sm">${trip.country}</span>
                             </div>
                        </div>
                        <button onclick="closeDetailsPopup()" class="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                            <i class="fa-solid fa-circle-xmark text-2xl"></i>
                        </button>
                    </div>

                    <div class="flex items-center space-x-4 mb-6 text-sm">
                        <div class="flex items-center text-yellow-500">
                             <i class="fa-solid fa-star"></i>
                             <i class="fa-solid fa-star"></i>
                             <i class="fa-solid fa-star"></i>
                             <i class="fa-solid fa-star"></i>
                             <i class="fa-solid fa-star"></i>
                        </div>
                        <span class="text-yellow-600 font-bold">${trip.rating}</span>
                        <span class="text-gray-400">(${reviews})</span>
                    </div>

                    <p class="text-gray-600 mb-6 leading-relaxed">
                        ${desc}
                    </p>

                    <!-- Info Box -->
                    <div class="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
                        <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                            <i class="fa-solid fa-circle-info mr-2 text-emerald-500"></i> Travel Details
                        </h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="block text-gray-400 text-xs uppercase tracking-wider mb-1">Best Time</span>
                                <span class="font-semibold text-gray-700">${bestTime}</span>
                            </div>
                            <div>
                                <span class="block text-gray-400 text-xs uppercase tracking-wider mb-1">Difficulty</span>
                                <span class="font-semibold text-gray-700">${difficulty}</span>
                            </div>
                             <div>
                                <span class="block text-gray-400 text-xs uppercase tracking-wider mb-1">Group Size</span>
                                <span class="font-semibold text-gray-700">${groupSize} People</span>
                            </div>
                             <div>
                                <span class="block text-gray-400 text-xs uppercase tracking-wider mb-1">Accommodation</span>
                                <span class="font-semibold text-gray-700">${accommodation}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Itinerary -->
                    <div class="mb-6">
                        <h4 class="font-bold text-gray-800 mb-2 flex items-center">
                            <i class="fa-solid fa-route mr-2 text-emerald-500"></i> Itinerary
                        </h4>
                        <p class="text-gray-600 text-sm bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 inline-block">
                            ${itinerary}
                        </p>
                    </div>

                    <!-- Highlights -->
                    <div class="mb-8">
                        <h4 class="font-bold text-gray-800 mb-3 flex items-center">
                            <i class="fa-solid fa-star mr-2 text-emerald-500"></i> Package Highlights
                        </h4>
                        <ul class="space-y-2">
                            ${Array.isArray(highlights) ? highlights.map(h => `
                                <li class="flex items-start text-sm text-gray-600">
                                    <i class="fa-solid fa-check text-emerald-500 mt-1 mr-3"></i>
                                    ${h}
                                </li>
                            `).join('') : `
                                 <li class="flex items-start text-sm text-gray-600">
                                    <i class="fa-solid fa-check text-emerald-500 mt-1 mr-3"></i>
                                    ${highlights}
                                </li>
                            `}
                        </ul>
                    </div>

                    <!-- Footer Actions -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 pt-6 mt-auto">
                        <div>
                             <span class="block text-xs text-gray-400 mb-1">Total Price</span>
                             <span class="text-2xl md:text-3xl font-bold text-red-500 break-words">${trip.price}</span>
                        </div>
                        <button onclick="handleBooking(${trip.id}); closeDetailsPopup();" class="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-500/30 transition transform hover:-translate-y-0.5 whitespace-nowrap">
                            Book Now
                        </button>
                    </div>

                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Click outside to close
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeDetailsPopup();
            }
        };
    };

    window.closeDetailsPopup = () => {
        const modal = document.getElementById('details-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    };

    // Fetch Data
    async function loadTrips() {
        const { data: trips, error } = await supabase
            .from('trips')
            .select('*');

        if (error) {
            console.error('Error fetching trips:', error);
            const container = document.getElementById('discover-grid');
            if (container) container.innerHTML = '<div class="col-span-full text-center text-red-500">Failed to load trips. Please try again later.</div>';
            return;
        }

        window.allTrips = trips;

        // Initial Render
        const initialCategory = window.searchCategory || 'All';
        window.filterDiscover(initialCategory);
        window.searchCategory = null;
    }

    // Trigger load
    setTimeout(loadTrips, 0);

    // Initial Categories
    const categories = ['All', 'Budget', 'Luxury', 'Asia', 'Europe', 'Americas', 'Africa'];

    const categoryTabs = showFilters ? categories.map((cat, index) => `
        <button 
            onclick="filterDiscover('${cat}')"
            data-category="${cat}"
            class="discover-btn px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${index === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
            ${cat}
        </button>
    `).join('') : '';

    return `
    <section class="py-14 bg-gray-50" id="discover-section">
        <div class="container mx-auto px-2">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    ${limit ? 'Featured Destinations' : 'Discover the World'}
                </h2>
                ${showFilters ? `
                <div class="flex flex-wrap justify-center gap-3">
                    ${categoryTabs}
                </div>
                ` : ''}
            </div>
            
            <div id="discover-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
                <!-- Loading State -->
                <div class="col-span-full flex flex-col items-center justify-center py-12">
                    <div class="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mb-4"></div>
                    <p class="text-gray-500 font-medium">Loading amazing destinations...</p>
                </div>
            </div>
        </div>

        <!-- Detailed Trip Modal -->
        <div id="details-modal" class="fixed inset-0 bg-black/60 hidden items-center justify-center z-50 backdrop-blur-sm p-4">
            <div id="details-content" class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] md:h-[600px] overflow-hidden relative animate-[fadeIn_0.3s_ease-out]">
                <!-- Content injected by JS -->
            </div>
        </div>
    </section>
    `;
}


