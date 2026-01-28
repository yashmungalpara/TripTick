
import supabase from './supabaseClient.js'

async function checkConnection() {
    try {
        const { data, error } = await supabase.from('test').select('*').limit(1);
        // We expect an error if the table doesn't exist, but it confirms we reached Supabase.
        // Or we can just check if the client is initialized.

        console.log('Supabase Client Initialized:', supabase);

        if (error && error.code !== 'PGRST204') { // PGRST204 is no content/table not found which might be expected if empty
            console.log('Connection check (might verify valid key even if table missing):', error);
        } else {
            console.log('Supabase connection (probably) successful!');
        }

        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = 'Supabase Client Initialized. Check console for details.';
            statusElement.classList.add('text-green-500');
        }

    } catch (err) {
        console.error('Unexpected error:', err);
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = 'Error Initializing Supabase. Check console.';
            statusElement.classList.add('text-red-500');
        }
    }
}

checkConnection();
