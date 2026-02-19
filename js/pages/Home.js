import Hero from '../components/Hero.js';
import PopularTrips from '../components/PopularTrips.js';
import Discover from '../components/Discover.js';
import Moments from '../components/Moments.js';
import ExtraSections from '../components/ExtraSections.js';


export default function Home() {
    return {
        render: () => `
            <div id="home-page">
                ${Hero()}
                ${PopularTrips()}
                ${Discover({ limit: 6, showFilters: false })}
                ${Moments.render()}
                ${ExtraSections()}
            </div>
        `,
        afterRender: () => {
            if (Moments.afterRender) {
                Moments.afterRender();
            }

            // --- Hero Search Suggestions Logic ---
            const searchInput = document.getElementById('hero-search-input');
            const suggestionsBox = document.getElementById('search-suggestions');

            if (searchInput && suggestionsBox) {
                // Ensure outside click closes suggestions
                document.addEventListener('click', (e) => {
                    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                        suggestionsBox.classList.add('hidden');
                    }
                });

                let debounceTimer;
                searchInput.addEventListener('input', async (e) => {
                    const query = e.target.value.trim();

                    // Clear previous timer
                    clearTimeout(debounceTimer);

                    if (query.length < 2) {
                        suggestionsBox.classList.add('hidden');
                        return;
                    }

                    // Debounce search
                    debounceTimer = setTimeout(async () => {
                        try {
                            const { default: searchEngine } = await import('../utils/SearchAlgorithm.js');

                            // Check if Trie is populated (if user types before Discover loads)
                            // We can check if it returns results for a known prefix or just try rely on shared state.
                            // However, since Discover.js loads 'allTrips' globally, we can use that to check/populate.
                            if (!window.allTrips || window.allTrips.length === 0) {
                                // Try to fetch efficiently if not yet loaded
                                const { default: supabase } = await import('../supabaseClient.js');
                                const { data: trips } = await supabase.from('trips').select('*');
                                if (trips) {
                                    window.allTrips = trips;
                                    searchEngine.clear();
                                    trips.forEach(t => {
                                        searchEngine.insert(t.title, t);
                                        searchEngine.insert(t.country, t);
                                        searchEngine.insert(t.location, t);
                                    });
                                }
                            }

                            const results = searchEngine.search(query).slice(0, 5); // Limit suggestions

                            if (results.length > 0) {
                                suggestionsBox.innerHTML = results.map(trip => `
                                    <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0" onclick="window.location.hash='#packages?search=${encodeURIComponent(trip.title)}'">
                                        <img src="${trip.image}" class="w-10 h-10 rounded object-cover mr-3 bg-gray-200">
                                        <div>
                                            <div class="text-sm font-semibold text-gray-800">${trip.title}</div>
                                            <div class="text-xs text-gray-500">${trip.location}, ${trip.country}</div>
                                        </div>
                                    </div>
                                `).join('');
                                suggestionsBox.classList.remove('hidden');
                            } else {
                                suggestionsBox.classList.add('hidden');
                            }
                        } catch (err) {
                            console.error("Search error:", err);
                        }
                    }, 300);
                });
            }
        }
    };
}
