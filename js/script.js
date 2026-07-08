// ---------- Load content from content.json and populate the page ----------
async function loadContent() {
  try {
    const res = await fetch('content/content.json', { cache: 'no-store' });
    const data = await res.json();
// Logo: if an image is set, show it and hide the text version
    const logoImg = document.getElementById('logoImg');
    const logoText = document.getElementById('logoText');
    if (logoImg && data.logo) {
      logoImg.src = data.logo;
      logoImg.style.display = 'block';
      if (logoText) logoText.style.display = 'none';
    }

    // Simple text/href fields marked with data-field="path.to.value"
    document.querySelectorAll('[data-field]').forEach(el => {
      const path = el.getAttribute('data-field').split('.');
      let value = data;
      for (const key of path) value = value?.[key];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-field-href]').forEach(el => {
      const path = el.getAttribute('data-field-href').split('.');
      let value = data;
      for (const key of path) value = value?.[key];
      if (value !== undefined) el.setAttribute('href', value);
    });

    // About stats
    const statsList = document.getElementById('statsList');
    if (statsList && data.about?.stats) {
      statsList.innerHTML = data.about.stats.map(s => `
        <div class="stat">
          <span class="stat-number">${escapeHtml(s.number)}</span>
          <span class="stat-label">${escapeHtml(s.label)}</span>
        </div>
      `).join('');
    }

    // Process steps
    const processList = document.getElementById('processList');
    if (processList && data.process) {
      processList.innerHTML = data.process.map(p => `
        <li>
          <h3>${escapeHtml(p.step)}</h3>
          <p>${escapeHtml(p.description)}</p>
        </li>
      `).join('');
    }

    // Services
  const servicesList = document.getElementById('servicesList');
if (servicesList && data.services) {
  servicesList.innerHTML = data.services.map(s => `
    <div class="service-card">
      ${s.image ? `<img class="service-image" src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy">` : ''}
      <div class="service-card-body">
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.description)}</p>
      </div>
    </div>
  `).join('');
}

    // Testimonials
    const testimonialList = document.getElementById('testimonialList');
    if (testimonialList && data.testimonials) {
      testimonialList.innerHTML = data.testimonials.map(t => `
        <div class="testimonial-card">
          <p class="quote">"${escapeHtml(t.quote)}"</p>
          <p class="author">${escapeHtml(t.author)}</p>
        </div>
      `).join('');
    }

    // Contact details
    const contactDetails = document.getElementById('contactDetails');
    if (contactDetails && data.contact) {
      const items = [];
      if (data.contact.email) items.push(`<li>Email: <a href="mailto:${data.contact.email}">${escapeHtml(data.contact.email)}</a></li>`);
      if (data.contact.phone) items.push(`<li>Phone: ${escapeHtml(data.contact.phone)}</li>`);
      if (data.contact.address) items.push(`<li>${escapeHtml(data.contact.address)}</li>`);
      contactDetails.innerHTML = items.join('');
    }

    markSectionsForReveal();
  } catch (err) {
    console.error('Could not load content.json', err);
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// ---------- Mobile nav toggle ----------
function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Scroll reveal ----------
function markSectionsForReveal() {
  document.querySelectorAll('.section, .hero-inner').forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---------- Contact form (Netlify Forms, with a confirmation alert) ----------
function setupForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the browser's default page-navigation submit

    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then((response) => {
        if (response.ok) {
          alert('Message submitted! We will get back to you soon.');
          form.reset();
    } else {
      alert('Netlify rejected the submission (status ' + response.status + '). Please tell your developer this exact number.');
    }
  })
  .catch((error) => {
    console.error('Form submission error:', error);
    alert('Something went wrong sending your message. Please try again, or email us directly.');
  });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  setupNavToggle();
  setupForm();
});
