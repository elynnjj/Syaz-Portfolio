/* Ambient Dark Cafe & Crimson Rosewood Background Canvas */
(function () {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 3 + 1; // Slightly larger for pop-up effect
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.6 + 0.25; // Brighter alpha for pop-up

      // Color Palette: #6B3038 (Crimson), #5c464b (Rosewood), #91877B (Warm Taupe), #e2b49a (Rose Sand), #66d9ef (Soft Cyan)
      const colors = [
        '107, 48, 56',   // Crimson Rose #6B3038
        '140, 63, 74',   // Bright Crimson #8c3f4a
        '92, 70, 75',    // Rosewood #5c464b
        '145, 135, 123', // Warm Taupe #91877B
        '226, 180, 154', // Soft Rose Sand #e2b49a
        '102, 217, 239'  // Tech Cyan #66d9ef
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      this.alpha += Math.sin(Date.now() * 0.0015 + this.size) * 0.004;
      if (this.alpha < 0.2) this.alpha = 0.2;
      if (this.alpha > 0.85) this.alpha = 0.85;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.shadowBlur = 16; // Vibrant pop-up radial glow
      ctx.shadowColor = `rgba(${this.color}, 0.9)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle Dark Espresso Ambient Spotlight Gradient
    const gradient = ctx.createRadialGradient(
      width * 0.75, height * 0.25, 80,
      width * 0.5, height * 0.5, Math.max(width, height) * 0.85
    );
    gradient.addColorStop(0, 'rgba(36, 30, 26, 0.12)');
    gradient.addColorStop(0.5, 'rgba(20, 16, 14, 0.05)');
    gradient.addColorStop(1, 'rgba(11, 11, 12, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();
