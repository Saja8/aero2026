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
  const externalSiteLinks = {
    registration: 'mailto:contacto@enmice.mx?subject=Registro%20Foro%20ENMICE%202026',
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

      window.location.href = `mailto:contacto@enmice.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  initContactEmailForm();

  /**
   * Add a lightweight decorative space field to each visible section.
   */
  function initSpaceField() {
    const iconNames = [
      'bi-rocket-takeoff',
      'bi-broadcast-pin',
      'bi-moon-stars',
      'bi-globe2',
      'bi-stars',
      'bi-rocket',
      'bi-broadcast',
      'bi-moon-fill',
      'bi-globe-americas',
      'bi-person-arms-up'
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

    const objectCount = window.matchMedia('(max-width: 576px)').matches ? 14 : 28;
    const horizontalLanes = [3, 96, 8, 91, 14, 86, 20, 80];
    for (let objectIndex = 0; objectIndex < objectCount; objectIndex += 1) {
      const object = document.createElement('span');
      const colorIndex = (objectIndex % 6) + 1;
      const iconIndex = (objectIndex * 3 + 2) % iconNames.length;
      const isAstronaut = iconNames[iconIndex] === 'bi-person-arms-up';
      const motionClass = objectIndex % 5 === 0 ? 'space-floater' : 'space-faller';
      object.className = `space-object ${motionClass} space-color-${colorIndex}${isAstronaut ? ' space-astronaut' : ''}`;
      object.style.left = `${horizontalLanes[objectIndex % horizontalLanes.length]}%`;
      object.style.top = `${1 + (objectIndex / objectCount) * 94}%`;
      object.style.setProperty('--space-size', `${0.78 + (objectIndex % 5) * 0.16}rem`);
      object.style.setProperty('--space-depth', String(3 + (objectIndex % 8)));
      object.style.setProperty('--space-delay', `${-(objectIndex * 2.3)}s`);
      object.style.setProperty('--space-duration', `${22 + (objectIndex % 8) * 2}s`);
      object.style.setProperty('--space-sway', `${objectIndex % 2 ? 28 : -28}px`);

      const icon = document.createElement('i');
      icon.className = `bi ${iconNames[iconIndex]}`;
      object.appendChild(icon);
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
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
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
    if (document.documentElement.classList.contains('no-js') || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 992) {
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
