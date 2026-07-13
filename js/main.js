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

  /* --- 5. FILTRAGE DES INTERVENANTS --- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card');

  if (filterButtons.length > 0 && speakerCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        speakerCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }


  /* --- 6. VALIDATION DU FORMULAIRE DE CONTACT / INSCRIPTION --- */
  const registrationForm = document.getElementById('registration-form');

  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = registrationForm.querySelectorAll('input[required], select[required], textarea[required]');

      inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const errorMsg = formGroup ? formGroup.querySelector('.error-msg') : null;

        if (!input.value.trim()) {
          setError(formGroup, errorMsg, 'Ce champ est obligatoire.');
          isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          setError(formGroup, errorMsg, 'Veuillez entrer une adresse email valide.');
          isValid = false;
        } else if (input.id === 'message' && input.value.trim().length < 20) {
          setError(formGroup, errorMsg, 'Le message doit contenir au moins 20 caractères.');
          isValid = false;
        } else {
          setSuccess(formGroup, errorMsg);
        }
      });

      if (isValid) {
        const alertSuccess = document.getElementById('form-success-msg');
        if (alertSuccess) {
          alertSuccess.style.display = 'flex';
        }
        registrationForm.reset();

        setTimeout(() => {
          inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
              formGroup.classList.remove('valid');
            }
          });
        }, 3000);
      }
    });

    const requiredInputs = registrationForm.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
      input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        const errorMsg = formGroup ? formGroup.querySelector('.error-msg') : null;

        if (input.value.trim()) {
          if (input.type === 'email' && !validateEmail(input.value)) {
            setError(formGroup, errorMsg, 'Adresse email invalide.');
          } else if (input.id === 'message' && input.value.trim().length < 20) {
            setError(formGroup, errorMsg, 'Au moins 20 caractères requis.');
          } else {
            setSuccess(formGroup, errorMsg);
          }
        } else {
          setError(formGroup, errorMsg, 'Ce champ est obligatoire.');
        }
      });
    });
  }

  function setError(group, msgElement, text) {
    if (!group) return;
    group.classList.add('invalid');
    group.classList.remove('valid');
    if (msgElement) msgElement.textContent = text;
  }

  function setSuccess(group, msgElement) {
    if (!group) return;
    group.classList.remove('invalid');
    group.classList.add('valid');
    if (msgElement) msgElement.textContent = '';
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  /* --- 7. BOUTON RETOUR EN HAUT --- */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* --- 8. ANNÉE DYNAMIQUE DANS LE FOOTER --- */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }