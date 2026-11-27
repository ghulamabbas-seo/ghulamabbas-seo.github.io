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

/* Cursor particle effect (glowing particles + click burst) */
!function(){"use strict";var e=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,t=window.matchMedia&&window.matchMedia("(hover: none), (pointer: coarse)").matches;if(!e&&!t){var n=["168,85,247","192,132,252","240,171,252","247,198,90","245,179,200"],i=document.createElement("canvas");i.setAttribute("aria-hidden","true"),i.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;",document.body.appendChild(i);var a=i.getContext("2d"),o=1,r=0,d=0;g(),window.addEventListener("resize",g,{passive:!0});var c=[],l=-999,s=-999,h=-999,v=-999,m=0,f=!1,u=0,w=0;window.addEventListener("mousemove",function(e){var t=e.clientX-l,n=e.clientY-s;l=e.clientX,s=e.clientY,h<-900&&(h=l,v=s),w=performance.now();var i=Math.min(Math.sqrt(t*t+n*n),60);p(l,s,2+i/14|0,.09,2.4),M()},{passive:!0}),window.addEventListener("mousedown",function(e){p(e.clientX,e.clientY,45,.32,3),M()},{passive:!0}),document.addEventListener("mouseleave",function(){l=s=-999}),document.addEventListener("visibilitychange",function(){document.hidden?f=!1:c.length&&M()})}function g(){o=Math.min(window.devicePixelRatio||1,2),r=window.innerWidth,d=window.innerHeight,i.width=r*o,i.height=d*o,a.setTransform(o,0,0,o,0,0)}function p(e,t,i,a,o){for(var r=0;r<i;r++){c.length>=220&&c.shift();var d=Math.random()*Math.PI*2,l=a*(.4+.8*Math.random());c.push({x:e,y:t,vx:Math.cos(d)*l,vy:Math.sin(d)*l,r:o*(.6+.7*Math.random()),c:n[Math.random()*n.length|0],t:0,life:1e3*(.7+.4*Math.random())})}}function M(){f||document.hidden||(f=!0,u=performance.now(),requestAnimationFrame(y))}function y(e){if(f){var t=Math.min(e-u,50);if(u=e,a.clearRect(0,0,r,d),a.globalCompositeOperation="lighter",l>-900&&(h+=.18*(l-h),v+=.18*(s-v)),(m+=.08*((l>-900&&e-w<1500?1:0)-m))>.01){var n=a.createRadialGradient(h,v,0,h,v,130);n.addColorStop(0,"rgba(168,85,247,"+.28*m+")"),n.addColorStop(.5,"rgba(124,58,237,"+.11*m+")"),n.addColorStop(1,"rgba(124,58,237,0)"),a.fillStyle=n,a.fillRect(h-130,v-130,260,260)}for(var i=c.length-1;i>=0;i--){var o=c[i];if(o.t+=t,o.t>=o.life)c.splice(i,1);else{o.x+=o.vx*t,o.y+=o.vy*t,o.vx*=.985,o.vy*=.985;var g=1-o.t/o.life,p=o.r*(.5+.5*g);a.fillStyle="rgba("+o.c+","+.22*g+")",a.beginPath(),a.arc(o.x,o.y,3.5*p,0,6.2832),a.fill(),a.fillStyle="rgba("+o.c+","+.95*g+")",a.beginPath(),a.arc(o.x,o.y,p,0,6.2832),a.fill()}}if(a.globalCompositeOperation="source-over",!c.length&&m<.01)return a.clearRect(0,0,r,d),void(f=!1);requestAnimationFrame(y)}}}();
