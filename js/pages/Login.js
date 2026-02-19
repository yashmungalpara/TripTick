
import supabase from '../supabaseClient.js'
import { showToast } from '../components/Toast.js'

export default function Login() {
    return {
        render: () => `
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
                New here? <a href="#signup" class="text-blue-600 font-semibold hover:underline">Create Account</a>
            </div>

            <!-- Content -->
            <div class="max-w-md w-full mx-auto mt-12">
                <div class="mb-12">
                    <h1 class="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p class="text-gray-400 text-sm">Sign in to access your dashboard</p>
                </div>

                <form id="login-form" class="space-y-8">

                    <!-- Email Input -->
                    <div class="relative group">
                        <div class="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                            <i class="far fa-envelope text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input type="email" id="login-email" placeholder="Email Address" class="w-full py-4 pl-8 pr-10 border-b border-gray-200 text-gray-900 font-extrabold tracking-widest placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                        <div class="absolute inset-y-0 right-0 flex items-center">
                            <i class="fas fa-check-circle text-green-400 opacity-0 transition-opacity" id="email-check"></i>
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div class="relative group">
                        <div class="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                            <i class="fas fa-lock text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors"></i>
                        </div>
                        <input type="password" id="login-password" placeholder="Password" class="w-full py-4 pl-8 pr-10 border-b border-gray-200 text-gray-900 font-extrabold tracking-widest placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-colors bg-transparent" required />
                        <button type="button" id="toggle-password" class="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600">
                            <i class="far fa-eye-slash"></i>
                        </button>
                    </div>
                    
                    <div class="text-right pt-2">
                        <button type="button" class="text-xs font-semibold text-gray-400 hover:text-blue-600 transition">
                            Forgot Password?
                        </button>
                    </div>

                    <div class="flex items-center justify-between pt-4">
                        <button type="submit" id="login-btn" class="bg-blue-600 text-white px-10 py-3 rounded-full font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                            <span>Sign In</span> <i class="fas fa-arrow-right text-sm"></i>
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
            
            <!-- Graphic content for Login (Reused aesthetic but slightly different) -->
            <div class="relative z-10 text-center text-white px-10">
                <div class="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg border border-white/10 animate-float-slow">
                    <i class="fas fa-globe-americas text-4xl"></i>
                </div>
                 <h2 class="text-3xl font-bold mb-4">Explore the World</h2>
                 <p class="text-blue-100/80 leading-relaxed max-w-sm mx-auto">
                    Login to unlock exclusive deals and manage your trips with TripTick's secure platform.
                 </p>
                 
                 <!-- Decorative Dots -->
                 <div class="flex justify-center gap-2 mt-8">
                    <span class="w-8 h-2 bg-white rounded-full"></span>
                    <span class="w-2 h-2 bg-white/50 rounded-full"></span>
                    <span class="w-2 h-2 bg-white/50 rounded-full"></span>
                 </div>
            </div>
        </div>
        
        <style>
            @keyframes float-slow {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            .animate-float-slow {
                animation: float-slow 6s ease-in-out infinite;
            }
        </style>
    </div>
    `,
        afterRender: () => {
            const form = document.getElementById('login-form');
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const btn = document.getElementById('login-btn');

            // Password Toggle (Login)
            const toggleBtn = document.getElementById('toggle-password');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', function () {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    this.innerHTML = type === 'password' ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
                });
            }

            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const email = emailInput?.value;
                    const password = passwordInput?.value;

                    if (btn) {
                        btn.disabled = true;
                        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    }

                    try {
                        const { data, error } = await supabase.auth.signInWithPassword({
                            email: email,
                            password: password
                        });

                        if (error) throw error;

                        showToast('Welcome back!', 'success');

                        // Redirect to Home
                        setTimeout(() => {
                            window.location.hash = ''; // Go to Home
                        }, 1000);

                    } catch (err) {
                        showToast(err.message || "Invalid email or password.", 'error');
                    } finally {
                        if (btn) {
                            btn.disabled = false;
                            btn.innerHTML = '<span>Sign In</span> <i class="fas fa-arrow-right text-sm"></i>';
                        }
                    }
                });
            }
        }
    };
}

