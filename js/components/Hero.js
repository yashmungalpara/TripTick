
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
            <div class="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-full max-w-4xl w-full flex flex-col md:flex-row shadow-2xl">
                <div class="flex-1 flex items-center px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/20">
                    <i class="fa-solid fa-location-dot text-white/70 mr-3"></i>
                    <div class="text-left w-full">
                        <label class="block text-xs text-white/70 uppercase">Where to next?</label>
                        <input type="text" placeholder="Search destinations" class="w-full bg-transparent border-none text-white placeholder-gray-300 focus:ring-0 text-sm font-medium outline-none h-6">
                    </div>
                </div>
                <div class="flex-1 flex items-center px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-white/20">
                    <i class="fa-regular fa-calendar text-white/70 mr-3"></i>
                    <div class="text-left w-full">
                        <label class="block text-xs text-white/70 uppercase">Travel Dates</label>
                        <input type="text" placeholder="Add dates" class="w-full bg-transparent border-none text-white placeholder-gray-300 focus:ring-0 text-sm font-medium outline-none h-6">
                    </div>
                </div>
                <div class="flex-1 flex items-center px-4 py-3 md:py-2">
                    <i class="fa-solid fa-user-group text-white/70 mr-3"></i>
                    <div class="text-left w-full">
                        <label class="block text-xs text-white/70 uppercase">Guests</label>
                        <input type="text" placeholder="Add guests" class="w-full bg-transparent border-none text-white placeholder-gray-300 focus:ring-0 text-sm font-medium outline-none h-6">
                    </div>
                </div>
                <button class="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-8 py-3 md:py-1 my-2 md:my-0 md:ml-2 transition shadow-md whitespace-nowrap">
                    Find my trip
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
