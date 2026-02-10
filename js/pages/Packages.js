import Discover from '../components/Discover.js';

export default function Packages() {
    // Reuse the Discover component which already has exactly what we need:
    // - Filter buttons
    // - Grid of all packages
    // - Modal interactions

    // We just wrap it in a container to ensure top padding/margin if needed, 
    // although Discover component might handle it. 
    // Since Discover is a section, let's just return it mostly as is, 
    // maybe we can inject a specific header or just let it be.

    // Actually, the user asked for "ek page me sare packages".
    // The Discover component has "Discover Your Next Adventure" title.
    // If we use it as a standalone page, it fits perfectly.

    return `
        <div class="pt-10 min-h-screen bg-white">
            ${Discover()}
        </div>
    `;
}
