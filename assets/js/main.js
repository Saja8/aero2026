/**
* Template Name: Eventix
* Template URL: https://bootstrapmade.com/eventix-bootstrap-events-website-template/
* Updated: Sep 06 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  const themeStorageKey = 'congreso-aeroespacial-theme';
  const rootElement = document.documentElement;
  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  rootElement.classList.remove('no-js');
  const externalSiteLinks = {
    registration: 'https://luma.com/0yqjs3uo',
    submission: 'mailto:contacto@enmice.mx?subject=Proyecto%20para%20Foro%20ENMICE%202026'
  };

  function readStoredTheme() {
    try {
      return localStorage.getItem(themeStorageKey);
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      // Ignore storage failures and keep the current session theme.
    }
  }

  function getPreferredTheme() {
    const storedTheme = readStoredTheme();
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    return systemThemeQuery.matches ? 'dark' : 'light';
  }

  function updateThemeToggle(toggleButton) {
    const theme = rootElement.getAttribute('data-theme') || 'light';
    const isDark = theme === 'dark';
    toggleButton.setAttribute('aria-pressed', String(isDark));
    toggleButton.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    toggleButton.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    toggleButton.innerHTML = `<i class="bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}"></i>`;
  }

  function applyTheme(theme, persistTheme = false) {
    rootElement.setAttribute('data-theme', theme);
    if (persistTheme) {
      writeStoredTheme(theme);
    }
    document.querySelectorAll('.theme-toggle').forEach(updateThemeToggle);
  }

  function initThemeToggle() {
    if (!document.body) return;

    let themeToggle = document.querySelector('.theme-toggle');

    if (!themeToggle) {
      themeToggle = document.createElement('button');
      themeToggle.type = 'button';
      themeToggle.className = 'theme-toggle';
      document.body.appendChild(themeToggle);
    }

    applyTheme(getPreferredTheme());

    themeToggle.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'light';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
    });

    if (typeof systemThemeQuery.addEventListener === 'function') {
      systemThemeQuery.addEventListener('change', (event) => {
        if (!readStoredTheme()) {
          applyTheme(event.matches ? 'dark' : 'light');
        }
      });
    }
  }

  initThemeToggle();

  function initExternalLinks() {
    document.querySelectorAll('[data-external-link]').forEach((linkElement) => {
      const linkKey = linkElement.getAttribute('data-external-link');
      const linkUrl = externalSiteLinks[linkKey];

      if (!linkUrl) return;

      linkElement.setAttribute('href', linkUrl);
      if (linkUrl.startsWith('http')) {
        linkElement.setAttribute('target', '_blank');
        linkElement.setAttribute('rel', 'noopener noreferrer');
      } else {
        linkElement.removeAttribute('target');
        linkElement.removeAttribute('rel');
      }
    });
  }

  initExternalLinks();

  function initContactEmailForm() {
    const contactForm = document.querySelector('#contact-email-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const subject = String(formData.get('subject') || 'Consulta Foro ENMICE 2026').trim();
      const message = String(formData.get('message') || '').trim();
      const body = [
        message,
        '',
        `Nombre: ${name}`,
        `Correo de contacto: ${email}`
      ].join('\n');

      const mailtoHref = `mailto:contacto@enmice.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.__lastMailtoHref = mailtoHref;
      window.location.href = mailtoHref;
    });
  }

  initContactEmailForm();

  function initScheduleDetails() {
    const sessionCards = document.querySelectorAll('.schedule .session-card');
    if (!sessionCards.length || typeof bootstrap === 'undefined') return;

    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade schedule-detail-modal';
    modalElement.id = 'scheduleDetailModal';
    modalElement.tabIndex = -1;
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <span class="modal-track"></span>
              <h5 class="modal-title"></h5>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <p class="modal-description"></p>
            <dl class="modal-meta"></dl>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modalElement);

    const modal = new bootstrap.Modal(modalElement);
    const titleElement = modalElement.querySelector('.modal-title');
    const trackElement = modalElement.querySelector('.modal-track');
    const descriptionElement = modalElement.querySelector('.modal-description');
    const metaElement = modalElement.querySelector('.modal-meta');

    sessionCards.forEach((card) => {
      if (card.querySelector('.schedule-detail-btn')) return;

      const title = card.querySelector('.session-title')?.textContent?.trim() || 'Actividad';
      const description = card.querySelector('.session-description')?.textContent?.trim() || 'Detalle por confirmar.';
      const track = card.querySelector('.track')?.textContent?.trim() || 'Programa';
      const room = card.querySelector('.room')?.textContent?.trim() || 'Sede por confirmar';
      const speaker = card.querySelector('.speaker-name')?.textContent?.trim() || 'Participantes por confirmar';
      const role = card.querySelector('.speaker-role')?.textContent?.trim() || '';
      const block = card.closest('.session-block');
      const start = block?.querySelector('.session-time .start')?.textContent?.trim() || '';
      const end = block?.querySelector('.session-time .end')?.textContent?.trim() || '';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'schedule-detail-btn';
      button.textContent = 'Ver detalle';
      button.addEventListener('click', () => {
        titleElement.textContent = title;
        trackElement.textContent = track;
        descriptionElement.textContent = description;
        metaElement.innerHTML = `
          <dt>Horario</dt><dd>${start}${end ? `–${end}` : ''}</dd>
          <dt>Espacio</dt><dd>${room}</dd>
          <dt>Participación</dt><dd>${speaker}${role ? `<br><small>${role}</small>` : ''}</dd>`;
        modal.show();
      });
      card.appendChild(button);
    });
  }

  initScheduleDetails();

  function initAnalyticsHooks() {
    window.enmiceAnalytics = {
      status: window.gtag ? 'connected' : 'waiting-for-tracking-id',
      track(eventName, parameters = {}) {
        if (window.gtag) {
          window.gtag('event', eventName, parameters);
        }
      }
    };

    window.enmiceAnalytics.track('page_view', {
      page_title: document.title,
      page_location: window.location.href
    });

    document.querySelectorAll('[data-external-link], a[download], .venue-actions a').forEach((link) => {
      link.addEventListener('click', () => {
        window.enmiceAnalytics.track('site_action', {
          label: link.textContent.trim(),
          href: link.getAttribute('href') || ''
        });
      });
    });
  }

  initAnalyticsHooks();

  /**
   * Add a lightweight decorative space field to each visible section.
   */
  function initSpaceField() {
    const vectorPictograms = {
      atom: `<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="32" rx="26" ry="10"/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-60 32 32)"/><circle class="space-vector-fill" cx="32" cy="32" r="5"/></svg>`,
      satellite: `<svg viewBox="0 0 64 64" aria-hidden="true"><g transform="rotate(-28 32 32)"><rect x="25" y="22" width="14" height="20" rx="3"/><rect x="2" y="23" width="18" height="18" rx="2"/><path d="M8 23v18M14 23v18M2 29h18M2 35h18M20 32h5M39 32h5"/><rect x="44" y="23" width="18" height="18" rx="2"/><path d="M50 23v18M56 23v18M44 29h18M44 35h18M32 22V12M32 12l8-6M32 12l-8-6"/><circle class="space-vector-fill" cx="32" cy="32" r="4"/></g></svg>`,
      planet: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="space-vector-fill-soft" cx="32" cy="32" r="17"/><ellipse cx="32" cy="32" rx="29" ry="10" transform="rotate(-12 32 32)"/><circle class="space-vector-fill" cx="26" cy="27" r="2.5"/><circle class="space-vector-fill" cx="38" cy="37" r="3.5"/></svg>`,
      molecule: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 18l19 13 18-15M32 31l7 20M13 18L8 45M50 16l7 27"/><circle class="space-vector-fill-soft" cx="13" cy="18" r="7"/><circle class="space-vector-fill" cx="32" cy="31" r="9"/><circle class="space-vector-fill-soft" cx="50" cy="16" r="6"/><circle class="space-vector-fill" cx="8" cy="45" r="5"/><circle class="space-vector-fill-soft" cx="39" cy="51" r="6"/><circle class="space-vector-fill" cx="57" cy="43" r="4"/></svg>`,
      dna: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 5c30 14 0 40 30 54M47 5C17 19 47 45 17 59M22 13h20M17 24h30M17 40h30M22 51h20"/></svg>`
    };
    const pictograms = [
      { icon: 'bi-rocket-takeoff-fill' },
      { vector: 'atom' },
      { vector: 'satellite' },
      { icon: 'bi-flask-fill' },
      { vector: 'planet' },
      { vector: 'molecule' },
      { icon: 'bi-moon-stars-fill' },
      { vector: 'dna' },
      { icon: 'bi-beaker-fill' },
      { icon: 'bi-stars' },
      { icon: 'bi-person-arms-up', astronaut: true },
      { icon: 'bi-globe2' },
      { icon: 'bi-bezier2' },
      { icon: 'bi-rocket-takeoff' }
    ];
    const main = document.querySelector('main');
    const hero = document.querySelector('#hero');
    if (!main) return;

    main.classList.add('space-main');
    const field = document.createElement('div');
    field.className = 'page-space-field';
    field.setAttribute('aria-hidden', 'true');
    field.style.top = hero ? `${hero.offsetHeight}px` : '0';
    field.dataset.depth = '2';

    const isPhone = window.matchMedia('(max-width: 576px)').matches;
    const objectCount = isPhone ? 30 : 50;
    const horizontalLanes = isPhone
      ? [-8, 108, -5, 105, -2, 102, -10, 110, -4, 104]
      : [14, 85, 21, 78, 27, 73, 8, 90, 3, 95];
    for (let objectIndex = 0; objectIndex < objectCount; objectIndex += 1) {
      const object = document.createElement('span');
      const colorIndex = (objectIndex % 6) + 1;
      const pictogram = pictograms[(objectIndex * 5 + 2) % pictograms.length];
      const motionClass = objectIndex % 4 === 0 ? 'space-floater' : 'space-faller';
      const vectorClass = pictogram.vector ? ' space-vector-object' : '';
      const orbitClass = objectIndex % 3 === 0 ? ' space-orbit' : '';
      object.className = `space-object ${motionClass} space-color-${colorIndex}${pictogram.astronaut ? ' space-astronaut' : ''}${vectorClass}${orbitClass}`;
      object.style.left = `${horizontalLanes[objectIndex % horizontalLanes.length]}%`;
      object.style.top = `${0.5 + (objectIndex / objectCount) * 96}%`;
      object.style.setProperty('--space-size', `${isPhone ? 1.14 + (objectIndex % 5) * 0.19 : 1.35 + (objectIndex % 6) * 0.23}rem`);
      object.style.setProperty('--space-depth', String(3 + (objectIndex % 8)));
      object.style.setProperty('--space-delay', `${-(objectIndex * 1.9)}s`);
      object.style.setProperty('--space-duration', `${17 + (objectIndex % 8) * 2.3}s`);
      object.style.setProperty('--space-sway', `${objectIndex % 2 ? 38 + (objectIndex % 4) * 9 : -38 - (objectIndex % 4) * 9}px`);
      object.style.setProperty('--space-travel', `${360 + (objectIndex % 6) * 55}px`);

      const glyph = document.createElement('span');
      glyph.className = 'space-glyph';
      if (pictogram.vector) {
        glyph.innerHTML = vectorPictograms[pictogram.vector];
      } else {
        const icon = document.createElement('i');
        icon.className = `bi ${pictogram.icon}`;
        glyph.appendChild(icon);
      }
      object.appendChild(glyph);
      field.appendChild(object);
    }
    main.prepend(field);

    const heroLayer = document.querySelector('.hero .space-ornaments');
    if (heroLayer) {
      heroLayer.classList.add('interactive-space-layer');
      heroLayer.dataset.depth = '3';
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    if (reducedMotion.matches || !finePointer.matches) return;

    const layers = Array.from(document.querySelectorAll('.page-space-field, .interactive-space-layer'));
    const objects = Array.from(document.querySelectorAll('.page-space-field .space-object'));
    let pointerX = 0;
    let pointerY = 0;
    let framePending = false;

    function updateParallax() {
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 2);
        layer.style.setProperty('--field-x', `${pointerX * depth}px`);
        layer.style.setProperty('--field-y', `${pointerY * depth}px`);
      });
      objects.forEach((object) => {
        const depth = Number(object.style.getPropertyValue('--space-depth') || 5);
        object.style.setProperty('--mouse-x', `${pointerX * depth}px`);
        object.style.setProperty('--mouse-y', `${pointerY * depth}px`);
      });
      framePending = false;
    }

    window.addEventListener('pointermove', (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.9;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.7;
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
  }

  initSpaceField();

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    if (!mobileNavToggleBtn) return;
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      mobileNavToogle();
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    const disableAos = window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 992 || typeof AOS === 'undefined';
    rootElement.classList.toggle('aos-disabled', disableAos);

    if (disableAos) {
      return;
    }

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Countdown timer
   */
  function updateCountDown(countDownItem) {
    const timeleft = new Date(countDownItem.getAttribute('data-count')).getTime() - new Date().getTime();

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    const daysElement = countDownItem.querySelector('.count-days');
    const hoursElement = countDownItem.querySelector('.count-hours');
    const minutesElement = countDownItem.querySelector('.count-minutes');
    const secondsElement = countDownItem.querySelector('.count-seconds');

    if (daysElement) daysElement.innerHTML = days;
    if (hoursElement) hoursElement.innerHTML = hours;
    if (minutesElement) minutesElement.innerHTML = minutes;
    if (secondsElement) secondsElement.innerHTML = seconds;

  }

  document.querySelectorAll('.countdown').forEach(function(countDownItem) {
    updateCountDown(countDownItem);
    setInterval(function() {
      updateCountDown(countDownItem);
    }, 1000);
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /*
   * Pricing Toggle
   */

  const pricingContainers = document.querySelectorAll('.pricing-toggle-container');

  pricingContainers.forEach(function(container) {
    const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
    const monthlyText = container.querySelector('.monthly');
    const yearlyText = container.querySelector('.yearly');

    pricingSwitch.addEventListener('change', function() {
      const pricingItems = container.querySelectorAll('.pricing-item');

      if (this.checked) {
        monthlyText.classList.remove('active');
        yearlyText.classList.add('active');
        pricingItems.forEach(item => {
          item.classList.add('yearly-active');
        });
      } else {
        monthlyText.classList.add('active');
        yearlyText.classList.remove('active');
        pricingItems.forEach(item => {
          item.classList.remove('yearly-active');
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
