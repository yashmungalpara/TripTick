import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

const Messages = {
    render: async () => {
        console.log('Fetching messages...');
        // Fetch messages
        const { data: messages, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        console.log('Messages fetch result:', { messages, error });

        if (error) {
            console.error('Error fetching messages:', error);
            return `<div class="p-6 text-red-600">Error loading messages: ${error.message} <br> Check console for details.</div>`;
        }

        const renderRow = (msg) => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${msg.name}</div>
                    <div class="text-sm text-gray-500">${msg.email}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-gray-900 font-semibold">${msg.subject}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs" title="${msg.message}">${msg.message}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${msg.status === 'unread' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${msg.status || 'unread'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(msg.created_at).toLocaleDateString()}
                </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button data-id="${msg.id}" class="text-red-600 hover:text-red-900 delete-btn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;

        return `
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-2xl font-bold text-gray-800">Messages</h1>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        ${messages.length} Total
                    </span>
                </div>

                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="messages-table-body">
                                ${messages.length > 0 ? messages.map(renderRow).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No messages found.</td></tr>'}
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
                if (!confirm('Are you sure you want to delete this message?')) return;

                const id = e.currentTarget.dataset.id;
                const { error } = await supabase
                    .from('messages')
                    .delete()
                    .eq('id', id);

                if (error) {
                    showToast('Error deleting message', 'error');
                    console.error(error);
                } else {
                    showToast('Message deleted', 'success');
                    // Reload data (simple way for now)
                    window.location.reload();
                }
            });
        });
    }
};

export default Messages;
