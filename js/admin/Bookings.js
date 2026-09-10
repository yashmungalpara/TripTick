import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

const Bookings = {
    render: async () => {
        // Fetch bookings with trip details
        const { data: bookings, error } = await supabase
            .from('bookings')
            .select('*, trips(title, image)')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching bookings:', error);
            return `<div class="text-red-500 p-6">Error loading bookings: ${error.message}</div>`;
        }

        const rows = bookings.map(booking => {
            const trip = booking.trips || { title: 'Unknown Trip', image: '' };
            const statusColors = {
                confirmed: 'bg-green-100 text-green-800',
                pending: 'bg-yellow-100 text-yellow-800',
                cancelled: 'bg-red-100 text-red-800'
            };
            const statusClass = statusColors[booking.status] || 'bg-gray-100 text-gray-800';

            return `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#${booking.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                            <img class="h-10 w-10 rounded-lg object-cover" src="${trip.image || 'https://via.placeholder.com/40'}" alt="">
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${trip.title}</div>
                            <div class="text-xs text-gray-500">${new Date(booking.travel_date).toLocaleDateString()}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${booking.first_name} ${booking.last_name}</div>
                    <div class="text-xs text-gray-500">${booking.email}</div>
                    <div class="text-xs text-gray-500">${booking.phone}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                        <i class="fas fa-users mr-2 text-gray-400"></i> ${booking.guests}
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${booking.total_price || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                        ${booking.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="window.deleteBooking(${booking.id})" class="text-red-400 hover:text-red-600 transition-colors" title="Delete Booking">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `}).join('');

        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-semibold text-gray-800">Bookings</h2>
                <div class="flex space-x-2">
                     <span class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-600 shadow-sm">
                        Total: <strong>${bookings.length}</strong>
                     </span>
                </div>
            </div>

            <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip & Date</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${rows}
                    </tbody>
                </table>
                 ${bookings.length === 0 ? `
                    <div class="text-center py-12 flex flex-col items-center justify-center">
                        <div class="bg-gray-100 p-4 rounded-full mb-3">
                            <i class="fas fa-calendar-times text-gray-400 text-2xl"></i>
                        </div>
                        <p class="text-gray-500 font-medium">No bookings found.</p>
                        <p class="text-gray-400 text-sm mt-1">New bookings will appear here.</p>
                    </div>
                 ` : ''}
            </div>
        `;
    },
    afterRender: () => {
        window.deleteBooking = async (id) => {
            const { showConfirm } = await import('../components/ConfirmModal.js');
            const confirmed = await showConfirm('Are you sure you want to delete this booking?', 'Delete Booking');

            if (confirmed) {
                const { error } = await supabase.from('bookings').delete().eq('id', id);
                if (error) {
                    showToast('Error deleting booking: ' + error.message, 'error');
                } else {
                    showToast('Booking deleted successfully!', 'success');
                    setTimeout(() => window.location.reload(), 1000);
                }
            }
        };
    }
};

export default Bookings;
