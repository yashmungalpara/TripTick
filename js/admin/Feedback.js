import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

const Feedback = {
    render: async () => {
        // Fetch feedback
        const { data: feedbacks, error } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching feedback:', error);
            return `<div class="p-6 text-red-600">Error loading feedback: ${error.message}</div>`;
        }

        const renderRow = (item) => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${item.name}</div>
                    <div class="text-sm text-gray-500">${item.location}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-500 italic">"${item.text}"</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(item.created_at).toLocaleDateString()}
                </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-id="${item.id}" class="text-red-600 hover:text-red-900 delete-btn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;

        return `
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">User Feedback / Moments</h1>
                    <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        ${feedbacks.length} Total
                    </span>
                </div>

                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Story</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${feedbacks.length > 0 ? feedbacks.map(renderRow).join('') : '<tr><td colspan="4" class="px-6 py-4 text-center text-gray-500">No feedback found.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },
    afterRender: () => {
        // Delete Logic
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (!confirm('Are you sure you want to delete this story?')) return;

                const id = e.currentTarget.dataset.id;
                const { error } = await supabase
                    .from('feedback')
                    .delete()
                    .eq('id', id);

                if (error) {
                    showToast('Error deleting feedback', 'error');
                    console.error(error);
                } else {
                    showToast('Feedback deleted', 'success');
                    window.location.reload();
                }
            });
        });
    }
};

export default Feedback;
