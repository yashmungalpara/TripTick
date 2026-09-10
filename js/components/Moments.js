
export default function Moments() {
    const moments = [
        {
            name: "Aisha Davina",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop",
            location: "Bali, Indonesia",
            text: "TripTick made my solo trip feel safe and easy. Every sunset felt like home.",
            rotation: "-2deg"
        },
        {
            name: "Alessio Marika",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
            location: "Kyoto, Japan",
            text: "The guided tour was incredible. I learned so much about the history and culture.",
            rotation: "2deg"
        },
        {
            name: "Lia Carolina",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2574&auto=format&fit=crop",
            location: "Santorini, Greece",
            text: "A dream trip! Thank you for making it effortless.",
            rotation: "-1deg"
        },
        {
            name: "Kano Kenji",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2574&auto=format&fit=crop",
            location: "Raja Ampat, Indonesia",
            text: "The diving was planned perfectly. I just had to show up and enjoy the city.",
            rotation: "3deg"
        }
    ];

    const cardsHtml = moments.map(moment => `
        <div class="relative group w-64 md:w-72 flex-shrink-0 bg-white p-3 pb-8 shadow-lg hover:shadow-2xl hover:z-10 transition-all duration-300 transform hover:scale-105 hover:rotate-0 border border-gray-100" style="transform: rotate(${moment.rotation});">
             <div class="h-64 overflow-hidden mb-4 bg-gray-100">
                <img src="${moment.image}" alt="${moment.name}" class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition duration-500">
             </div>
             <div class="text-left px-2">
                 <h4 class="font-bold text-gray-900 text-lg">${moment.name}</h4>
                 <p class="text-xs text-gray-500 mb-2 uppercase tracking-wide">${moment.location}</p>
                 <p class="text-sm text-gray-600 italic leading-relaxed">"${moment.text}"</p>
             </div>
        </div>
    `).join('');

    return `
    <section class="py-24 bg-gray-50 overflow-hidden">
        <div class="container mx-auto px-4">
             <div class="text-center mb-16">
                 <p class="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Real Stories</p>
                <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 max-w-2xl mx-auto leading-tight">Moments that made every journey unforgettable</h2>
             </div>
             
             <!-- Scrolling container for mobile, centered for desktop if few items -->
             <div class="flex flex-wrap justify-center gap-8 md:gap-12 pb-12">
                ${cardsHtml}
             </div>
             
             <div class="text-center mt-8">
                <button class="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black transition shadow-lg">See more happiness</button>
             </div>
        </div>
    </section>
    `;
}
