// JS enhancements for site: active nav, form confirmation, review stars

document.addEventListener('DOMContentLoaded', function () {
  // Active nav link based on path
  const links = document.querySelectorAll('.nav-link');
  const path = window.location.pathname.split('/').pop();
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href === 'index.html' && (path === '' || path === 'index.html')) ) {
      a.classList.add('active');
    }
  });

  // Simple form handler: show confirmation and reset
  const forms = document.querySelectorAll('form[action^="mailto:"]');
  forms.forEach(f => {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = f.querySelector('input[name="name"]')?.value || '';
      const text = `Thanks ${name || 'customer'} — your message was sent.`;

      // ensure single toast element
      let toast = document.getElementById('form-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'form-toast';
        toast.className = 'toast success';
        toast.setAttribute('role','status');
        toast.setAttribute('aria-live','polite');
        const msg = document.createElement('div'); msg.className = 'msg'; toast.appendChild(msg);
        const btn = document.createElement('button'); btn.className = 'close'; btn.innerHTML = '&times;'; btn.setAttribute('aria-label','Dismiss');
        btn.addEventListener('click', () => { toast.classList.remove('show'); setTimeout(()=>toast.remove(),240); });
        toast.appendChild(btn);
        document.body.appendChild(toast);
      }
      toast.querySelector('.msg').textContent = text;
      // show
      requestAnimationFrame(() => toast.classList.add('show'));
      // reset form
      f.reset();
      // auto-hide after 5s
      clearTimeout(toast._hideTimeout);
      toast._hideTimeout = setTimeout(() => { toast.classList.remove('show'); setTimeout(()=>toast.remove(),240); }, 5000);
    });
  });

  // Render stars for review items if empty
  document.querySelectorAll('.review-item').forEach(item => {
    const rating = parseInt(item.dataset.rating || '0', 10);
    const container = item.querySelector('.stars');
    if (container) {
      container.textContent = '★'.repeat(rating) + '☆'.repeat(Math.max(0,5-rating));
    }
  });

  // Optional: header effect on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) header.style.boxShadow = '0 8px 30px rgba(7,20,39,0.35)';
      else header.style.boxShadow = '';
    });
  }
});
