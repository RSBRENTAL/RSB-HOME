(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const header = $('.site-header');
  let scrollTicking = false;
  const updateHeaderOnScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  const onScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      updateHeaderOnScroll();
      scrollTicking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeaderOnScroll();

  const menuBtn = $('#mobileMenuBtn');
  const mobileMenu = $('#mobileMenu');
  const setMenu = (open) => {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    const iconOpen = $('#iconMenu');
    const iconClose = $('#iconClose');
    if (iconOpen && iconClose) {
      iconOpen.style.display = open ? 'none' : 'block';
      iconClose.style.display = open ? 'block' : 'none';
    }
  };
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu?.classList.contains('open');
      setMenu(!isOpen);
    });
  }
  $$('.m-link').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  const dropdown = $('#langDropdown');
  const trigger = $('#langTrigger');
  const toggleDropdown = (open) => {
    if (!dropdown) return;
    dropdown.classList.toggle('open', open);
    if (trigger) trigger.setAttribute('aria-expanded', String(open));
  };
  if (trigger && dropdown) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(!dropdown.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) toggleDropdown(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleDropdown(false);
    });
  }

  const mobileDropdown = $('#langDropdownMobile');
  const mobileTrigger = $('#langTriggerMobile');
  const toggleMobileDropdown = (open) => {
    if (!mobileDropdown) return;
    mobileDropdown.classList.toggle('open', open);
    if (mobileTrigger) mobileTrigger.setAttribute('aria-expanded', String(open));
  };
  if (mobileTrigger && mobileDropdown) {
    mobileTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileDropdown(!mobileDropdown.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.contains(e.target)) toggleMobileDropdown(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMobileDropdown(false);
    });
  }

  $$('.faq-item').forEach((item) => {
    const btn = $('.faq-q', item);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach((i) => {
        i.classList.remove('open');
        const openButton = $('.faq-q', i);
        if (openButton) openButton.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  const translations = {
    en: {
      morningLabel: 'Daily morning',
      afternoonLabel: 'Daily afternoon',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona is open every day from ${morning} and ${afternoon}.`,
    },
    es: {
      morningLabel: 'Mañana diaria',
      afternoonLabel: 'Tarde diaria',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona abre todos los días de ${morning} y de ${afternoon}.`,
    },
    fr: {
      morningLabel: 'Matin quotidien',
      afternoonLabel: 'Après-midi quotidien',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona est ouvert tous les jours de ${morning} et de ${afternoon}.`,
    },
    it: {
      morningLabel: 'Mattina tutti i giorni',
      afternoonLabel: 'Pomeriggio tutti i giorni',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona è aperta tutti i giorni dalle ${morning} e dalle ${afternoon}.`,
    },
    de: {
      morningLabel: 'Täglich vormittags',
      afternoonLabel: 'Täglich nachmittags',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona ist täglich von ${morning} und von ${afternoon} geöffnet.`,
    },
    nl: {
      morningLabel: 'Dagelijks ochtend',
      afternoonLabel: 'Dagelijks middag',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona is elke dag geopend van ${morning} en van ${afternoon}.`,
    },
    ca: {
      morningLabel: 'Matí diari',
      afternoonLabel: 'Tarda diària',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona obre cada dia de ${morning} i de ${afternoon}.`,
    },
    pt: {
      morningLabel: 'Manhã diária',
      afternoonLabel: 'Tarde diária',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona abre todos os dias das ${morning} e das ${afternoon}.`,
    },
    sv: {
      morningLabel: 'Dagligen morgon',
      afternoonLabel: 'Dagligen eftermiddag',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona är öppet varje dag ${morning} och ${afternoon}.`,
    },
    pl: {
      morningLabel: 'Codziennie rano',
      afternoonLabel: 'Codziennie po południu',
      practicalSentence: (morning, afternoon) => `RSB Rental Scooter Barcelona jest otwarte codziennie od ${morning} i od ${afternoon}.`,
    },
  };

  const normalizeLang = () => {
    const raw = (document.documentElement.lang || 'en').toLowerCase();
    const base = raw.split('-')[0];
    if (base === 'cat') return 'ca';
    return translations[base] ? base : 'en';
  };

  const formatTime = (value, fallback) => {
    if (!value || typeof value !== 'string') return fallback;
    return value.replace(/\s+/g, '').replace(/-/g, '–');
  };

  const setStrongHours = (el, prefix, hours) => {
    if (!el) return;
    el.innerHTML = `<strong>${prefix}</strong>: ${hours}`;
  };

  const setPlainHours = (el, prefix, hours) => {
    if (!el) return;
    el.textContent = `${prefix}: ${hours}`;
  };

  const updatePracticalText = (el, sentence) => {
    if (!el) return;
    const html = el.innerHTML;
    const breakPattern = /<br\s*\/?>\s*<br\s*\/?>/i;
    if (breakPattern.test(html)) {
      const parts = html.split(breakPattern);
      if (parts.length > 1) {
        el.innerHTML = `${sentence}<br><br>${parts.slice(1).join('<br><br>')}`;
        return;
      }
    }

    const blankLinePattern = /\n\s*\n/;
    if (blankLinePattern.test(html)) {
      const parts = html.split(blankLinePattern);
      if (parts.length > 1) {
        el.innerHTML = `${sentence}\n\n${parts.slice(1).join('\n\n')}`;
        return;
      }
    }

    el.textContent = sentence;
  };

  const replaceOpeningHoursSpec = (node, spec) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((item) => replaceOpeningHoursSpec(item, spec));
      return;
    }
    Object.keys(node).forEach((key) => {
      if (key === 'openingHoursSpecification' && Array.isArray(node[key])) {
        node[key] = spec;
      } else {
        replaceOpeningHoursSpec(node[key], spec);
      }
    });
  };

  const updateJsonLdHours = (spec) => {
    $$('script[type="application/ld+json"]').forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        replaceOpeningHoursSpec(data, spec);
        script.textContent = JSON.stringify(data);
      } catch (error) {
        // Ignore invalid or non-JSON-LD blocks.
      }
    });
  };

  const defaultOpeningHoursSpecification = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:30',
      closes: '13:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '16:30',
      closes: '20:00',
    },
  ];

  const normalizeHoursPayload = (data) => {
    if (!data || typeof data !== 'object') return null;

    const morning = typeof data.morning === 'string' ? data.morning : '10:30–13:30';
    const afternoon = typeof data.afternoon === 'string' ? data.afternoon : '16:30–20:00';

    return {
      ...data,
      morning,
      afternoon,
      openingHoursSpecification: Array.isArray(data.openingHoursSpecification)
        ? data.openingHoursSpecification
        : defaultOpeningHoursSpecification,
    };
  };

  const fetchHours = async () => {
    try {
      const res = await fetch('/api/hours.php', { cache: 'no-store' });
      if (!res.ok) return null;
      return normalizeHoursPayload(await res.json());
    } catch (error) {
      // Keep the static hours already present in the HTML.
    }

    return null;
  };

  const renderHours = async () => {
    const lang = normalizeLang();
    const copy = translations[lang];
    const data = await fetchHours();
    if (!data) return;

    const morning = formatTime(data?.morning, '10:30–13:30');
    const afternoon = formatTime(data?.afternoon, '16:30–20:00');
    const morningLabel = copy.morningLabel;
    const afternoonLabel = copy.afternoonLabel;
    const sentence = copy.practicalSentence(morning, afternoon);

    setPlainHours($('#rsbHoursContactPrimary'), morningLabel, morning);
    setStrongHours($('#rsbHoursContactSecondary'), afternoonLabel, afternoon);
    setPlainHours($('#rsbHoursFooterPrimary'), morningLabel, morning);
    setStrongHours($('#rsbHoursFooterSecondary'), afternoonLabel, afternoon);
    updatePracticalText($('#rsbHoursPracticalText'), sentence);

    $$('[data-rsb-hours="weekday-line-html"]').forEach((el) => setStrongHours(el, morningLabel, morning));
    $$('[data-rsb-hours="weekend-line-html"]').forEach((el) => setStrongHours(el, afternoonLabel, afternoon));
    $$('[data-rsb-hours="weekday-line"]').forEach((el) => setPlainHours(el, morningLabel, morning));
    $$('[data-rsb-hours="weekend-line"]').forEach((el) => setPlainHours(el, afternoonLabel, afternoon));
    $$('[data-rsb-hours="sentence"]').forEach((el) => updatePracticalText(el, sentence));

    if (Array.isArray(data?.openingHoursSpecification)) {
      updateJsonLdHours(data.openingHoursSpecification);
    }
  };

  const scheduleHours = () => {
    const run = () => renderHours();
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 2500 });
    } else {
      window.setTimeout(run, 1200);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleHours);
  } else {
    scheduleHours();
  }

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
