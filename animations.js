/* ============================================================
   WILSON HUANG — ANIMATIONS / INTERACTIONS
   ============================================================ */

/* ── Canvas particle network ── */
let mouse = { x: -1000, y: -1000 };

const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const PTS = Array.from({ length: 75 }, () => ({
  x:  Math.random() * window.innerWidth,
  y:  Math.random() * window.innerHeight,
  vx: (Math.random() - .5) * .28,
  vy: (Math.random() - .5) * .28,
  r:  Math.random() * 1.4 + .4,
  a:  Math.random() * .3 + .06,
}));

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < PTS.length; i++) {
    for (let j = i + 1; j < PTS.length; j++) {
      const d = Math.hypot(PTS[i].x - PTS[j].x, PTS[i].y - PTS[j].y);
      if (d < 115) {
        ctx.beginPath();
        ctx.moveTo(PTS[i].x, PTS[i].y);
        ctx.lineTo(PTS[j].x, PTS[j].y);
        ctx.strokeStyle = `rgba(5,217,232,${(1 - d / 115) * 0.09})`;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }
    }
  }

  PTS.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(5,217,232,${p.a})`;
    ctx.fill();

    /* cursor repulsion */
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 110 && dist > 0) {
      const f = (110 - dist) / 110;
      p.vx += (dx / dist) * f * 0.18;
      p.vy += (dy / dist) * f * 0.18;
    }
    const spd = Math.hypot(p.vx, p.vy);
    if (spd > 1.6) { p.vx = (p.vx / spd) * 1.6; p.vy = (p.vy / spd) * 1.6; }

    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    else if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    else if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawCanvas);
}
drawCanvas();

/* ── Glitch ── */
const glitchEl = document.querySelector('.glitch-text');
if (glitchEl) {
  const doGlitch = () => {
    glitchEl.classList.add('g');
    setTimeout(() => glitchEl.classList.remove('g'), 300);
  };
  doGlitch();
  setInterval(doGlitch, 5000 + Math.random() * 3000);
}

/* ── Typed cycling role ── */
const roles    = ['Backend Engineer', 'Data Engineer', 'Software Developer', 'ML Engineer'];
const typedEl  = document.getElementById('typed-role');
let roleIdx = 0, charIdx = roles[0].length, deleting = false;

function typeRole() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (deleting) {
    charIdx--;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      charIdx = 0;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 38);
  } else {
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeRole(); }, 2400);
      return;
    }
    setTimeout(typeRole, 78);
  }
}
setTimeout(() => { deleting = true; typeRole(); }, 2200);

/* ── Active nav + scroll state ── */
const sections = ['hero', 'about', 'skills', 'work', 'contact'];
const navLinks  = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = 'hero';
  const scrollMid = window.scrollY + window.innerHeight / 2;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollMid) current = id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href').slice(1) === current);
  });
}

const navbar      = document.getElementById('navbar');
const progressBar = document.getElementById('scroll-progress');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
  if (progressBar) {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    if (mobileMenu.classList.contains('open')) closeMenu();
  });
});

/* ── Mobile menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
function openMenu()  { mobileMenu.classList.add('open'); hamburger.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMenu() { mobileMenu.classList.remove('open'); hamburger.classList.remove('open'); document.body.style.overflow = ''; }
hamburger.addEventListener('click', () => { mobileMenu.classList.contains('open') ? closeMenu() : openMenu(); });

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Skill bars ── */
let skillsAnimated = false;
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillsSection.querySelectorAll('.sk-fill').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = bar.dataset.val + '%'; }, 120);
      });
      skillsObs.disconnect();
    }
  }, { threshold: 0.2 });
  skillsObs.observe(skillsSection);
}

/* ── 3D card tilt on hover ── */
const tiltMap = new Map([
  ['.project-featured', 4],
  ['.project-card',     8],
  ['.ccard',            6],
]);

tiltMap.forEach((intensity, selector) => {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow .25s, border-color .25s, background .25s';
    });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)  / r.width  - 0.5;
      const y = (e.clientY - r.top)   / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.65s cubic-bezier(.23,1,.32,1), box-shadow .25s, border-color .25s, background .25s';
      card.style.transform  = '';
    });
  });
});

/* ── Custom cursor (pointer devices only) ── */
if (!window.matchMedia('(hover: none)').matches) {
  const dot  = document.createElement('div'); dot.id  = 'cursor-dot';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = -200, my = -200, rx = -200, ry = -200;
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    mouse.x = mx; mouse.y = my;
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

  document.querySelectorAll('a, button, .project-card, .project-featured, .ccard, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  (function animCursor() {
    rx = lerp(rx, mx, 0.1);
    ry = lerp(ry, my, 0.1);
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
}
