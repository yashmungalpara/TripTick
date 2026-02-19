import supabase from '../supabaseClient.js';
import { showToast } from '../components/Toast.js';

const Users = {
    render: async () => {
        // Fetch users from profiles table
        let query = supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        const searchParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const roleFilter = searchParams.get('role') || 'all';

        if (roleFilter !== 'all') {
            query = query.eq('role', roleFilter);
        }

        const { data: users, error } = await query;

        if (error) {
            console.error('Error fetching users:', error);
            // Fallback for RLS/Auth issues if admin cannot read all profiles
            if (error.code === '42501') return `<div class="text-red-500 p-6">Access Denied: You do not have permission to view users.</div>`;
            return `<div class="text-red-500 p-6">Error loading users: ${error.message}</div>`;
        }

        const rows = users.map(user => `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                            <span class="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                ${user.avatar_url
                ? `<img class="h-full w-full object-cover" src="${user.avatar_url}" alt="">`
                : `<i class="fas fa-user text-gray-400"></i>`
            }
                            </span>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${user.full_name || 'N/A'}</div>
                            <div class="text-xs text-gray-500">ID: ${user.id.substring(0, 8)}...</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${user.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}">
                        ${user.role || 'user'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(user.created_at).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="window.deleteUser('${user.id}')" class="text-red-400 hover:text-red-600 transition-colors" title="Delete User">
                         <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        return `
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-semibold text-gray-800">Users</h2>
                 <div class="flex space-x-2 items-center">
                    <select id="role-filter" class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">
                        <option value="all" ${roleFilter === 'all' ? 'selected' : ''}>All Roles</option>
                        <option value="user" ${roleFilter === 'user' ? 'selected' : ''}>Users</option>
                        <option value="admin" ${roleFilter === 'admin' ? 'selected' : ''}>Admins</option>
                    </select>
                     <span class="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-600 shadow-sm">
                        Total: <strong>${users.length}</strong>
                     </span>
                </div>
            </div>

            <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${rows}
                    </tbody>
                </table>
                 ${users.length === 0 ? `
                    <div class="text-center py-12 flex flex-col items-center justify-center">
                        <div class="bg-gray-100 p-4 rounded-full mb-3">
                            <i class="fas fa-users-slash text-gray-400 text-2xl"></i>
                        </div>
                        <p class="text-gray-500 font-medium">No users found.</p>
                    </div>
                 ` : ''}
            </div>
        `;
    },
    afterRender: () => {
        window.deleteUser = async (id) => {
            const { showConfirm } = await import('../components/ConfirmModal.js');
            const confirmed = await showConfirm('Are you sure you want to delete this user? This will also remove their profile data.', 'Delete User');

            if (confirmed) {
                // Delete from profiles
                const { error } = await supabase.from('profiles').delete().eq('id', id);

                if (error) {
                    showToast('Error deleting user: ' + error.message, 'error');
                } else {
                    showToast('User profile deleted successfully!', 'success');
                    setTimeout(() => window.location.reload(), 1000);
                }
            }
        };

        // Filter Logic
        const filterSelect = document.getElementById('role-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                window.location.hash = `#users?role=${val}`;
                // Manually trigger re-render if hash change doesn't catch it immediately or to force refresh
                // app.js mostly handles hashchange, but let's ensure smooth UX
                import('../admin.js').then(module => {
                    // The router in admin.js should handle hash change event. 
                    // If not, we might need to dispatch event.
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                });
            });
        }
    }
};

export default Users;
