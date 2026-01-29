
export default function Signup() {
    return `
    <div class="flex min-h-screen font-sans">
        <!-- Left Side: Form -->
        <div class="w-full md:w-[55%] bg-white flex flex-col justify-center p-8 md:p-16 relative">
            <!-- Back Button / Top Nav -->
            <div class="absolute top-8 left-8">
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                    <i class="fas fa-arrow-left"></i>
                </a>
            </div>
            
            <div class="absolute top-8 right-8 text-sm text-gray-500">
                Already member? <a href="#login" class="text-blue-600 font-semibold hover:underline">Sign in</a>
            </div>

            <!-- Content -->
            <div class="max-w-md w-full mx-auto mt-12">
                <div class="mb-10 relative">
                    <h1 class="text-4xl font-bold text-gray-900 mb-2">Sign Up</h1>
                    <p class="text-gray-400 text-sm">Secure Your Communications with TripTick</p>
                
                </div>

                <form class="space-y-6" onsubmit="event.preventDefault(); window.location.hash = '#login'">
                    <!-- Name Input -->
                    <div class="relative group">
                        <div class="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                            <i class="far fa-user text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input type="text" placeholder="Daniel Ahmadi" class="w-full py-4 pl-8 pr-10 border-b border-gray-200 text-gray-900 font-medium placeholder-gray-900 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                        <div class="absolute inset-y-0 right-0 flex items-center">
                            <i class="fas fa-check-circle text-green-400"></i>
                        </div>
                    </div>

                    <!-- Email Input -->
                    <div class="relative group">
                        <div class="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                            <i class="far fa-envelope text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input type="email" placeholder="11Danielahmadi@gmail.com" class="w-full py-4 pl-8 pr-10 border-b border-gray-200 text-gray-900 font-medium placeholder-gray-900 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                        <div class="absolute inset-y-0 right-0 flex items-center">
                            <i class="fas fa-check-circle text-green-400"></i>
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div class="relative group">
                        <div class="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                            <i class="far fa-comment-dots text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input type="password" value="......" class="w-full py-4 pl-8 pr-10 border-b border-gray-200 text-gray-900 font-extrabold tracking-widest placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                        <button type="button" class="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600">
                            <i class="far fa-eye-slash"></i>
                        </button>
                    </div>

                    <!-- Requirements -->
                    <div class="space-y-2 pt-2">
                         <div class="flex items-center text-xs text-gray-300">
                            <span class="w-2 h-2 rounded-full bg-gray-200 mr-2"></span> Least 8 characters
                        </div>
                        <div class="flex items-center text-xs text-green-500 font-medium">
                            <i class="fas fa-check mr-2 text-[10px]"></i> Least one number (0-9) or a symbol
                        </div>
                        <div class="flex items-center text-xs text-green-500 font-medium">
                            <i class="fas fa-check mr-2 text-[10px]"></i> Lowercase (a-z) and uppercase (A-Z).
                        </div>
                    </div>
                    
                    <!-- Confirm Password Input (Style as "Re-Type Password") -->
                     <div class="relative group mt-4">
                        <div class="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                            <i class="fas fa-key text-gray-300 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input type="password" placeholder="Re-Type Password" class="w-full py-4 pl-8 pr-10 border-b border-gray-200 text-gray-500 font-medium placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" />
                    </div>


                    <div class="flex items-center justify-between pt-8">
                        <button type="submit" class="bg-blue-600 text-white px-10 py-3 rounded-full font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                            Sign Up <i class="fas fa-arrow-right text-sm"></i>
                        </button>
                        
                      
                    </div>
                </form>
            </div>
        </div>

        <!-- Right Side: Visual -->
        <div class="hidden md:flex md:w-[45%] bg-[#5865F2] relative overflow-hidden items-center justify-center">
             <!-- Abstract Shapes Background -->
            <div class="absolute top-0 right-0 w-full h-full">
                 <!-- Darker Blue blob top right -->
                 <div class="absolute top-[-10%] right-[-10%] w-[80%] h-[70%] bg-[#404EED] rounded-bl-[100px] transform rotate-12 opacity-50"></div>
                 <!-- Lighter Blue wave bottom left -->
                 <div class="absolute bottom-[-10%] left-[-20%] w-[100%] h-[60%] bg-[#4752C4] rounded-tr-[150px] transform -rotate-12 opacity-30"></div>
            </div>

            <!-- Floating Cards Container -->
            <div class="relative z-10 w-full max-w-sm">
                <!-- Card 1: Inbox/Balance -->
                <div class="absolute top-[-160px] right-[-40px] bg-white rounded-3xl p-6 shadow-2xl w-48 animate-float-slow">
                     <span class="text-orange-500 text-xs font-bold">Inbox</span>
                     <div class="text-3xl font-bold text-gray-900 mt-1">176,18</div>
                     
                     <div class="mt-4 flex items-center justify-center relative h-12">
                         <!-- Small Graph Mockup -->
                          <svg viewBox="0 0 100 40" class="w-full h-full overflow-visible">
                            <path d="M0,30 Q20,10 40,30 T80,20 T100,10" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
                             <circle cx="50" cy="25" r="8" fill="#1F2937" />
                             <text x="50" y="28" text-anchor="middle" fill="white" font-size="6" font-family="sans-serif">45</text>
                          </svg>
                     </div>
                </div>

                <!-- Floating Social Icons -->
                <div class="absolute top-[-80px] right-[-90px] w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce-slow delay-100">
                    <i class="fab fa-instagram text-2xl text-pink-500"></i>
                </div>
                 <div class="absolute top-[20px] right-[-80px] w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce-slow delay-300">
                    <i class="fab fa-tiktok text-2xl text-black"></i>
                </div>


                <!-- Card 2: Main Info Card -->
                <div class="bg-white rounded-3xl p-6 shadow-2xl w-full transform translate-x-8 translate-y-20">
                    <div class="flex items-center justify-between mb-4">
                        <div class="space-y-2 w-1/2">
                            <div class="h-2 bg-blue-500 rounded-full w-10"></div>
                            <div class="h-1.5 bg-gray-200 rounded-full w-full"></div>
                            <div class="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                             <div class="h-1.5 bg-gray-200 rounded-full w-1/2"></div>
                        </div>
                        <div class="w-10 h-10 text-orange-400">
                            <i class="fas fa-key text-3xl"></i>
                        </div>
                    </div>
                    
                    <h3 class="font-bold text-gray-900 text-lg">Your data, your rules</h3>
                    <p class="text-gray-400 text-xs mt-2 leading-relaxed">
                        Your data belongs to you, and our encryption ensures that only you can access it.
                    </p>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes float-slow {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
             @keyframes bounce-slow {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
            .animate-float-slow {
                animation: float-slow 6s ease-in-out infinite;
            }
             .animate-bounce-slow {
                animation: bounce-slow 4s ease-in-out infinite;
            }
        </style>
    </div>
    `;
}
