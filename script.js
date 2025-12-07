/**
 * Portfolio Website - Main JavaScript
 * Handles theme switching, skills rendering, experience tabs, navbar active state, and contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== THEME FEATURE =====
  const initializeTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check user's last preference, fallback to OS preference
    const userTheme = localStorage.getItem('theme');
    const systemThemeLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    const setTheme = (isDark) => {
      if (isDark) {
        body.removeAttribute('data-theme');
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
        localStorage.setItem('theme', 'dark');
      } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
        localStorage.setItem('theme', 'light');
      }
    };

    // Apply initial theme
    const shouldBeDark = userTheme === 'dark' || (!userTheme && !systemThemeLight);
    setTheme(!shouldBeDark);

    // Toggle event listener
    themeToggle.addEventListener('click', () => {
      const isDark = body.getAttribute('data-theme') !== 'light';
      setTheme(isDark);
    });
  };

  // ===== SKILLS DATA =====
  const renderSkills = () => {
    const skills = [
      'Bootstrap', 'TailwindCSS', 'JavaScript', 'PHP', 'Python',
      'React', 'Express.js', 'Laravel', 'Flask', 'MongoDB',
      'MySQL', 'PostgreSQL'
    ];
    const skillBox = document.getElementById('skills-data');

    skills.forEach((skill) => {
      const skillElement = document.createElement('small');
      skillElement.className = 'd-inline-flex px-3 py-2 fw-semibold text-light my-bg-accent border border-bg-accent rounded-1 skill';
      skillElement.textContent = skill;
      skillBox.appendChild(skillElement);
    });
  };

  // ===== EXPERIENCE SECTION TABS =====
  const initializeExperienceTabs = () => {
    const workHandle = document.getElementById('work-section');
    const educationHandle = document.getElementById('education-section');
    const workSection = document.getElementById('work-data');
    const educationSection = document.getElementById('education-data');

    const showWorkSection = () => {
      educationSection.classList.add('d-none');
      educationHandle.classList.remove('active');
      workSection.classList.remove('d-none');
      workHandle.classList.add('active');
      educationHandle.setAttribute('aria-selected', 'false');
      workHandle.setAttribute('aria-selected', 'true');
    };

    const showEducationSection = () => {
      educationSection.classList.remove('d-none');
      educationHandle.classList.add('active');
      workSection.classList.add('d-none');
      workHandle.classList.remove('active');
      educationHandle.setAttribute('aria-selected', 'true');
      workHandle.setAttribute('aria-selected', 'false');
    };

    workHandle.addEventListener('click', showWorkSection);
    educationHandle.addEventListener('click', showEducationSection);
  };

  // ===== NAVBAR ACTIVE STATE ON SCROLL =====
  const initializeNavbarScroll = () => {
    const updateActiveNavLink = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      let currentSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    };

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(updateActiveNavLink);
    });
  };

  // ===== CONTACT FORM SUBMISSION =====
  const initializeContactForm = () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzWscwvmfPHsrD0PFYmytr3Hr3UHTo46rhpMQ6vB_-aPoSeKnm37EYNEP2OAshRNfM-Dw/exec';
    const form = document.forms['contact-form'];
    const btnSend = document.querySelector('.btn-send');
    const btnLoading = document.querySelector('.btn-loading');
    const myAlert = document.querySelector('.my-alert');

    if (!form) return; // Exit if form doesn't exist

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Show loading state
      btnSend.classList.add('d-none');
      btnLoading.classList.remove('d-none');

      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: new FormData(form)
        });

        if (response.ok) {
          // Show success message
          myAlert.classList.remove('d-none');
          form.reset();

          // Auto-hide alert after 5 seconds
          setTimeout(() => {
            myAlert.classList.add('d-none');
          }, 5000);

          console.log('Form submitted successfully!');
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again.');
      } finally {
        // Hide loading state
        btnSend.classList.remove('d-none');
        btnLoading.classList.add('d-none');
      }
    });
  };

  // ===== INITIALIZE ALL FEATURES =====
  initializeTheme();
  renderSkills();
  initializeExperienceTabs();
  initializeNavbarScroll();
  initializeContactForm();
});
