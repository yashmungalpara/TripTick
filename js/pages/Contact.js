export default function Contact() {
    return `
        <div class="bg-gray-50 min-h-screen">
            
            <!-- Hero Section -->
            <div class="relative bg-gray-900 h-96 flex items-center justify-center overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1920&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-40">
                <div class="relative text-center px-4">
                    <h1 class="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Get in <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Touch</span>
                    </h1>
                    <p class="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
                        We'd love to hear from you. Whether you have a question about trips, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                </div>
            </div>

            <!-- Content Container -->
            <div class="container mx-auto px-4 py-16 -mt-20 relative z-10">
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <!-- Left Column: Contact Info Cards -->
                    <div class="lg:col-span-1 space-y-6">
                        
                        <!-- Address Card -->
                        <div class="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition duration-300">
                            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl mb-6">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Our Headquarters</h3>
                            <p class="text-gray-600 leading-relaxed">
                                123 Adventure Lane,<br>
                                Tourism District, New Delhi,<br>
                                India - 110001
                            </p>
                        </div>

                        <!-- Phone & Email Card -->
                        <div class="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition duration-300">
                            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6">
                                <i class="fa-solid fa-headset"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Contact Info</h3>
                            <div class="space-y-3">
                                <p class="flex items-center text-gray-600">
                                    <i class="fa-solid fa-phone mr-3 text-gray-400"></i>
                                    <span>+91 98765 43210</span>
                                </p>
                                <p class="flex items-center text-gray-600">
                                    <i class="fa-solid fa-envelope mr-3 text-gray-400"></i>
                                    <span>hello@triptick.com</span>
                                </p>
                            </div>
                        </div>

                        <!-- Social Media -->
                         <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-center text-white transfrom hover:scale-105 transition duration-300">
                            <h3 class="text-xl font-bold mb-4">Follow Our Journey</h3>
                             <div class="flex justify-center space-x-6 text-2xl">
                                <a href="#" class="hover:text-red-300 transition"><i class="fa-brands fa-instagram"></i></a>
                                <a href="#" class="hover:text-blue-300 transition"><i class="fa-brands fa-facebook-f"></i></a>
                                <a href="#" class="hover:text-sky-300 transition"><i class="fa-brands fa-twitter"></i></a>
                                <a href="#" class="hover:text-red-300 transition"><i class="fa-brands fa-youtube"></i></a>
                            </div>
                        </div>

                    </div>

                    <!-- Right Column: Contact Form -->
                    <div class="lg:col-span-2">
                        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 h-full">
                            <h2 class="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                            
                            <form onsubmit="event.preventDefault(); alert('Message Sent Successfully!');" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                        <input type="text" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 outline-none transition" placeholder="John Doe" required>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">Your Email</label>
                                        <input type="email" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 outline-none transition" placeholder="john@example.com" required>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <select class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 outline-none transition">
                                        <option>General Inquiry</option>
                                        <option>Trip Booking Issue</option>
                                        <option>Feedback</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea rows="6" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 outline-none transition resize-none" placeholder="Tell us how we can help..." required></textarea>
                                </div>

                                <button type="submit" class="w-full md:w-auto bg-black hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg transform transition hover:-translate-y-1 text-lg flex items-center justify-center">
                                    Send Message
                                    <i class="fa-solid fa-paper-plane ml-3 text-sm"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

                <!-- Map Section (Visual Placeholder) -->
                <div class="mt-16 rounded-2xl overflow-hidden shadow-xl border-4 border-white h-96 relative group">
                    <!-- Using a static map image for demo purposes -->
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1920&auto=format&fit=crop" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Map Location">
                    <div class="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition">
                         <a href="https://maps.google.com" target="_blank" class="bg-white/90 backdrop-blur text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-white transition transform hover:scale-105 flex items-center">
                            <i class="fa-solid fa-map-location-dot mr-2 text-red-500"></i>
                            View on Google Maps
                         </a>
                    </div>
                </div>

            </div>
        </div>
    `;
}
