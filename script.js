(() => {
  const body = document.body;
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progress');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const charSearch = document.getElementById('characterSearch');
  const charCards = [...document.querySelectorAll('.character-card')];
  const charEmpty = document.getElementById('characterEmpty');
  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const locationCards = [...document.querySelectorAll('.location-card')];
  const modal = document.getElementById('detailModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalTag = document.getElementById('modalTag');
  const closeButton = document.querySelector('.modal-close');
  let lastFocused = null;

  const finishLoading = () => loader?.classList.add('done');
  if (document.readyState === 'complete') finishLoading();
  else window.addEventListener('load', finishLoading, { once: true });
  window.setTimeout(finishLoading, 1900);

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  }));

  charSearch?.addEventListener('input', () => {
    const q = charSearch.value.trim().toLowerCase();
    let visible = 0;
    charCards.forEach(card => {
      const show = (card.dataset.search || '').includes(q);
      card.hidden = !show;
      if (show) visible++;
    });
    charEmpty.hidden = visible !== 0;
  });

  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    locationCards.forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  }));

  function openModal(item) {
    lastFocused = document.activeElement;
    modalTitle.textContent = item.dataset.title || 'Billo Story';
    modalDescription.textContent = item.dataset.desc || 'Every great story begins somewhere.';
    modalTag.textContent = item.dataset.tag || 'BILLO STORY UNIVERSE';
    modalImage.src = item.dataset.image || 'assets/Billo.jpg';
    modalImage.alt = item.dataset.title || 'Billo Story';
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = 'assets/Billo.jpg';
    };
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    closeButton.focus();
  }
  function closeModal() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    if (lastFocused?.focus) lastFocused.focus();
  }
  document.querySelectorAll('[data-open="true"]').forEach(item => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && item.tagName !== 'BUTTON') {
        event.preventDefault(); openModal(item);
      }
    });
  });
  closeButton?.addEventListener('click', closeModal);
  document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModal();
      nav?.classList.remove('open');
      menuButton?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
    if (event.key === 'Tab' && modal.classList.contains('open')) {
      event.preventDefault(); closeButton.focus();
    }
  });

  const revealNodes = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
    revealNodes.forEach(node => observer.observe(node));
  } else revealNodes.forEach(node => node.classList.add('visible'));

  document.querySelectorAll('img').forEach(image => image.addEventListener('error', () => {
    image.classList.add('image-unavailable');
    if (image.id !== 'modalImage' && image.getAttribute('src') !== 'assets/Billo.jpg') {
      image.alt = image.alt || 'Image not available';
    }
  }, { once: true }));
})();
