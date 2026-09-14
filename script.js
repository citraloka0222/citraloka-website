document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Toggle Logic
    const langBtn = document.getElementById('langToggle');
    const body = document.body;

    langBtn.addEventListener('click', () => {
        if (body.classList.contains('lang-ms')) {
            body.classList.remove('lang-ms');
            body.classList.add('lang-en');
            langBtn.textContent = 'BM';
        } else {
            body.classList.remove('lang-en');
            body.classList.add('lang-ms');
            langBtn.textContent = 'ENG';
        }
    });

    // 2. Smooth Scrolling
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});