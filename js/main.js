document.getElementById('year').textContent = new Date().getFullYear();

// ── Scroll progress bar ──
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ── Back to top ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const threshold = (document.documentElement.scrollHeight - innerHeight) * 0.4;
  backToTop.classList.toggle('visible', scrollY > threshold);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Phone mask ──
document.getElementById('telefone').addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
  else if (v.length > 2) v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
  else if (v.length > 0) v = v.replace(/^(\d*)$/, '($1');
  this.value = v;
});

fetch('data/schema.json')
  .then(r => r.json())
  .then(data => {
    document.getElementById('json-ld-placeholder').textContent = JSON.stringify(data);
  });

const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navMobile');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  nav.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
    nav.setAttribute('aria-hidden', true);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = scrollY > 40 ? '0 2px 20px rgba(26,23,20,.1)' : '';
}, { passive: true });

// ── Animated counters ──
function animateCounter(el) {
  const target = +el.dataset.count;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  (function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  })(start);
}
const statBar = document.querySelector('.hero-stat-bar');
if (statBar) {
  const cObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      statBar.querySelectorAll('[data-count]').forEach(animateCounter);
      cObserver.disconnect();
    }
  }, { threshold: 0.5 });
  cObserver.observe(statBar);
}

// ── Testimonials carousel (mobile) ──
const depGrid = document.querySelector('.dep-grid');
const dots = document.querySelectorAll('.dep-dot');
if (depGrid && dots.length) {
  depGrid.addEventListener('scroll', () => {
    const idx = Math.round(depGrid.scrollLeft / depGrid.clientWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }, { passive: true });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      depGrid.scrollTo({ left: i * depGrid.clientWidth, behavior: 'smooth' });
    });
  });
}

// ── FAQ accordion ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

const submitBtn = document.getElementById('submitBtn');
const msg = document.getElementById('formMsg');
submitBtn.addEventListener('click', () => {
  const nome = document.getElementById('nome').value.trim();
  const tel = document.getElementById('telefone').value.trim();
  const esp = document.getElementById('especialidade').value;
  const telDigits = tel.replace(/\D/g, '');
  if (!nome || !tel || !esp) {
    msg.style.color = '#f4a261';
    msg.textContent = 'Por favor, preencha os campos obrigatórios.';
    return;
  }
  if (telDigits.length < 10 || telDigits.length > 11) {
    msg.style.color = '#f4a261';
    msg.textContent = 'Informe um telefone válido com DDD.';
    return;
  }
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  setTimeout(() => {
    msg.style.color = 'rgba(255,255,255,.85)';
    msg.textContent = '✓ Solicitação recebida! Entraremos em contato em breve.';
    submitBtn.textContent = 'Solicitação Enviada';

    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('especialidade').value = '';

    setTimeout(() => {
      msg.textContent = '';
      submitBtn.textContent = 'Solicitar Consulta';
      submitBtn.disabled = false;
    }, 3000);
  }, 1200);
});
