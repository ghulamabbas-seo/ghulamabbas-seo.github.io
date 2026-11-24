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
