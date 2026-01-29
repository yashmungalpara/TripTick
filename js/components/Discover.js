
export default function Discover() {
    const categories = ['All', 'Asia', 'Europe', 'Oceania', 'Africa', 'Caribbean', 'Pacific Island', 'Middle East'];

    const categoryTabs = categories.map((cat, index) => `
        <button class="px-5 py-2 rounded-full text-sm font-medium transition ${index === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
            ${cat}
        </button>
    `).join('');

    return `
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">Discover the World</h2>
            <div class="flex flex-wrap justify-center gap-3 mb-12">
                ${categoryTabs}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
                <!-- Item 1 - Large -->
                <div class="md:col-span-6 relative group rounded-3xl overflow-hidden cursor-pointer h-64 md:h-auto">
                    <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2574&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Santorini">
                     <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-8 text-left">
                         <span class="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full mb-3 inline-block border border-white/20">45+ Curated Destinations</span>
                        <h3 class="text-2xl font-bold text-white mb-2">Santorini, Greece</h3>
                        <p class="text-white/80 text-sm line-clamp-2 mb-4">Whitewashed houses clinging to cliffs overlooking the Aegean Sea.</p>
                         <div class="flex gap-2">
                            <span class="text-[10px] text-white/90 border border-white/30 px-2 py-1 rounded-full">Romantic</span>
                            <span class="text-[10px] text-white/90 border border-white/30 px-2 py-1 rounded-full">Luxury</span>
                         </div>
                    </div>
                </div>

                <!-- Right Column Stack -->
                <div class="md:col-span-6 flex flex-col gap-6">
                     <!-- Item 2 -->
                     <div class="flex-1 relative group rounded-3xl overflow-hidden cursor-pointer h-64 md:h-auto">
                        <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Kyoto">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-6 text-left">
                            <h3 class="text-xl font-bold text-white mb-1">Kyoto, Japan</h3>
                             <p class="text-white/80 text-xs mb-2">Ancient temples and colorful shrines.</p>
                        </div>
                     </div>

                     <div class="flex-1 grid grid-cols-2 gap-6">
                        <!-- Item 3 -->
                        <div class="relative group rounded-3xl overflow-hidden cursor-pointer h-48 md:h-auto">
                            <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2574&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Palawan">
                             <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            <div class="absolute bottom-0 left-0 p-4 text-left">
                                <h3 class="text-lg font-bold text-white">Palawan</h3>
                            </div>
                        </div>
                        <!-- Item 4 -->
                        <div class="relative group rounded-3xl overflow-hidden cursor-pointer h-48 md:h-auto bg-gray-200 flex items-center justify-center">
                            <span class="text-gray-400 font-semibold group-hover:text-gray-600 transition">More +</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </section>
    `;
}
