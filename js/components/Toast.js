
export function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-24 right-5 z-[100] flex flex-col gap-3 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');

    // Colors based on type
    const colors = {
        success: 'bg-white border-l-4 border-emerald-500 text-gray-800',
        error: 'bg-white border-l-4 border-red-500 text-gray-800',
        info: 'bg-white border-l-4 border-blue-500 text-gray-800',
        warning: 'bg-white border-l-4 border-amber-500 text-gray-800'
    };

    // Icons
    const icons = {
        success: '<i class="fa-solid fa-circle-check text-emerald-500 text-xl"></i>',
        error: '<i class="fa-solid fa-circle-exclamation text-red-500 text-xl"></i>',
        info: '<i class="fa-solid fa-circle-info text-blue-500 text-xl"></i>',
        warning: '<i class="fa-solid fa-triangle-exclamation text-amber-500 text-xl"></i>'
    };

    const styleClass = colors[type] || colors.info;

    toast.className = `${styleClass} px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[320px] transform transition-all duration-300 translate-x-full opacity-0 pointer-events-auto`;

    toast.innerHTML = `
        ${icons[type] || icons.info}
        <div>
            <h4 class="font-bold text-sm uppercase tracking-wider opacity-90 mb-0.5">${type}</h4>
            <p class="font-medium text-sm text-gray-600">${message}</p>
        </div>
        <button class="ml-auto text-gray-400 hover:text-gray-600 transition-colors" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);

    // Animate In
    requestAnimationFrame(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    });

    // Auto Remove
    const timeout = setTimeout(() => {
        removeToast();
    }, 4000);

    function removeToast() {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
            if (container.children.length === 0) container.remove();
        }, 300);
    }
}
