import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

export default function Booking() {
    // 1. Get ID from URL hash (e.g. #booking?id=123)
    const hashParams = window.location.hash.split('?')[1];
    const urlParams = new URLSearchParams(hashParams);
    const tripId = parseInt(urlParams.get('id'));

    // Container for async content
    const containerId = 'booking-container';

    // Async render function
    setTimeout(async () => {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Fetch Trip Data
        const { data: trip, error } = await supabase
            .from('trips')
            .select('*')
            .eq('id', tripId)
            .single();

        if (error || !trip) {
            container.innerHTML = `
                <div class="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
                        <p class="text-gray-600 mb-8">We couldn't find the trip you're looking for.</p>
                        <a href="#" class="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">Return Home</a>
                    </div>
                </div>
            `;
            return;
        }

        // Fetch Current User
        const { data: { user } } = await supabase.auth.getUser();

        // Render Booking Page
        container.innerHTML = `
            <div class="bg-gray-50 min-h-screen pb-20 pt-10">
                <div class="container mx-auto px-4">
                    
                    <!-- Header -->
                    <div class="max-w-4xl mx-auto mb-8">
                        <a href="#" class="inline-flex items-center text-gray-500 hover:text-black mb-4 transition">
                            <i class="fa-solid fa-arrow-left mr-2"></i> Back to Home
                        </a>
                        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 border-l-4 border-red-500 pl-4">
                            Confirm Your Booking
                        </h1>
                    </div>

                    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        <!-- Left Column: Trip Summary Card -->
                        <div class="lg:col-span-1 h-fit">
                            <div class="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
                                <div class="relative h-48">
                                    <img src="${trip.image}" alt="${trip.title}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/20"></div>
                                    <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow text-sm font-bold text-gray-800">
                                        ${trip.days}
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h2 class="text-2xl font-bold text-gray-900 mb-1 leading-tight">${trip.title}</h2>
                                    <p class="text-gray-500 text-sm mb-4 flex items-center">
                                        <i class="fa-solid fa-location-dot mr-2 text-red-500"></i> ${trip.location}
                                    </p>
                                    
                                    <div class="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                                        <span class="text-gray-500 text-sm">Base Price</span>
                                        <span class="text-xl font-bold text-gray-900">${trip.price}</span>
                                    </div>

                                    <div class="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm flex items-start">
                                        <i class="fa-solid fa-star mt-1 mr-2 text-yellow-500"></i>
                                        <span>rated ${trip.rating} by ${trip.reviews}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column: Booking Form -->
                        <div class="lg:col-span-2">
                            <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                    Guest Details
                                </h3>
                                
                                <form id="booking-form">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                            <input type="text" name="firstName" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="Enter First Name" required value="${user?.user_metadata?.firstName || ''}">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                            <input type="text" name="lastName" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="Enter Last Name" required value="${user?.user_metadata?.lastName || ''}">
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                            <input type="email" name="email" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="Enter Email Address" required value="${user?.email || ''}" readonly class="cursor-not-allowed opacity-70">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" name="phone" id="phoneInput" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="Enter Phone Number" required>
                                            <p id="phone-error" class="text-red-500 text-xs mt-1 hidden">Invalid phone number format</p>
                                        </div>
                                    </div>

                                    <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <span class="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                        Trip Options
                                    </h3>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
                                            <input type="date" id="travelDate" name="travelDate" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" required>
                                            <p class="mt-1 text-xs text-gray-500">Suggested: ${trip.best_time || trip.bestTime}</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Guests</label>
                                            <select id="guests" name="guests" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition">
                                                <option value="1">1 Person</option>
                                                <option value="2" selected>2 People</option>
                                                <option value="3">3 People</option>
                                                <option value="4">4 People</option>
                                                <option value="custom">5+ People</option>
                                            </select>
                                            <div id="custom-guests-container" class="hidden mt-3">
                                                <label class="block text-sm font-semibold text-gray-700 mb-2">Enter Number of Guests</label>
                                                <input type="number" id="customGuests" min="5" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-3 outline-none transition" placeholder="e.g. 10">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                                        <span class="text-gray-700 font-bold">Total Price:</span>
                                        <span id="total-price-display" class="text-2xl font-black text-red-600">Calculating...</span>
                                    </div>

                                    <div class="border-t border-gray-200 pt-6">
                                        <div class="mb-4">
                                            <label class="flex items-center">
                                                <input type="checkbox" id="terms" class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" required>
                                                <span class="ml-2 text-sm text-gray-600">I agree to the <a href="#" class="text-red-500 hover:underline">Terms & Conditions</a></span>
                                            </label>
                                        </div>
                                        <button type="submit" id="submit-btn" class="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-0.5 flex items-center justify-center">
                                            Confirm Booking <i class="fa-solid fa-check ml-2"></i>
                                        </button>
                                        <p class="mt-4 text-sm text-gray-400 text-center md:text-left">
                                            <i class="fa-solid fa-lock mr-1"></i> Secure booking powered by TripTick
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Set Min Date to Today
        const dateInput = document.getElementById('travelDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }

        // Phone Validation Logic
        const phoneInput = document.getElementById('phoneInput');
        const phoneError = document.getElementById('phone-error');

        if (phoneInput && phoneError) {
            phoneInput.addEventListener('input', () => {
                // Allow +, -, space, (, ), and digits. Must have at least 10 digits.
                const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
                const digitsOnly = phoneInput.value.replace(/\D/g, '');

                if ((!phoneRegex.test(phoneInput.value) || digitsOnly.length < 10) && phoneInput.value !== '') {
                    phoneError.classList.remove('hidden');
                    phoneInput.classList.add('border-red-500', 'focus:ring-red-500');
                    phoneInput.classList.remove('border-gray-300', 'focus:ring-blue-500');
                } else {
                    phoneError.classList.add('hidden');
                    phoneInput.classList.remove('border-red-500', 'focus:ring-red-500');
                    phoneInput.classList.add('border-gray-300');
                }
            });
        }

        // Price Calculation Logic
        const guestsSelect = document.getElementById('guests');
        const totalPriceEl = document.getElementById('total-price-display');
        const basePrice = parseFloat(trip.price.replace(/[^0-9.-]+/g, "")); // Remove currency symbols

        // Initialize custom input outside
        const customGuestsInput = document.getElementById('customGuests');
        const customGuestsContainer = document.getElementById('custom-guests-container');

        function updateTotalPrice() {
            let guests = 1;
            if (guestsSelect.value === 'custom') {
                if (customGuestsContainer) customGuestsContainer.classList.remove('hidden');
                if (customGuestsInput) guests = parseInt(customGuestsInput.value) || 0;
            } else {
                if (customGuestsContainer) customGuestsContainer.classList.add('hidden');
                guests = parseInt(guestsSelect.value) || 1;
            }

            const total = basePrice * guests;

            const currencySymbol = trip.price.includes('₹') ? '₹' : '$';
            if (totalPriceEl) {
                totalPriceEl.textContent = `${currencySymbol}${total.toLocaleString()}`;
            }
            return total;
        }

        // Initialize Price
        if (guestsSelect && totalPriceEl) {
            updateTotalPrice();
            guestsSelect.addEventListener('change', updateTotalPrice);
            if (customGuestsInput) customGuestsInput.addEventListener('input', updateTotalPrice);
        }

        // Toggle Payment Details Visibility
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const cardDetails = document.getElementById('card-details');
        const upiDetails = document.getElementById('upi-details');

        function togglePaymentDetails() {
            const selected = document.querySelector('input[name="paymentMethod"]:checked').value;
            if (cardDetails) cardDetails.classList.add('hidden');
            if (upiDetails) upiDetails.classList.add('hidden');

            if (selected === 'card' && cardDetails) cardDetails.classList.remove('hidden');
            if (selected === 'upi' && upiDetails) upiDetails.classList.remove('hidden');
        }

        paymentRadios.forEach(radio => radio.addEventListener('change', togglePaymentDetails));


        // Handle Form Submission
        document.getElementById('booking-form').addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const travelDate = formData.get('travelDate');
            const paymentMethod = formData.get('paymentMethod');

            // Client-side Validation for Past Dates
            const selectedDate = new Date(travelDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to midnight for fair comparison

            if (selectedDate < today) {
                showToast('Please select a valid future date.', 'error');
                return;
            }

            const btn = document.getElementById('submit-btn');
            const originalText = btn.innerHTML;

            // Payment Simulation
            if (paymentMethod === 'card' || paymentMethod === 'upi') {
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Payment...';
            } else {
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Confirming...';
            }
            btn.disabled = true;

            // Simulate Network Delay for Payment
            if (paymentMethod !== 'hotel') {
                await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
                showToast('Payment Successful!', 'success');
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second showing success
            }

            let guests = parseInt(guestsSelect.value);
            if (guestsSelect.value === 'custom') {
                guests = parseInt(customGuestsInput.value) || 0;
            }

            if (guests <= 0) {
                showToast('Please enter a valid number of guests.', 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
                return;
            }
            const calculatedTotal = basePrice * guests;
            const currencySymbol = trip.price.includes('₹') ? '₹' : '$';
            const finalPriceString = `${currencySymbol}${calculatedTotal.toLocaleString()}`;

            const bookingData = {
                trip_id: tripId,
                user_id: user.id,
                first_name: formData.get('firstName'),
                last_name: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                travel_date: travelDate,
                guests: guests,
                total_price: finalPriceString,
                status: 'confirmed'
            };

            const { error: insertError } = await supabase
                .from('bookings')
                .insert([bookingData]);

            if (insertError) {
                console.error('Booking Error:', insertError);
                showToast('Failed to book trip. Please try again.', 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
            } else {
                showToast('Booking Confirmed! Check your profile.', 'success');
                setTimeout(() => {
                    window.location.hash = '#profile';
                }, 1500);
            }
        });

    }, 0);

    return `
        <div id="${containerId}">
             <div class="min-h-screen flex items-center justify-center">
                <div class="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
            </div>
        </div>
    `;
}
