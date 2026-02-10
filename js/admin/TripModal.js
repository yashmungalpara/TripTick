
import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

export default function TripModal(trip = null, onClose) {
    const isEdit = !!trip;

    // Helper to get value safely
    const val = (key) => trip ? trip[key] || '' : '';


    // Local state for highlights
    let highlights = [];
    if (trip && trip.highlights) {
        if (Array.isArray(trip.highlights)) {
            highlights = [...trip.highlights];
        } else if (typeof trip.highlights === 'string') {
            const cleanStr = trip.highlights.trim();
            if (cleanStr.startsWith('[') && cleanStr.endsWith(']')) {
                try {
                    const parsed = JSON.parse(cleanStr);
                    if (Array.isArray(parsed)) highlights = parsed;
                } catch (e) {
                    highlights = cleanStr.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(s => s);
                }
            } else {
                highlights = cleanStr.split(',').map(s => s.trim()).filter(s => s);
            }
        }
    }

    // Local state for itinerary
    let itinerary = [];
    if (trip && trip.itinerary) {
        if (Array.isArray(trip.itinerary)) {
            itinerary = [...trip.itinerary];
        } else if (typeof trip.itinerary === 'string') {
            const cleanStr = trip.itinerary.trim();
            if (cleanStr.startsWith('[') && cleanStr.endsWith(']')) {
                try {
                    const parsed = JSON.parse(cleanStr);
                    if (Array.isArray(parsed)) itinerary = parsed;
                } catch (e) {
                    itinerary = [cleanStr];
                }
            } else if (cleanStr.includes('→')) {
                itinerary = cleanStr.split('→').map(s => s.trim()).filter(s => s);
            } else {
                // Fallback: split by newlines if multiple lines, else single item
                itinerary = cleanStr.split('\n').map(s => s.trim()).filter(s => s);
            }
        }
    }

    const renderHighlights = () => {
        return highlights.map((h, index) => `
            <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm mr-2 mb-2 transition-all hover:bg-indigo-100">
                ${h}
                <button type="button" data-type="highlight" data-index="${index}" class="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none remove-btn transition-colors">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </span>
        `).join('') || '<p class="text-sm text-gray-400 italic py-1">No highlights added yet. Type above to add one.</p>';
    };

    const renderItinerary = () => {
        return itinerary.map((item, index) => `
            <div class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm mb-2 group hover:border-indigo-300 transition-colors">
                <div class="flex items-center">
                    <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold mr-3">${index + 1}</span>
                    <span class="text-gray-700 text-sm font-medium">${item}</span>
                </div>
                <button type="button" data-type="itinerary" data-index="${index}" class="text-gray-400 hover:text-red-500 focus:outline-none remove-btn p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('') || '<p class="text-sm text-gray-400 italic py-1">No itinerary stops added yet.</p>';
    };

    const html = `
        <div class="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50 backdrop-blur-sm transition-opacity duration-300">
            <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all scale-100">
                
                <!-- Header -->
                <div class="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-6 rounded-t-2xl shadow-md flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <div class="bg-white/20 p-2 rounded-lg">
                            <i class="fas ${isEdit ? 'fa-edit' : 'fa-plus'} text-white text-xl"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-white tracking-wide">${isEdit ? 'Edit Trip' : 'Add New Trip'}</h2>
                    </div>
                    <button id="closeModalBtn" class="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>

                <!-- Body -->
                <div class="p-8">
                    <form id="tripForm" class="space-y-8">
                        
                        <!-- Section: Basic Info -->
                        <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                <i class="fas fa-info-circle text-indigo-500 mr-2"></i> Basic Information
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-heading text-gray-400"></i>
                                        </div>
                                        <input type="text" name="title" value="${val('title')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 transition-shadow duration-200" placeholder="e.g. Magical Maldives" required>
                                    </div>
                                </div>

                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-globe-americas text-gray-400"></i>
                                        </div>
                                        <input type="text" name="country" value="${val('country')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 transition-shadow duration-200" placeholder="e.g. Maldives" required>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Flag Emoji</label>
                                    <input type="text" name="flag" value="${val('flag')}" class="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5" placeholder="e.g. 🇲🇻">
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Location / City</label>
                                     <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-map-marker-alt text-gray-400"></i>
                                        </div>
                                        <input type="text" name="location" value="${val('location')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5" placeholder="e.g. Male Atoll">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <div class="relative">
                                         <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-tags text-gray-400"></i>
                                        </div>
                                        <select name="category" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5">
                                            <option value="Adventure" ${val('category') === 'Adventure' ? 'selected' : ''}>Adventure</option>
                                            <option value="Relaxation" ${val('category') === 'Relaxation' ? 'selected' : ''}>Relaxation</option>
                                            <option value="Cultural" ${val('category') === 'Cultural' ? 'selected' : ''}>Cultural</option>
                                            <option value="Wildlife" ${val('category') === 'Wildlife' ? 'selected' : ''}>Wildlife</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-dollar-sign text-gray-400"></i>
                                        </div>
                                        <input type="text" name="price" value="${val('price')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5" placeholder="$1,200">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-clock text-gray-400"></i>
                                        </div>
                                        <input type="text" name="days" value="${val('days')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5" placeholder="e.g. 5 Days">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i class="fas fa-star text-yellow-400"></i>
                                        </div>
                                        <input type="text" name="rating" value="${val('rating')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5" placeholder="e.g. 4.8">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Section: Media & Details -->
                        <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                <i class="fas fa-image text-pink-500 mr-2"></i> Media & Details
                            </h3>
                            <div class="grid grid-cols-1 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <div class="flex space-x-2">
                                        <div class="relative flex-grow">
                                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <i class="fas fa-link text-gray-400"></i>
                                            </div>
                                            <input type="text" name="image" value="${val('image')}" class="pl-10 block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5" placeholder="https://...">
                                        </div>
                                    </div>
                                    <p class="mt-1 text-xs text-gray-500">Provide a direct link to an image (JPG/PNG).</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea name="description" rows="3" class="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3" placeholder="Brief overview of the trip...">${val('description')}</textarea>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
                                    <div class="flex space-x-2 mb-2">
                                        <input type="text" id="newHighlightInput" class="flex-grow block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 pl-3" placeholder="Add a highlight (e.g. Hiking)">
                                        <button type="button" id="addHighlightBtn" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm font-medium">Add</button>
                                    </div>
                                    <div id="highlights-container" class="flex flex-wrap bg-white p-3 rounded-lg border border-gray-200 min-h-[50px]">
                                        ${renderHighlights()}
                                    </div>
                                </div>

                                <div>
                                   <label class="block text-sm font-medium text-gray-700 mb-1">Itinerary (Route/Stops)</label>
                                    <div class="flex space-x-2 mb-2">
                                        <input type="text" id="newItineraryInput" class="flex-grow block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 pl-3" placeholder="Add a stop (e.g. Day 1: Arrival in Male)">
                                        <button type="button" id="addItineraryBtn" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm font-medium">Add</button>
                                    </div>
                                    <div id="itinerary-container" class="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[50px] max-h-[300px] overflow-y-auto">
                                        ${renderItinerary()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer Actions -->
                        <div class="flex justify-end pt-6 border-t border-gray-200 space-x-4">
                            <button type="button" id="cancelBtn" class="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 font-medium shadow-sm">
                                Cancel
                            </button>
                            <button type="submit" class="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center">
                                <i class="fas fa-save mr-2"></i> ${isEdit ? 'Update Trip' : 'Create Trip'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Inject modal into DOM
    const container = document.getElementById('trip-modal-container') || document.body;
    const div = document.createElement('div');
    div.id = 'active-modal';
    div.innerHTML = html;
    container.appendChild(div);

    // HIGHLIGHTS & ITINERARY LOGIC
    const highlightsContainer = div.querySelector('#highlights-container');
    const newHighlightInput = div.querySelector('#newHighlightInput');
    const addHighlightBtn = div.querySelector('#addHighlightBtn');

    const itineraryContainer = div.querySelector('#itinerary-container');
    const newItineraryInput = div.querySelector('#newItineraryInput');
    const addItineraryBtn = div.querySelector('#addItineraryBtn');

    const updateUI = () => {
        highlightsContainer.innerHTML = renderHighlights();
        itineraryContainer.innerHTML = renderItinerary();
        attachRemoveListeners();
    };

    const attachRemoveListeners = () => {
        div.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                const type = e.currentTarget.dataset.type;

                if (type === 'highlight') {
                    highlights.splice(index, 1);
                } else if (type === 'itinerary') {
                    itinerary.splice(index, 1);
                }
                updateUI();
            });
        });
    };

    // Add Highlight
    const addHighlight = () => {
        const text = newHighlightInput.value.trim();
        if (text) {
            highlights.push(text);
            newHighlightInput.value = '';
            updateUI();
        }
    }
    addHighlightBtn.addEventListener('click', addHighlight);
    newHighlightInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addHighlight(); }
    });

    // Add Itinerary
    const addItinerary = () => {
        const text = newItineraryInput.value.trim();
        if (text) {
            itinerary.push(text);
            newItineraryInput.value = '';
            updateUI();
        }
    }
    addItineraryBtn.addEventListener('click', addItinerary);
    newItineraryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addItinerary(); }
    });

    attachRemoveListeners(); // Initial attach

    // Event Listeners (Close, Submit)
    const closeModal = () => {
        div.remove();
        if (onClose) onClose();
    };

    div.querySelector('#closeModalBtn').addEventListener('click', closeModal);
    div.querySelector('#cancelBtn').addEventListener('click', closeModal);

    div.querySelector('#tripForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updates = Object.fromEntries(formData.entries());

        // Use our local state
        updates.highlights = highlights;
        // Save itinerary as JSON array for robustness, though we might want to join it for simple displays if needed.
        // But the user requested "INTO the itinerary", implying structured data.
        // I will save it as JSON string.
        updates.itinerary = JSON.stringify(itinerary);

        try {
            let error;

            if (isEdit) {
                const { error: updateError } = await supabase
                    .from('trips')
                    .update(updates)
                    .eq('id', trip.id);
                error = updateError;
            } else {
                updates.id = Date.now(); // Simple unique ID for now
                const { error: insertError } = await supabase
                    .from('trips')
                    .insert([updates]);
                error = insertError;
            }

            if (error) throw error;

            showToast(isEdit ? 'Trip updated successfully!' : 'Trip created successfully!', 'success');
            closeModal();
            setTimeout(() => window.location.reload(), 1000);
        } catch (err) {
            console.error(err);
            showToast('Error saving trip: ' + err.message, 'error');
        }
    });
}

