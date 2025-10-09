// 🎨 Portfolio Interactive Magic
class PortfolioMagic {
  constructor() {
    this.init();
  }

  init() {
    this.addParticleBackground();
    this.addTypingEffect();
    this.addScrollMagic();
    this.addThemeSwitcher();
    this.addSkillAnimation();
  }

  addParticleBackground() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(102, 126, 234, 0.1)";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  addTypingEffect() {
    const skills = ["PHP Developer", "Laravel Expert", "JavaScript Ninja", "Full Stack Engineer", "Problem Solver"];
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeElement = document.querySelector("#typed-slide-1");
    if (!typeElement) return;

    function type() {
      const currentSkill = skills[skillIndex];

      if (isDeleting) {
        typeElement.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typeElement.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentSkill.length) {
        setTimeout(() => (isDeleting = true), 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        skillIndex = (skillIndex + 1) % skills.length;
      }

      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }

  addScrollMagic() {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      section.style.cssText = "transform:translateY(50px);opacity:0;transition:all 0.6s ease;";
      observer.observe(section);
    });
  }

  addThemeSwitcher() {
    const switcher = document.createElement("div");
    switcher.innerHTML = "🌙";
    switcher.style.cssText = `
            position:fixed;top:20px;right:20px;z-index:1000;
            width:50px;height:50px;border-radius:50%;
            background:linear-gradient(135deg,#667eea,#764ba2);
            display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:24px;transition:transform 0.3s;
        `;

    let isDark = false;
    switcher.onclick = () => {
      isDark = !isDark;
      switcher.innerHTML = isDark ? "☀️" : "🌙";
      document.body.setAttribute("data-theme", isDark ? "dark" : "light");
      switcher.style.transform = "rotate(360deg)";
      setTimeout(() => (switcher.style.transform = ""), 300);
    };

    document.body.appendChild(switcher);
  }

  addSkillAnimation() {
    const skillBars = document.querySelectorAll(".progress-bar");

    const animateSkills = () => {
      skillBars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.style.width || "0%";
          bar.style.transition = "width 2s ease";
        }, i * 200);
      });
    };

    const skillSection = document.querySelector("#about");
    if (skillSection) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animateSkills();
          observer.disconnect();
        }
      });
      observer.observe(skillSection);
    }
  }
}

// Initialize
new PortfolioMagic();
