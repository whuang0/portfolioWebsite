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

/* ── Anime companion ── */
(function () {
  const wrap     = document.getElementById('anime-char-wrap');
  const charSvg  = document.getElementById('anime-char');
  const bubble   = document.getElementById('char-bubble');
  const bubbleTx = document.getElementById('char-bubble-text');
  const irisL    = document.getElementById('iris-l');
  const irisR    = document.getElementById('iris-r');
  const lidL     = document.getElementById('lid-l');
  const lidR     = document.getElementById('lid-r');
  if (!wrap || !charSvg) return;

  /* Eye follow */
  document.addEventListener('mousemove', e => {
    const rect  = charSvg.getBoundingClientRect();
    const scale = rect.width / 180;
    function offset(eyeCx, eyeCy) {
      const dx = e.clientX - (rect.left + eyeCx * scale);
      const dy = e.clientY - (rect.top  + eyeCy * scale);
      const d  = Math.hypot(dx, dy) || 1;
      const f  = Math.min(d, 120) / 120 * 4.5;
      return { x: (dx / d) * f, y: (dy / d) * f };
    }
    const oL = offset(68, 97), oR = offset(112, 97);
    if (irisL) irisL.style.transform = `translate(${oL.x}px,${oL.y}px)`;
    if (irisR) irisR.style.transform = `translate(${oR.x}px,${oR.y}px)`;
  });

  /* Blink */
  function doBlink() {
    if (!lidL || !lidR) return;
    lidL.style.transform = lidR.style.transform = 'scaleY(1)';
    setTimeout(() => {
      lidL.style.transform = lidR.style.transform = 'scaleY(0.02)';
      setTimeout(doBlink, 2600 + Math.random() * 3400);
    }, 145);
  }
  setTimeout(doBlink, 1600);

  /* Speech bubble */
  let bubbleTimer = null;
  function showBubble(text) {
    clearTimeout(bubbleTimer);
    bubbleTx.textContent = text;
    bubble.classList.add('visible');
  }
  function hideBubble(delay) {
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove('visible'), delay || 0);
  }

  /* Hover reactions */
  document.querySelectorAll('.btn-primary').forEach(b => {
    b.addEventListener('mouseenter', () => { wrap.classList.add('char-waving');   showBubble('check it out! →'); });
    b.addEventListener('mouseleave', () => { wrap.classList.remove('char-waving'); hideBubble(400); });
  });
  document.querySelectorAll('.btn-ghost').forEach(b => {
    b.addEventListener('mouseenter', () => { wrap.classList.add('char-excited');   showBubble("let's chat! ♡"); });
    b.addEventListener('mouseleave', () => { wrap.classList.remove('char-excited'); hideBubble(400); });
  });
  document.querySelectorAll('.nav-links a, .mm-link').forEach(a => {
    a.addEventListener('mouseenter', () => showBubble('// ' + a.textContent.trim().toLowerCase()));
    a.addEventListener('mouseleave', () => hideBubble(300));
  });
  const quips = ['nice one!', 'so cool~', 'impressive!', 'ooh this one!', '*studying*'];
  let qi = 0;
  document.querySelectorAll('.project-card, .project-featured').forEach(c => {
    c.addEventListener('mouseenter', () => showBubble(quips[qi++ % quips.length]));
    c.addEventListener('mouseleave', () => hideBubble(300));
  });
  document.querySelectorAll('.ccard').forEach(c => {
    c.addEventListener('mouseenter', () => showBubble('reach out! ✉'));
    c.addEventListener('mouseleave', () => hideBubble(300));
  });
})();

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
