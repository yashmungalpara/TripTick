export default function Destinations() {
    return `
        <div class="bg-white min-h-screen pb-20">
            
            <!-- Hero Section -->
            <div class="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40"></div>
                <div class="relative text-center px-4 z-10">
                    <span class="block text-red-500 font-bold tracking-widest uppercase mb-4 text-sm md:text-base animate-pulse">
                        Start Your Journey
                    </span>
                    <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                        Explore the <span class="italic font-serif text-yellow-400">Unseen</span>
                    </h1>
                     <p class="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
                        From the soaring peaks of the Himalayas to the pristine beaches of the Maldives, discover destinations that will change your perspective.
                    </p>
                    <a href="#packages" class="inline-block bg-white text-gray-900 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition transform hover:-translate-y-1">
                        View All Packages
                    </a>
                </div>
            </div>

            <!-- Continents Grid -->
            <div class="container mx-auto px-4 py-20">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-gray-900 mb-4">Choose Your Region</h2>
                    <div class="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <!-- Asia -->
                    <div class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl" onclick="window.searchCategory = 'Asia'; window.location.hash='#packages'">
                        <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-6 left-6 text-white">
                            <h3 class="text-3xl font-bold mb-2">Asia</h3>
                            <p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                Ancient traditions meets modern wonders.
                            </p>
                        </div>
                        <div class="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2 group-hover:bg-red-500 transition">
                             <i class="fa-solid fa-arrow-right text-white transform -rotate-45 group-hover:rotate-0 transition duration-300"></i>
                        </div>
                    </div>

                    <!-- Europe -->
                    <div class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl" onclick="window.searchCategory = 'Europe'; window.location.hash='#packages'">
                        <img src="https://images.unsplash.com/photo-1467269204594-9661b133dd2b?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-6 left-6 text-white">
                            <h3 class="text-3xl font-bold mb-2">Europe</h3>
                             <p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                History, art, and romance in every corner.
                            </p>
                        </div>
                         <div class="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2 group-hover:bg-red-500 transition">
                             <i class="fa-solid fa-arrow-right text-white transform -rotate-45 group-hover:rotate-0 transition duration-300"></i>
                        </div>
                    </div>

                     <!-- Americas -->
                    <div class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl" onclick="window.searchCategory = 'Americas'; window.location.hash='#packages'">
                        <img src="https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-6 left-6 text-white">
                            <h3 class="text-3xl font-bold mb-2">Americas</h3>
                             <p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                Diverse landscapes and vibrant cultures.
                            </p>
                        </div>
                         <div class="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2 group-hover:bg-red-500 transition">
                             <i class="fa-solid fa-arrow-right text-white transform -rotate-45 group-hover:rotate-0 transition duration-300"></i>
                        </div>
                    </div>
                    
                    <!-- Africa -->
                     <div class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl md:col-span-2 lg:col-span-3" onclick="window.searchCategory = 'Africa'; window.location.hash='#packages'">
                        <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div class="absolute bottom-6 left-6 text-white">
                            <h3 class="text-3xl font-bold mb-2">Africa</h3>
                             <p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                Wild safaris and breathtaking sunsets.
                            </p>
                        </div>
                         <div class="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2 group-hover:bg-red-500 transition">
                             <i class="fa-solid fa-arrow-right text-white transform -rotate-45 group-hover:rotate-0 transition duration-300"></i>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Trending Countries Visuals -->
             <div class="bg-gray-50 py-20">
                <div class="container mx-auto px-4">
                     <div class="flex justify-between items-end mb-12">
                        <div>
                            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trending Now</h2>
                             <p class="text-gray-500">Most visited destinations this month</p>
                        </div>
                        <a href="#packages" class="text-red-600 font-semibold hover:text-red-700 flex items-center">
                            See All
                            <i class="fa-solid fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <!-- item 1 -->
                        <div class="text-center group cursor-pointer" onclick="window.location.hash='#packages'">
                            <div class="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 relative">
                                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                                <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                            </div>
                            <h3 class="font-bold text-lg text-gray-800 group-hover:text-red-600 transition">Japan</h3>
                        </div>
                         <!-- item 2 -->
                        <div class="text-center group cursor-pointer" onclick="window.location.hash='#packages'">
                            <div class="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 relative">
                                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                                 <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                            </div>
                            <h3 class="font-bold text-lg text-gray-800 group-hover:text-red-600 transition">France</h3>
                        </div>
                         <!-- item 3 -->
                        <div class="text-center group cursor-pointer" onclick="window.location.hash='#packages'">
                            <div class="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 relative">
                                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                                 <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                            </div>
                            <h3 class="font-bold text-lg text-gray-800 group-hover:text-red-600 transition">Bali</h3>
                        </div>
                         <!-- item 4 -->
                        <div class="text-center group cursor-pointer" onclick="window.location.hash='#packages'">
                            <div class="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 relative">
                                <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=600&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                                 <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                            </div>
                            <h3 class="font-bold text-lg text-gray-800 group-hover:text-red-600 transition">Thailand</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `;
}
