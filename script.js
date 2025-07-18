window.addEventListener('DOMContentLoaded', () => {
  // Theme Feature
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  // Cek preferensi user terakhir, kalau tidak ada ikuti OS
  const userTheme = localStorage.getItem('theme');
  const systemThemeLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (userTheme === 'light' || (!userTheme && systemThemeLight)) {
    body.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-fill');
  } else {
    body.removeAttribute('data-theme');
    themeIcon.classList.remove('bi-moon-fill');
    themeIcon.classList.add('bi-sun-fill');
  }

  // Toggle event
  themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
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
  });

  // Skills Data
  const skills = ['Bootstrap', 'TailwindCSS', 'Javascript', 'PHP', 'Python', 'ReactJs', 'ExpressJs', 'Laravel', 'Flask', 'MongoDB', 'MySQL', 'Postgres']
  const skillBox = document.getElementById('skills-data');
  skills.forEach((skill) => {
    const skillTemp = `<small class="d-inline-flex px-3 py-2 fw-semibold
          text-light my-bg-accent border border-bg-accent
          rounded-1 skill">
          ${skill}
        </small>`;

    skillBox.insertAdjacentHTML('beforeend', skillTemp);
  });

  // Experience Section
  const workHandle = document.getElementById('work-section');
  const educationHandle = document.getElementById('education-section');
  const workSection = document.getElementById('work-data');
  const educationSection = document.getElementById('education-data');

  workHandle.addEventListener('click', function () {
    educationSection.classList.add('d-none');
    educationHandle.classList.remove('active');
    workSection.classList.remove('d-none');
    workHandle.classList.add('active');
  });

  educationHandle.addEventListener('click', function () {
    educationSection.classList.remove('d-none');
    educationHandle.classList.add('active');
    workSection.classList.add('d-none');
    workHandle.classList.remove('active');
  });

  // Navbar Active Script
  window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Script for Form to GoogleSheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzWscwvmfPHsrD0PFYmytr3Hr3UHTo46rhpMQ6vB_-aPoSeKnm37EYNEP2OAshRNfM-Dw/exec'
  const form = document.forms['contact-form']
  const btnSend = document.querySelector('.btn-send');
  const btnLoading = document.querySelector('.btn-loading');
  const myAlert = document.querySelector('.my-alert');

  form.addEventListener('submit', e => {
    e.preventDefault()
    btnSend.classList.toggle('d-none');
    btnLoading.classList.toggle('d-none');
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        btnSend.classList.toggle('d-none');
        btnLoading.classList.toggle('d-none');
        myAlert.classList.toggle('d-none');

        form.reset();
        console.log('Success!', response);
      })
      .catch(error => console.error('Error!', error.message))
  });
});