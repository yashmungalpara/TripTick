
export default function PopularTrips() {
    // Mock Data
    const trips = [
        {
            title: "Bali Surf Escape",
            location: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2540&auto=format&fit=crop",
            date: "October - November 2026",
            duration: "5 Days 4 Nights",
            price: "$150-$250"
        },
        {
            title: "Cappadocia Balloon Ride",
            location: "Cappadocia, Turkey",
            image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2670&auto=format&fit=crop",
            date: "December 2026",
            duration: "4 Days 3 Nights",
            price: "$180-$280"
        },
        {
            title: "Tokyo Street Experience",
            location: "Tokyo, Japan",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop",
            date: "October 2026",
            duration: "5 Days 4 Nights",
            price: "$200-$300"
        },
        {
            title: "Raja Ampat Island Hop",
            location: "West Papua, Indonesia",
            image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?q=80&w=2670&auto=format&fit=crop",
            date: "November - December 2026",
            duration: "6 Days 5 Nights",
            price: "$250-$400"
        }
    ];

    const cardsHtml = trips.map(trip => `
        <div class="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition cursor-pointer group">
            <div class="relative h-64 w-full rounded-xl overflow-hidden mb-4">
                <img src="${trip.image}" alt="${trip.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-3 left-3 bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide">Recommended</span>
            </div>
            <p class="text-xs text-gray-500 mb-1">${trip.location}</p>
            <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">${trip.title}</h3>
            <p class="text-xs text-gray-400 mb-4 line-clamp-2">Experience the best of ${trip.location} with our exclusive guided tours and premium accommodations.</p>
            
            <div class="flex items-center text-xs text-gray-500 mb-1">
                <i class="fa-regular fa-calendar mr-2"></i> ${trip.date}
            </div>
             <div class="flex items-center text-xs text-gray-500 mb-4">
                <i class="fa-regular fa-clock mr-2"></i> ${trip.duration}
            </div>

            <div class="flex items-center justify-between mt-auto">
                <span class="text-base font-bold text-gray-900">${trip.price} <span class="text-xs font-normal text-gray-500">/Person</span></span>
                <button class="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-full hover:bg-black transition">Book Now</button>
            </div>
        </div>
    `).join('');

    return `
    <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Our Popular Trips</h2>
                <p class="text-gray-500 max-w-xl mx-auto">Discover where everyone's heading this season. From tropical escapes to urban adventures, these trips are stealing the spotlight.</p>
            </div>
            
            <div class="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 md:pb-0 scrollbar-hide snap-x">
                ${cardsHtml}
            </div>
        </div>
    </section>
    `;
}
