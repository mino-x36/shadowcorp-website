// Navigation component for Shadow Corporation website
import { initGlitchEffect } from './animations.js';

/**
 * Initialize the navigation component
 */
export function initNavigation() {
  // Create the navigation HTML
  const navHTML = `
    <div class="bg-gradient-to-b from-black to-transparent absolute top-0 left-0 right-0 z-10">
      <nav class="content-container py-4 px-6 flex flex-col md:flex-row items-center justify-between relative">
        <div class="flex items-center mb-4 md:mb-0">
          <a href="index.html" class="flex items-center">
            <div id="logo" class="text-3xl font-bold text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500">
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                <path d="m14 7 3 3"></path>
                <path d="M5 6v4"></path>
                <path d="M19 14v4"></path>
                <path d="M10 2v2"></path>
                <path d="M7 8H3"></path>
                <path d="M21 16h-4"></path>
                <path d="M11 3H9"></path>
              </svg>
            </div>
            <span class="text-xl font-bold tracking-wider">SHADOW <span class="text-purple-500">CORP</span></span>
          </a>
        </div>
        
        <button id="menuToggle" class="md:hidden absolute right-6 top-6 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        
        <ul id="navMenu" class="hidden md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto">
          <li><a href="index.html" class="nav-link text-white hover:text-purple-400 transition-colors py-2">Home</a></li>
          <li><a href="divisions.html" class="nav-link text-white hover:text-purple-400 transition-colors py-2">Divisions</a></li>
          <li><a href="join.html" class="nav-link text-white hover:text-purple-400 transition-colors py-2">Join Us</a></li>
          <li><a href="contact.html" class="nav-link text-white hover:text-purple-400 transition-colors py-2">Contact</a></li>
          <li><a href="admin-login.html" class="nav-link bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded transition-colors neon-border">Admin</a></li>
        </ul>
      </nav>
    </div>
  `;
  
  // Insert the navigation
  const header = document.createElement('header');
  header.innerHTML = navHTML;
  document.body.prepend(header);
  
  // Add active state to current page link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('text-purple-400');
      link.classList.add('border-b-2');
      link.classList.add('border-purple-500');
    }
  });
  
  // Handle mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      if (navMenu.classList.contains('hidden')) {
        navMenu.classList.remove('hidden');
        navMenu.classList.add('flex');
        navMenu.classList.add('mt-4');
      } else {
        navMenu.classList.add('hidden');
        navMenu.classList.remove('flex');
        navMenu.classList.remove('mt-4');
      }
    });
  }
  
  // Initialize logo glitch effect
  initGlitchEffect('logo');
}

/**
 * Initialize the footer component
 */
export function initFooter() {
  // Create the footer HTML
  const footerHTML = `
    <footer class="bg-black text-white py-8 mt-16">
      <div class="content-container px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4 text-purple-400">Shadow Corporation</h3>
            <p class="text-gray-400">Forging the future through strategic operations and technological advancement.</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4 text-purple-400">Quick Links</h3>
            <ul class="space-y-2">
              <li><a href="index.html" class="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="divisions.html" class="text-gray-400 hover:text-purple-400 transition-colors">Divisions</a></li>
              <li><a href="join.html" class="text-gray-400 hover:text-purple-400 transition-colors">Join Us</a></li>
              <li><a href="contact.html" class="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4 text-purple-400">Status</h3>
            <div id="footer-status" class="text-gray-400">All systems operational</div>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500">
          <p>&copy; 2025 Shadow Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
  
  // Insert the footer
  const footer = document.createElement('div');
  footer.innerHTML = footerHTML;
  document.body.appendChild(footer);
  
  // Update status in footer
  try {
    const status = JSON.parse(localStorage.getItem('shadowcorp_status')) || { message: 'All systems operational' };
    const statusElement = document.getElementById('footer-status');
    if (statusElement) {
      statusElement.textContent = status.message;
    }
  } catch (error) {
    console.error('Error loading status:', error);
  }
}