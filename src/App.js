import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- LANDING PAGE COMPONENT ---
const LandingPage = () => {
  useEffect(() => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    
    // Use a flag to ensure this runs only once
    if (loader && !loader.classList.contains('loaded')) {
      loader.classList.add('loaded'); // Mark as loaded
      setTimeout(() => {
        gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => { if(loader) loader.style.display = 'none' } });
        gsap.to(mainContent, { opacity: 1, duration: 1.5, delay: 0.2 });
        gsap.from("#hero-title", { duration: 1.2, y: 60, opacity: 0, delay: 0.5 });
        gsap.from("#hero-subtitle", { duration: 1.2, y: 60, opacity: 0, delay: 0.7 });
        gsap.from("#hero-cta", { duration: 1.2, y: 60, opacity: 0, delay: 0.9 });
      }, 2500);
    } else if (loader) {
        loader.style.display = 'none';
        if(mainContent) mainContent.style.opacity = 1;
    }

    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.create({
        trigger: "#header", start: 'top -80', end: 99999,
        toggleClass: {className: 'bg-black/70 backdrop-blur-lg shadow-2xl', targets: "#header"}
    });

  }, []);

  return (
    <>
      <div id="loader" className="loader-wrapper"><div className="loader"></div></div>
      <div id="main-content" className="opacity-0">
        <header id="header" className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-readable">Tribute</h1>
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-white font-semibold hover:text-gray-300 transition-colors">Login</Link>
                    <Link to="/login" className="bg-white text-black font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Join Now</Link>
                </div>
            </nav>
        </header>
        <main>
            <section className="h-screen flex items-center justify-center text-center relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <h2 id="hero-title" className="text-5xl md:text-7xl font-extrabold text-readable leading-tight">Creator Monetization,<br/>Redefined.</h2>
                    <p id="hero-subtitle" className="mt-6 text-lg md:text-xl text-readable max-w-2xl mx-auto">An exclusive platform for India's top creators.</p>
                    <Link id="hero-cta" to="/login" className="mt-10 inline-block bg-gradient-to-r from-gray-100 to-gray-300 text-black font-bold py-4 px-10 rounded-lg text-lg shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300">
                        Get Started
                    </Link>
                </div>
            </section>
        </main>
        <footer className="py-8 bg-black/50">
            <div className="container mx-auto px-6 text-center text-gray-400 text-readable">
                <p>&copy; 2025 Tribute. All Rights Reserved.</p>
            </div>
        </footer>
      </div>
    </>
  );
};

// --- AUTHENTICATION PAGE COMPONENT ---
const AuthPage = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
             <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back to Home
            </Link>
            <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-readable">Join Tribute</h1>
                <p className="text-lg mt-2 text-readable">Creator and Fan signup will be here.</p>
            </div>
        </div>
    );
};

// --- MAIN APP ROUTER ---
export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </Router>
  );
}
