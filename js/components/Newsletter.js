
export default function Newsletter() {
    return `
    <section class="py-24 bg-white border-t border-gray-100">
        <div class="container mx-auto px-4 text-center max-w-2xl">
            <i class="fa-regular fa-paper-plane text-4xl text-gray-400 mb-6"></i>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Subscribe for Exclusive Deals</h2>
            <p class="text-gray-500 mb-8">Get the latest travel updates, hidden gems, and special offers delivered straight to your inbox.</p>
            
            <form class="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Your email address" class="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition" required>
                <button type="submit" class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl">Subscribe</button>
            </form>
            <p class="text-xs text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
    </section>
    `;
}
