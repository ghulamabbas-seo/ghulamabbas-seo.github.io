{
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // Contact forms are delivered to abbasseoagency@gmail.com through FormSubmit.
  const ENDPOINT = 'https://formsubmit.co/ajax/abbasseoagency@gmail.com';
  document.querySelectorAll('form.js-contact').forEach(form => {
    const msg = form.querySelector('.form-msg');
    const btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = {};
      for (const [k, v] of new FormData(form).entries()) data[k] = String(v).trim();
      if (data._honey) return;
      delete data._honey;
      data._subject = 'New website enquiry from ' + (data.Name || 'a visitor');
      data._template = 'table';
      data._captcha = 'false';
      data._url = location.href;
      if (data.Email) data._replyto = data.Email;
      const label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';
      if (msg) { msg.style.color = ''; msg.textContent = ''; }
      try {
        const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || String(j.success) === 'false') throw new Error(j.message || 'Failed');
        form.reset();
        if (msg) msg.textContent = 'Thank you! Your message has been sent. I’ll reply within one working day.';
      } catch (err) {
        if (msg) { msg.style.color = '#c0262d'; msg.innerHTML = 'Sorry, the message could not be sent. Please email <a href="mailto:abbasseoagency@gmail.com">abbasseoagency@gmail.com</a> or WhatsApp +92 340 7474614.'; }
      } finally {
        btn.disabled = false; btn.textContent = label;
      }
    });
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}


/* Cursor glow particles (colour scatter).
   Glowing particles scatter from the cursor and fade in about 1.4 s; colours cycle through the rainbow as you move.
   Set MODE = 'theme' to use only the site palette (gold, rose, pink, lilac, purple).
   Canvas sits behind content with pointer-events:none, so clicks, links, scrolling and text selection are untouched.
   On phones and tablets the glow follows your finger. Off with prefers-reduced-motion. Stops when idle or when the tab is hidden. */
(function () {
  'use strict';
  var MODE = 'rainbow';                 // 'rainbow' or 'theme'
  var MAX = 700;                        // particle cap
  var mq = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  if (mq('(prefers-reduced-motion: reduce)')) return;

  var THEME = [42, 340, 300, 275, 265];  // site palette as hues
  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), W = 0, H = 0;
  var parts = [], hue = 180, mx = -999, my = -999, lastMove = 0, last = 0, running = false;

  function resize() {
    var d = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function pickHue() {
    return MODE === 'theme' ? THEME[Math.random() * THEME.length | 0] + (Math.random() - 0.5) * 16 : hue + Math.random() * 50;
  }
  function burst(x, y, n) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.2832, s = (Math.random() * 3 + 0.5) * 0.06;   // px per ms
      parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, r: Math.random() * 3 + 1, h: pickHue() });
    }
    if (parts.length > MAX) parts.splice(0, parts.length - MAX);
  }
  function start() { if (!running && !document.hidden) { running = true; last = performance.now(); requestAnimationFrame(frame); } }
  function frame(now) {
    if (!running) return;
    var dt = Math.min(now - last, 50), k = dt / 16.67, fr = Math.pow(0.98, k); last = now;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    if (mx > -900 && now - lastMove < 1500) {
      var c = MODE === 'theme' ? 275 : hue, g = ctx.createRadialGradient(mx, my, 0, mx, my, 130);
      g.addColorStop(0, 'hsla(' + c + ',100%,65%,0.3)'); g.addColorStop(1, 'hsla(' + c + ',100%,65%,0)');
      ctx.fillStyle = g; ctx.fillRect(mx - 130, my - 130, 260, 260);
    }
    for (var i = parts.length - 1; i >= 0; i--) {
      var q = parts[i];
      q.x += q.vx * dt; q.y += q.vy * dt; q.vx *= fr; q.vy *= fr; q.l -= 0.012 * k;
      if (q.l <= 0) { parts.splice(i, 1); continue; }
      ctx.fillStyle = 'hsla(' + q.h + ',100%,65%,' + q.l * 0.18 + ')'; ctx.beginPath(); ctx.arc(q.x, q.y, q.r * 3.5, 0, 6.2832); ctx.fill();
      ctx.fillStyle = 'hsla(' + q.h + ',100%,70%,' + q.l + ')'; ctx.beginPath(); ctx.arc(q.x, q.y, q.r * q.l + 0.3, 0, 6.2832); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    if (!parts.length && now - lastMove > 1500) { ctx.clearRect(0, 0, W, H); running = false; return; }   // idle: stop
    requestAnimationFrame(frame);
  }

  resize();
  addEventListener('resize', resize, { passive: true });
  addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; lastMove = performance.now(); burst(mx, my, 8); hue = (hue + 2) % 360; start(); }, { passive: true });
  addEventListener('mousedown', function (e) { lastMove = performance.now(); burst(e.clientX, e.clientY, 90); start(); }, { passive: true });
  // Touch (phones/tablets): the same glow follows the finger
  function touchAt(t, n) { mx = t.clientX; my = t.clientY; lastMove = performance.now(); burst(mx, my, n); hue = (hue + 2) % 360; start(); }
  addEventListener('touchstart', function (e) { if (e.touches[0]) touchAt(e.touches[0], 30); }, { passive: true });
  addEventListener('touchmove', function (e) { if (e.touches[0]) touchAt(e.touches[0], 6); }, { passive: true });
  addEventListener('touchend', function () { mx = my = -999; }, { passive: true });
  document.addEventListener('mouseleave', function () { mx = my = -999; });
  document.addEventListener('visibilitychange', function () { if (document.hidden) running = false; else if (parts.length) start(); });
})();
