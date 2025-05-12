// Animation utilities for Shadow Corporation website

/**
 * Initialize the particle background
 * @param {String} canvasId - The ID of the canvas element
 */
export function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      color: `rgba(138, 43, 226, ${Math.random() * 0.5 + 0.2})`,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    });
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Boundary check
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    }
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/**
 * Initialize typing effect for the element
 * @param {String} elementId - The ID of the element to apply the effect to
 * @param {Array} phrases - Array of phrases to type
 * @param {Number} typeSpeed - Typing speed in milliseconds
 * @param {Number} backSpeed - Backspace speed in milliseconds
 * @param {Number} startDelay - Delay before starting in milliseconds
 * @param {Number} backDelay - Delay before backspacing in milliseconds
 */
export function initTypingEffect(elementId, phrases, typeSpeed = 100, backSpeed = 50, startDelay = 1000, backDelay = 2000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Speed logic
    let typeTimer = typeSpeed;
    
    if (isDeleting) {
      typeTimer = backSpeed;
    }
    
    // Complete this phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isWaiting = true;
      typeTimer = backDelay;
      setTimeout(() => {
        isDeleting = true;
        isWaiting = false;
      }, backDelay);
    }
    
    // Completed deletion
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeTimer = startDelay;
    }
    
    if (!isWaiting) {
      setTimeout(type, typeTimer);
    } else {
      setTimeout(type, backDelay);
    }
  }
  
  setTimeout(type, startDelay);
}

/**
 * Apply a glitch effect to an element
 * @param {String} elementId - The ID of the element to apply the effect to
 */
export function initGlitchEffect(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  function glitch() {
    const duration = Math.random() * 100 + 50;
    const randomOffset = (Math.random() * 5 - 2.5) + 'px';
    
    element.style.transform = `translate(${randomOffset}, 0)`;
    element.style.textShadow = `
      ${Math.random() * 3 - 1.5}px 0 rgba(255, 0, 255, 0.6),
      ${Math.random() * -3 + 1.5}px 0 rgba(0, 255, 255, 0.6)
    `;
    
    setTimeout(() => {
      element.style.transform = '';
      element.style.textShadow = '';
    }, duration);
    
    setTimeout(glitch, Math.random() * 5000 + 3000);
  }
  
  setTimeout(glitch, Math.random() * 2000 + 1000);
}