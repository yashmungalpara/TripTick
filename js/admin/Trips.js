
import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

const Trips = {
    render: async () => {
        // Fetch trips
        const { data: trips, error } = await supabase
            .from('trips')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching trips:', error);
            return `<div class="text-red-500">Error loading trips: ${error.message}</div>`;
        }

        const rows = trips.map(trip => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#${trip.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                            <img class="h-10 w-10 rounded-full object-cover" src="${trip.image || 'https://via.placeholder.com/40'}" alt="">
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${trip.title}</div>
                            <div class="text-sm text-gray-500">${trip.country} ${trip.flag || ''}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${trip.category}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${trip.days}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${trip.price}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="window.editTrip(${trip.id})" class="text-indigo-600 hover:text-indigo-900 mr-3"><i class="fas fa-edit"></i> Edit</button>
                    <button onclick="window.deleteTrip(${trip.id})" class="text-red-600 hover:text-red-900"><i class="fas fa-trash"></i> Delete</button>
                </td>
            </tr>
        `).join('');

        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-semibold text-gray-800">Trips Management</h2>
                <button onclick="window.addTrip()" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow">
                    <i class="fas fa-plus mr-2"></i> Add New Trip
                </button>
            </div>

            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${rows}
                    </tbody>
                </table>
                 ${trips.length === 0 ? '<p class="text-center py-4 text-gray-500">No trips found.</p>' : ''}
            </div>

            <!-- Modal logic will go here or in a separate component -->
            <div id="trip-modal-container"></div>
        `;
    },
    afterRender: () => {
        // Attach global handlers for buttons
        window.editTrip = async (id) => {
            console.log('Editing trip:', id);
            const { data: trip, error } = await supabase
                .from('trips')
                .select('*')
                .eq('id', id)
                .single();

            if (trip) {
                import('./TripModal.js').then(module => {
                    module.default(trip);
                });
            } else {
                showToast('Trip not found!', 'error');
            }
        };

        window.deleteTrip = async (id) => {
            // Lazy load the modal
            const { showConfirm } = await import('../components/ConfirmModal.js');

            const confirmed = await showConfirm(
                'Are you sure you want to delete this trip? This action cannot be undone.',
                'Delete Trip'
            );

            if (confirmed) {
                const { error } = await supabase.from('trips').delete().eq('id', id);
                if (error) {
                    showToast('Error deleting trip: ' + error.message, 'error');
                } else {
                    showToast('Trip deleted successfully!', 'success');
                    // Slight delay to allow toast to show before reload
                    setTimeout(() => window.location.reload(), 1500);
                }
            }
        };

        window.addTrip = () => {
            import('./TripModal.js').then(module => {
                module.default(null);
            });
        };
    }
};

export default Trips;
