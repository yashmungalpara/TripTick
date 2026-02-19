
export default function Hero() {
    return `
    <section class="relative h-[85vh] w-full bg-cover bg-center overflow-hidden" style="background-image: url('https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop');">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/30"></div>
        
        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                Find your next <br> unforgettable trip
            </h1>
            <p class="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-sm">
                Discover hidden gems, chill spots, and wild adventures, all in one place.
            </p>

            <!-- Search Bar -->
            <div class="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-full max-w-2xl w-full flex flex-row shadow-2xl">
                <div class="flex-1 flex items-center px-4 py-3 md:py-2 relative">
                    <i class="fa-solid fa-location-dot text-white/70 mr-3"></i>
                    <div class="text-left w-full">
                        <label class="block text-xs text-white/70 uppercase">Where to next?</label>
                        <input id="hero-search-input" type="text" placeholder="Search destinations, countries, or cities..." class="w-full bg-transparent border-none text-white placeholder-gray-300 focus:ring-0 text-sm font-medium outline-none h-6" autocomplete="off">
                        <!-- Suggestions Container -->
                        <div id="search-suggestions" class="absolute top-full left-0 w-full bg-white rounded-lg shadow-xl mt-2 hidden z-50 overflow-hidden max-h-60 overflow-y-auto">
                            <!-- Items injected by JS -->
                        </div>
                    </div>
                </div>
                
                <button onclick="const val = document.getElementById('hero-search-input').value; if(val) window.location.hash='#packages?search=' + encodeURIComponent(val);" class="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-8 py-3 md:py-1 my-2 md:my-0 md:ml-2 transition shadow-md whitespace-nowrap">
                    Search
                </button>
            </div>
            
            <!-- Tags/Pills below search (optional from design) -->
            <div class="mt-8 flex gap-4 overflow-x-auto max-w-full pb-2">
                 <!-- Example pills if needed -->
            </div>
        </div>
    </section>
    `;
}
