export default function Discover() {
    // Extended Mock Data with Categories and Details
    const allTrips = [
        // --- ASIA ---
        {
            id: 1,
            category: 'Asia',
            country: "India",
            flag: "https://flagcdn.com/w40/in.png",
            title: "Kerala Backwaters",
            location: "Alleppey, Munnar, Kochi",
            days: "6 Days",
            price: "₹18,500",
            rating: "4.7/5",
            reviews: "98 Reviews",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
            description: "Experience the tranquility of Kerala's backwaters on a houseboat, explore tea plantations in Munnar, and witness the colonial charm of Kochi.",
            bestTime: "Sep-Mar",
            difficulty: "Easy",
            groupSize: "2-8",
            accommodation: "Houseboat & Hotels",
            itinerary: "Kochi → Munnar → Alleppey → Kochi",
            highlights: ["Houseboat stay", "Tea museum visit", "Kathakali performance", "Ayurvedic massage"]
        },
        {
            id: 2,
            category: 'Asia',
            country: "Japan",
            flag: "https://flagcdn.com/w40/jp.png",
            title: "Japan Cultural Journey",
            location: "Kyoto, Nara, Osaka",
            days: "14 Days",
            price: "₹2,17,425",
            rating: "4.8/5",
            reviews: "124 Reviews",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
            description: "Discover ancient traditions and modern wonders in the Land of the Rising Sun. From bustling Tokyo streets to serene Kyoto temples.",
            bestTime: "Mar-May, Sep-Nov",
            difficulty: "Moderate",
            groupSize: "2-10",
            accommodation: "Ryokan & Hotels",
            itinerary: "Tokyo → Kyoto → Osaka → Hiroshima",
            highlights: ["Tokyo Skytree", "Kyoto temples", "Bullet train experience", "Tea ceremony"]
        },
        {
            id: 11,
            category: 'Asia',
            country: "Thailand",
            flag: "https://flagcdn.com/w40/th.png",
            title: "Phi Phi Island Hop",
            location: "Phuket, Krabi, Phi Phi",
            days: "5 Days",
            price: "₹45,000",
            rating: "4.6/5",
            reviews: "85 Reviews",
            image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop",
            description: "Hop between the stunning islands of Thailand. Snorkel in crystal clear waters and relax on white sandy beaches.",
            bestTime: "Nov-Apr",
            difficulty: "Easy",
            groupSize: "4-12",
            accommodation: "Beach Resorts",
            itinerary: "Phuket → Phi Phi → Krabi",
            highlights: ["Maya Bay", "Snorkeling", "Beach parties", "Long-tail boat ride"]
        },
        {
            id: 12,
            category: 'Asia',
            country: "Vietnam",
            flag: "https://flagcdn.com/w40/vn.png",
            title: "Ha Long Bay Cruise",
            location: "Hanoi, Ha Long Bay",
            days: "4 Days",
            price: "₹35,000",
            rating: "4.8/5",
            reviews: "76 Reviews",
            image: "https://images.unsplash.com/photo-1559592413-7cec4d0ea49b?q=80&w=1000&auto=format&fit=crop",
            description: "Cruise through the emerald waters of Ha Long Bay, surrounded by thousands of towering limestone isles.",
            bestTime: "Oct-Dec",
            difficulty: "Easy",
            groupSize: "2-16",
            accommodation: "Luxury Cruise",
            itinerary: "Hanoi → Ha Long Bay → Hanoi",
            highlights: ["Overnight cruise", "Cave exploration", "Kayaking", "Tai Chi on deck"]
        },
        {
            id: 13,
            category: 'Asia',
            country: "Indonesia",
            flag: "https://flagcdn.com/w40/id.png",
            title: "Bali Spiritual Journey",
            location: "Ubud, Uluwatu, Kuta",
            days: "6 Days",
            price: "₹55,000",
            rating: "4.7/5",
            reviews: "112 Reviews",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
            description: "Reconnect with yourself in the spiritual heart of Bali. Visit ancient temples, lush rice terraces, and sacred monkey forests.",
            bestTime: "Apr-Oct",
            difficulty: "Moderate",
            groupSize: "2-8",
            accommodation: "Villas & Resorts",
            itinerary: "Ubud → Uluwatu → Seminyak",
            highlights: ["Sacred Monkey Forest", "Uluwatu Temple", "Rice Terrace Trek", "Traditional Dance"]
        },
        {
            id: 14,
            category: 'Asia',
            country: "Maldives",
            flag: "https://flagcdn.com/w40/mv.png",
            title: "Luxury Atoll Escape",
            location: "Male Atoll",
            days: "4 Days",
            price: "₹1,20,000",
            rating: "4.9/5",
            reviews: "54 Reviews",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop",
            description: "Indulge in ultimate luxury in a water villa over the turquoise Indian Ocean.",
            bestTime: "Nov-Apr",
            difficulty: "Easy",
            groupSize: "2",
            accommodation: "Water Villa",
            itinerary: "Male → Private Resort Island",
            highlights: ["Underwater dining", "Sunset cruise", "Snorkeling", "Spa treatments"]
        },

        // --- EUROPE ---
        {
            id: 3,
            category: 'Europe',
            country: "France",
            flag: "https://flagcdn.com/w40/fr.png",
            title: "Paris Romantic Getaway",
            location: "Paris, Versailles",
            days: "5 Days",
            price: "₹1,25,000",
            rating: "4.8/5",
            reviews: "210 Reviews",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
            description: "The City of Light awaits. Romantic strolls along the Seine, world-class art at the Louvre, and iconic Eiffel Tower views.",
            bestTime: "Apr-Jun, Sep-Nov",
            difficulty: "Easy",
            groupSize: "2-10",
            accommodation: "Boutique Hotels",
            itinerary: "Paris → Versailles → Paris",
            highlights: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Palace of Versailles"]
        },
        {
            id: 4,
            category: 'Europe',
            country: "Greece",
            flag: "https://flagcdn.com/w40/gr.png",
            title: "Santorini Sunset",
            location: "Santorini, Mykonos",
            days: "6 Days",
            price: "₹1,34,925",
            rating: "4.9/5",
            reviews: "156 Reviews",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop",
            description: "Whitewashed buildings, blue domes, and the world's most beautiful sunsets.",
            bestTime: "May-Oct",
            difficulty: "Moderate",
            groupSize: "2-12",
            accommodation: "Cliffside Hotels",
            itinerary: "Athens → Santorini → Mykonos",
            highlights: ["Oia Sunset", "Volcano Boat Tour", "Red Beach", "Ancient Akrotiri"]
        },
        {
            id: 31,
            category: 'Europe',
            country: "Switzerland",
            flag: "https://flagcdn.com/w40/ch.png",
            title: "Swiss Alpine Wonders",
            location: "Zurich, Zermatt",
            days: "5 Days",
            price: "₹1,60,000",
            rating: "4.9/5",
            reviews: "89 Reviews",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
            description: "Breathtaking mountain peaks, pristine lakes, and charming alpine villages.",
            bestTime: "Jun-Sep, Dec-Feb",
            difficulty: "Moderate",
            groupSize: "2-10",
            accommodation: "Available",
            itinerary: "Zurich → Lucerne → Interlaken",
            highlights: ["Jungfraujoch", "Lake Lucerne", "Chapel Bridge", "Chocolate Factory"]
        },
        {
            id: 32,
            category: 'Europe',
            country: "Italy",
            flag: "https://flagcdn.com/w40/it.png",
            title: "Venice Canal Tour",
            location: "Venice, Burano",
            days: "4 Days",
            price: "₹95,000",
            rating: "4.7/5",
            reviews: "130 Reviews",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
            description: "Glide through the romantic canals of Venice and explore its historic architecture.",
            bestTime: "Apr-Oct",
            difficulty: "Easy",
            groupSize: "2-8",
            accommodation: "Boutique Hotels",
            itinerary: "Venice → Murano → Burano",
            highlights: ["Gondola Ride", "St. Mark's Square", "Doge's Palace", "Glass Blowing Demo"]
        },
        {
            id: 33,
            category: 'Europe',
            country: "Spain",
            flag: "https://flagcdn.com/w40/es.png",
            title: "Barcelona Highlights",
            location: "Barcelona, Madrid",
            days: "6 Days",
            price: "₹1,15,000",
            rating: "4.6/5",
            reviews: "180 Reviews",
            image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1000&auto=format&fit=crop",
            description: "Immerse yourself in the vibrant culture and stunning architecture of Barcelona.",
            bestTime: "Apr-Jun, Sep-Oct",
            difficulty: "Moderate",
            groupSize: "2-10",
            accommodation: "City Hotels",
            itinerary: "Barcelona → Montserrat → Madrid",
            highlights: ["Sagrada Familia", "Park Güell", "Gothic Quarter", "Flamenco Show"]
        },
        // {
        //     id: 34,
        //     category: 'Europe',
        //     country: "UK",
        //     flag: "https://flagcdn.com/w40/gb.png",
        //     title: "London City Break",
        //     location: "London, Bath",
        //     days: "5 Days",
        //     price: "₹1,05,000",
        //     rating: "4.5/5",
        //     reviews: "200+ Reviews",
        //     image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
        //     description: "Explore the historic landmarks and modern attractions of London.",
        //     bestTime: "May-Sep",
        //     difficulty: "Easy",
        //     groupSize: "2-12",
        //     accommodation: "Hotels",
        //     itinerary: "London → Windsor → Bath",
        //     highlights: ["Buckingham Palace", "Tower of London", "British Museum", "West End Show"]
        // },

        // --- AMERICAS ---
        {
            id: 5,
            category: 'Americas',
            country: "USA",
            flag: "https://flagcdn.com/w40/us.png",
            title: "New York City Lights",
            location: "Manhattan, Brooklyn",
            days: "5 Days",
            price: "₹1,55,000",
            rating: "4.7/5",
            reviews: "300+ Reviews",
            image: "https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=1000&auto=format&fit=crop",
            description: "The city that never sleeps. Iconic landmarks, broadway shows, and endless energy.",
            bestTime: "May-Oct",
            difficulty: "Easy",
            groupSize: "1-10",
            accommodation: "Hotels",
            itinerary: "Manhattan → Brooklyn → Bronx",
            highlights: ["Statue of Liberty", "Times Square", "Central Park", "Brooklyn Bridge"]
        },
        {
            id: 51,
            category: 'Americas',
            country: "Brazil",
            flag: "https://flagcdn.com/w40/br.png",
            title: "Rio Carnival Vibes",
            location: "Rio de Janeiro",
            days: "5 Days",
            price: "₹1,30,000",
            rating: "4.8/5",
            reviews: "95 Reviews",
            image: "https://images.unsplash.com/photo-1483391799217-95cfe2ce2594?q=80&w=1000&auto=format&fit=crop",
            description: "Experience the vibrant energy of Rio de Janeiro, from its iconic beaches to the world-famous Carnival.",
            bestTime: "Dec-Mar",
            difficulty: "Moderate",
            groupSize: "2-15",
            accommodation: "Hotels",
            itinerary: "Rio de Janeiro → Sugarloaf Mountain → Christ the Redeemer",
            highlights: ["Copacabana Beach", "Carnival Parade", "Samba Schools", "Sugarloaf Mountain"]
        },
        {
            id: 52,
            category: 'Americas',
            country: "Canada",
            flag: "https://flagcdn.com/w40/ca.png",
            title: "Banff Nature Trek",
            location: "Banff, Jasper",
            days: "7 Days",
            price: "₹1,75,000",
            rating: "4.9/5",
            reviews: "70 Reviews",
            image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop",
            description: "Discover the majestic beauty of the Canadian Rockies with stunning lakes and wildlife.",
            bestTime: "Jun-Sep",
            difficulty: "Moderate",
            groupSize: "2-10",
            accommodation: "Lodges & Cabins",
            itinerary: "Calgary → Banff → Lake Louise → Jasper",
            highlights: ["Lake Louise", "Moraine Lake", "Icefields Parkway", "Wildlife Viewing"]
        },
        {
            id: 53,
            category: 'Americas',
            country: "Peru",
            flag: "https://flagcdn.com/w40/pe.png",
            title: "Machu Picchu Hike",
            location: "Cusco, Machu Picchu",
            days: "6 Days",
            price: "₹1,40,000",
            rating: "4.9/5",
            reviews: "88 Reviews",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop",
            description: "Trek through the Andes to the ancient Inca citadel of Machu Picchu.",
            bestTime: "May-Oct",
            difficulty: "Challenging",
            groupSize: "2-12",
            accommodation: "Hotels & Camping",
            itinerary: "Cusco → Sacred Valley → Machu Picchu",
            highlights: ["Inca Trail", "Machu Picchu Sunrise", "Sacred Valley", "Local Markets"]
        },
        {
            id: 54,
            category: 'Americas',
            country: "Mexico",
            flag: "https://flagcdn.com/w40/mx.png",
            title: "Cancun Beach Fun",
            location: "Cancun, Tulum",
            days: "5 Days",
            price: "₹1,25,000",
            rating: "4.6/5",
            reviews: "110 Reviews",
            image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=1000&auto=format&fit=crop",
            description: "Relax on the white sands of Cancun and explore ancient Mayan ruins.",
            bestTime: "Dec-Apr",
            difficulty: "Easy",
            groupSize: "2-10",
            accommodation: "All-Inclusive Resorts",
            itinerary: "Cancun → Chichen Itza → Tulum",
            highlights: ["Chichen Itza", "Tulum Ruins", "Cenote Swimming", "Beach Relaxation"]
        },
        {
            id: 55,
            category: 'Americas',
            country: "Argentina",
            flag: "https://flagcdn.com/w40/ar.png",
            title: "Patagonia Wilds",
            location: "El Calafate",
            days: "8 Days",
            price: "₹1,95,000",
            rating: "4.8/5",
            reviews: "60 Reviews",
            image: "https://images.unsplash.com/photo-1534237197335-fe45100a12e8?q=80&w=1000&auto=format&fit=crop",
            description: "Trek through the stunning landscapes of Patagonia, home to glaciers and rugged mountains.",
            bestTime: "Nov-Mar",
            difficulty: "Challenging",
            groupSize: "2-8",
            accommodation: "Estancias & Hotels",
            itinerary: "El Calafate → Perito Moreno Glacier → El Chalten",
            highlights: ["Perito Moreno Glacier", "Fitz Roy Trek", "Glacier Trekking", "Wildlife Spotting"]
        },

        // --- AFRICA ---
        {
            id: 6,
            category: 'Africa',
            country: "South Africa",
            flag: "https://flagcdn.com/w40/za.png",
            title: "Cape Town Adventure",
            location: "Cape Town, Garden Route",
            days: "8 Days",
            price: "₹1,10,000",
            rating: "4.8/5",
            reviews: "67 Reviews",
            image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop",
            description: "Where mountains meet the sea. Wildlife, wineries, and stunning coastal drives.",
            bestTime: "Nov-Mar",
            difficulty: "Moderate",
            groupSize: "2-12",
            accommodation: "Lodges",
            itinerary: "Cape Town → Stellenbosch → Hermanus",
            highlights: ["Table Mountain", "Penguin Colony", "Wine Tasting", "Safari"]
        },
        {
            id: 61,
            category: 'Africa',
            country: "Egypt",
            flag: "https://flagcdn.com/w40/eg.png",
            title: "Pyramids & Nile",
            location: "Cairo, Luxor",
            days: "6 Days",
            price: "₹90,000",
            rating: "4.7/5",
            reviews: "105 Reviews",
            image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1000&auto=format&fit=crop",
            description: "Journey back in time to the land of Pharaohs, exploring ancient wonders and cruising the Nile.",
            bestTime: "Oct-Apr",
            difficulty: "Easy",
            groupSize: "2-15",
            accommodation: "Hotels & Nile Cruise",
            itinerary: "Cairo → Luxor → Aswan",
            highlights: ["Pyramids of Giza", "Nile Cruise", "Valley of the Kings", "Abu Simbel"]
        },
        {
            id: 62,
            category: 'Africa',
            country: "Morocco",
            flag: "https://flagcdn.com/w40/ma.png",
            title: "Marrakech Market",
            location: "Marrakech, Fes",
            days: "5 Days",
            price: "₹85,000",
            rating: "4.6/5",
            reviews: "80 Reviews",
            image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1000&auto=format&fit=crop",
            description: "Immerse yourself in the vibrant souks and rich history of Morocco's imperial cities.",
            bestTime: "Mar-May, Sep-Nov",
            difficulty: "Moderate",
            groupSize: "2-10",
            accommodation: "Riads & Hotels",
            itinerary: "Marrakech → Atlas Mountains → Fes",
            highlights: ["Djemaa el-Fna", "Majorelle Garden", "Tanneries of Fes", "Sahara Desert Excursion"]
        },
        {
            id: 63,
            category: 'Africa',
            country: "Kenya",
            flag: "https://flagcdn.com/w40/ke.png",
            title: "Masai Mara Safari",
            location: "Masai Mara",
            days: "5 Days",
            price: "₹1,50,000",
            rating: "4.9/5",
            reviews: "75 Reviews",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop",
            description: "Witness the incredible wildlife and vast plains of the Masai Mara on an unforgettable safari.",
            bestTime: "Jul-Oct",
            difficulty: "Moderate",
            groupSize: "2-8",
            accommodation: "Safari Lodges",
            itinerary: "Nairobi → Masai Mara National Reserve",
            highlights: ["Great Migration", "Big Five Safari", "Masai Village Visit", "Hot Air Balloon Safari"]
        },
        {
            id: 64,
            category: 'Africa',
            country: "Tanzania",
            flag: "https://flagcdn.com/w40/tz.png",
            title: "Serengeti Quest",
            location: "Serengeti, Zanzibar",
            days: "7 Days",
            price: "₹1,65,000",
            rating: "4.9/5",
            reviews: "65 Reviews",
            image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop",
            description: "Combine thrilling wildlife safaris in the Serengeti with relaxing beach days in Zanzibar.",
            bestTime: "Jun-Oct",
            difficulty: "Moderate",
            groupSize: "2-10",
            accommodation: "Safari Camps & Beach Resorts",
            itinerary: "Arusha → Serengeti → Ngorongoro → Zanzibar",
            highlights: ["Serengeti Safari", "Ngorongoro Crater", "Zanzibar Beaches", "Stone Town"]
        },
        {
            id: 65,
            category: 'Africa',
            country: "Mauritius",
            flag: "https://flagcdn.com/w40/mu.png",
            title: "Island Paradise",
            location: "Port Louis",
            days: "6 Days",
            price: "₹1,35,000",
            rating: "4.8/5",
            reviews: "50 Reviews",
            image: "https://images.unsplash.com/photo-1589330273594-e18d67d6d996?q=80&w=1000&auto=format&fit=crop",
            description: "Discover the pristine beaches, lush landscapes, and vibrant culture of Mauritius.",
            bestTime: "May-Dec",
            difficulty: "Easy",
            groupSize: "2-6",
            accommodation: "Luxury Resorts",
            itinerary: "Port Louis → Black River Gorges → Ile aux Cerfs",
            highlights: ["Seven Coloured Earths", "Chamarel Waterfall", "Snorkeling & Diving", "Botanical Garden"]
        }
    ];

    // Expose filter logic globally
    window.filterDiscover = (category) => {
        const container = document.getElementById('discover-grid');
        const buttons = document.querySelectorAll('.discover-btn');

        // Update Buttons
        buttons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.remove('bg-gray-100', 'text-gray-600');
                btn.classList.add('bg-black', 'text-white');
            } else {
                btn.classList.add('bg-gray-100', 'text-gray-600');
                btn.classList.remove('bg-black', 'text-white');
            }
        });

        // Filter Data
        let filtered = allTrips;
        if (category === 'All') {
            filtered = allTrips;
        } else if (category === 'Budget') {
            filtered = allTrips.filter(t => {
                const priceValue = parseInt(t.price.replace(/[^\d]/g, ''), 10);
                return priceValue < 100000;
            });
        } else if (category === 'Luxury') {
            filtered = allTrips.filter(t => {
                const priceValue = parseInt(t.price.replace(/[^\d]/g, ''), 10);
                return priceValue >= 100000;
            });
        } else {
            filtered = allTrips.filter(t => t.category === category);
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

    // Initial Categories
    const categories = ['All', 'Budget', 'Luxury', 'Asia', 'Europe', 'Americas', 'Africa'];

    const categoryTabs = categories.map((cat, index) => `
        <button 
            onclick="filterDiscover('${cat}')"
            data-category="${cat}"
            class="discover-btn px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${index === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
            ${cat}
        </button>
    `).join('');

    // --- Modal Logic ---
    window.openTripDetailsPopup = (id) => {
        const trip = allTrips.find(t => t.id === id);
        if (!trip) return;

        const modal = document.getElementById('details-modal');
        const container = document.getElementById('details-content');

        // Defaults if missing (for legacy or filler data)
        const desc = trip.description || "Experience an unforgettable journey to " + trip.title;
        const bestTime = trip.bestTime || "Year Round";
        const difficulty = trip.difficulty || "Moderate";
        const groupSize = trip.groupSize || "2-12";
        const accommodation = trip.accommodation || "Hotels & Resorts";
        const itinerary = trip.itinerary || `${trip.country} City Tour → Cultural Sites → Departure`;
        const highlights = trip.highlights || ["City Tour", "Local Cuisine", "Cultural Sites", "Scenic Drives"];
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
                            ${highlights.map(h => `
                                <li class="flex items-start text-sm text-gray-600">
                                    <i class="fa-solid fa-check text-emerald-500 mt-1 mr-3"></i>
                                    ${h}
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Footer Actions -->

                    <!-- Footer Actions -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 pt-6 mt-auto">
                        <div>
                             <span class="block text-xs text-gray-400 mb-1">Total Price</span>
                             <span class="text-2xl md:text-3xl font-bold text-red-500 break-words">${trip.price}</span>
                        </div>
                        <button onclick="window.location.hash = '#booking?id=${trip.id}'; closeDetailsPopup();" class="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-500/30 transition transform hover:-translate-y-0.5 whitespace-nowrap">
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

    // Initial render trigger
    setTimeout(() => {
        const initialCategory = window.searchCategory || 'All';
        window.filterDiscover(initialCategory);
        window.searchCategory = null; // Clear after use
    }, 0);

    return `
    <section class="py-14 bg-gray-50" id="discover-section">
        <div class="container mx-auto px-2">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Discover the World</h2>
                <div class="flex flex-wrap justify-center gap-3">
                    ${categoryTabs}
                </div>
            </div>
            
            <div id="discover-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Content injected by filterDiscover -->
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
