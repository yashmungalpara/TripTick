export function showConfirm(message = "Are you sure?", title = "Confirm Action") {
    return new Promise((resolve) => {
        const modalId = 'confirm-modal-' + Date.now();

        const html = `
            <div id="${modalId}" class="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-[60] backdrop-blur-sm transition-opacity duration-300">
                <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 p-6">
                    
                    <div class="mb-4">
                        <h3 class="text-xl font-bold text-gray-900">${title}</h3>
                        <p class="text-gray-500 mt-2">${message}</p>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button id="${modalId}-cancel" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium focus:outline-none">
                            Cancel
                        </button>
                        <button id="${modalId}-confirm" class="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium focus:outline-none">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Inject into DOM
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        const modal = document.getElementById(modalId);
        const cancelBtn = document.getElementById(`${modalId}-cancel`);
        const confirmBtn = document.getElementById(`${modalId}-confirm`);

        const cleanup = () => {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                container.remove();
            }, 300);
        };

        cancelBtn.addEventListener('click', () => {
            resolve(false);
            cleanup();
        });

        confirmBtn.addEventListener('click', () => {
            resolve(true);
            cleanup();
        });

        // Click outside to cancel
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                resolve(false);
                cleanup();
            }
        });
    });
}
