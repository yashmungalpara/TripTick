import supabase from '../supabaseClient.js';
import { showToast } from './Toast.js';

const Moments = {
    render: () => {
        return `
        <section class="py-24 bg-gray-50 overflow-hidden" id="moments-section">
            <div class="container mx-auto px-4">
                 <div class="text-center mb-16">
                     <p class="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">Real Stories</p>
                    <h2 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 max-w-2xl mx-auto leading-tight">Moments that made every journey unforgettable</h2>
                 </div>
                 
                 <!-- Scrolling container for mobile, centered for desktop if few items -->
                 <div id="moments-container" class="flex flex-wrap justify-center gap-8 md:gap-12 pb-12 transition-all duration-500 min-h-[300px]">
                    <!-- Content will be loaded dynamically -->
                    <div class="flex items-center justify-center w-full h-64">
                         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                 </div>
                 
                 <div class="text-center mt-8 space-x-4">
                    <button class="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black transition shadow-lg">See more happiness</button>
                    <button id="add-story-btn" class="bg-white text-gray-900 border border-gray-200 px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition shadow-lg">Add Your Story</button>
                 </div>
            </div>

            <!-- Add Story Modal -->
            <div id="story-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50 flex items-center justify-center">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-900">Share Your Moment</h3>
                        <button id="close-modal-btn" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="story-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" id="story-name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" placeholder="Your Name">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input type="text" id="story-location" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" placeholder="e.g. Bali, Indonesia">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
                            <textarea id="story-text" required rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" placeholder="Share your experience..."></textarea>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                            <input type="url" id="story-image" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" placeholder="https://example.com/photo.jpg">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Position (Optional)</label>
                            <input type="number" id="story-position" min="1" max="100" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" placeholder="Where to show?">
                        </div>

                        <button type="submit" class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition transform hover:scale-[1.02] mt-2">Post Story</button>
                    </form>
                </div>
            </div>
        </section>
        `;
    },

    afterRender: async () => {
        const modal = document.getElementById('story-modal');
        const openBtn = document.getElementById('add-story-btn');
        const closeBtn = document.getElementById('close-modal-btn');
        const form = document.getElementById('story-form');
        const container = document.getElementById('moments-container');

        if (!modal || !openBtn || !closeBtn || !form || !container) return; // Guard clause

        // --- functions for rendering ---
        const renderCard = (moment) => `
            <div class="relative group w-64 md:w-72 flex-shrink-0 bg-white p-3 pb-8 shadow-lg hover:shadow-2xl hover:z-10 transition-all duration-300 transform hover:scale-105 hover:rotate-0 border border-gray-100 animate-fade-in-up" style="transform: rotate(${moment.rotation});">
                 <div class="h-64 overflow-hidden mb-4 bg-gray-100">
                    <img src="${moment.image}" alt="${moment.name}" class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition duration-500" onerror="this.src='https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop'">
                 </div>
                 <div class="text-left px-2">
                     <h4 class="font-bold text-gray-900 text-lg">${moment.name}</h4>
                     <p class="text-xs text-gray-500 mb-2 uppercase tracking-wide">${moment.location}</p>
                     <p class="text-sm text-gray-600 italic leading-relaxed">"${moment.text}"</p>
                 </div>
            </div>
        `;

        const loadMoments = async () => {

            // Default Data (Fallback)
            const defaultMoments = [
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

            try {
                const { data, error } = await supabase
                    .from('feedback')
                    .select('*')
                    .order('created_at', { ascending: false });

                let momentsToRender = [];

                if (error || !data || data.length === 0) {
                    // console.log('Using default moments due to DB empty or error:', error);
                    momentsToRender = defaultMoments;
                } else {
                    momentsToRender = data;
                }

                container.innerHTML = momentsToRender.map(m => renderCard(m)).join('');

            } catch (err) {
                console.error('Unexpected error loading moments:', err);
                container.innerHTML = defaultMoments.map(m => renderCard(m)).join('');
            }
        };

        // Load initially
        await loadMoments();


        // --- Event Listeners ---

        // Open Modal
        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        // Close Modal
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });

        // Handle Form Submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Posting...';
            submitBtn.disabled = true;

            // Get values
            const name = document.getElementById('story-name').value;
            const location = document.getElementById('story-location').value;
            const text = document.getElementById('story-text').value;
            const image = document.getElementById('story-image').value;
            const positionInput = document.getElementById('story-position').value;

            const rotation = (Math.random() * 6 - 3).toFixed(1) + 'deg';

            const newMoment = {
                name,
                location,
                text,
                image,
                rotation,
                position: positionInput ? parseInt(positionInput) : null
            };

            try {
                const { data, error } = await supabase
                    .from('feedback')
                    .insert([newMoment])
                    .select();

                if (error) throw error;

                showToast('Story posted successfully!', 'success');

                // Reload list to show new item
                await loadMoments();

                // Reset and Close
                form.reset();
                modal.classList.add('hidden');

            } catch (err) {
                console.error('Error posting story:', err);
                showToast(`Failed to post story: ${err.message || 'Unknown error'}`, 'error');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}

export default Moments;
