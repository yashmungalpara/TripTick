
export default function ExtraSections() {
    return `
    <!-- FAQ Section -->
    <section class="py-16 md:py-24 bg-white">
        <div class="container mx-auto px-4 max-w-3xl">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p class="text-gray-500 text-sm">Got questions before your next trip? We've got you covered.</p>
            </div>
            
            <div class="space-y-4">
                <div class="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 hover:bg-white transition hover:shadow-md cursor-pointer group" onclick="window.location.hash = '#contact?message=' + encodeURIComponent('I have a question about: Can I change or cancel my trip after booking?')">
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold text-gray-900">Can I change or cancel my trip after booking?</h3>
                        <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-900 transition"></i>
                    </div>
                </div>
                <div class="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 hover:bg-white transition hover:shadow-md cursor-pointer group" onclick="window.location.hash = '#contact?message=' + encodeURIComponent('I have a question about: Does TripTick offer group travel options?')">
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold text-gray-900">Does TripTick offer group travel options?</h3>
                        <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-900 transition"></i>
                    </div>
                </div>
                <div class="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 hover:bg-white transition hover:shadow-md cursor-pointer group" onclick="window.location.hash = '#contact?message=' + encodeURIComponent('I have a question about: How do I get travel support during my trip?')">
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold text-gray-900">How do I get travel support during my trip?</h3>
                        <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-900 transition"></i>
                    </div>
                </div>
                 <div class="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 hover:bg-white transition hover:shadow-md cursor-pointer group" onclick="window.location.hash = '#contact?message=' + encodeURIComponent('I have a question about: Can I save destinations to plan later?')">
                    <div class="flex justify-between items-center">
                        <h3 class="font-semibold text-gray-900">Can I save destinations to plan later?</h3>
                        <i class="fa-solid fa-chevron-right text-gray-400 group-hover:text-gray-900 transition"></i>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <button class="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition" onclick="window.location.hash = '#contact'">Explore more questions</button>
            </div>
        </div>
    </section>
    `;
}
