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

  // Contact forms: GitHub Pages has no server, so the form opens WhatsApp or email with the message filled in.
  document.querySelectorAll('form.js-contact').forEach(form => {
    const msg = form.querySelector('.form-msg');
    const build = () => {
      const data = new FormData(form);
      const lines = ['Hi Ghulam, I found your website and would like to discuss SEO outreach.', ''];
      for (const [k, v] of data.entries()) {
        const val = String(v).trim();
        if (val) lines.push(k + ': ' + val);
      }
      return lines.join('\n');
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const via = (e.submitter && e.submitter.dataset.via) || 'whatsapp';
      const text = build();
      if (via === 'email') {
        const subject = 'SEO outreach enquiry from ' + (form.elements['Name'] ? form.elements['Name'].value : 'website');
        window.location.href = 'mailto:abbasseoagency@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
        if (msg) msg.textContent = 'Your email app should open with the message ready. If not, email abbasseoagency@gmail.com.';
      } else {
        window.open('https://wa.me/923407474614?text=' + encodeURIComponent(text), '_blank', 'noopener');
        if (msg) msg.textContent = 'WhatsApp is opening with your message ready to send.';
      }
    });
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}
