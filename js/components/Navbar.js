export default function Navbar() {
  return `
    <nav class="fixed w-full z-50 top-0 start-0 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all duration-300 shadow-sm" id="main-navbar">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" class="flex items-center space-x-2 rtl:space-x-reverse group">
            <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white transform group-hover:rotate-12 transition">
                <i class="fa-solid fa-paper-plane text-sm"></i>
            </div>
            <span class="self-center text-2xl font-black whitespace-nowrap text-gray-900 tracking-tight">Trip<span class="text-red-600">Tick</span></span>
        </a>
        
        <div class="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse items-center">
            <a href="#login" class="text-gray-600 hover:text-red-600 font-bold text-sm transition-colors hidden sm:block">Log in</a>
            <a href="#signup" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-full text-sm px-6 py-2.5 text-center shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all">Sign Up</a>
            <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <i class="fa-solid fa-bars text-xl"></i>
          </button>
        </div>

        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="#" id="nav-home" class="nav-link block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors relative group">
                Home
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#destinations" id="nav-destinations" class="nav-link block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors relative group">
                Destinations
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#packages" id="nav-packages" class="nav-link block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors relative group">
                Packages
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#contact" id="nav-contact" class="nav-link block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0 transition-colors relative group">
                Contact
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <style>
        .nav-link.active {
            color: #dc2626; /* text-red-600 */
        }
        .nav-link.active span {
            w: 100%;
            width: 100%;
        }
    </style>
    `;
}
