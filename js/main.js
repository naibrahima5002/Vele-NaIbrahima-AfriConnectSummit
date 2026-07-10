document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. DARK / LIGHT MODE --- */
  const themeToggleBtn = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      
      if (theme === 'dark') {
        theme = 'light';
        document.documentElement.removeAttribute('data-theme');
      } else {
        theme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  /* --- 2. NAVBAR DYNAMIQUE & HAMBURGER --- */
  const header = document.querySelector('.header');
  const menuHamburger = document.querySelector('.menu-hamburger');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (menuHamburger && navMenu) {
    menuHamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuHamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuHamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

});

/* --- 3. ANIMATIONS AU SCROLL (INTERSECTION OBSERVER) --- */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
  }


  /* --- 4. ONGLETS DU PROGRAMME --- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = document.getElementById(targetTab);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  }