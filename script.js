document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    /* ---------- 1. Language toggle (remembered per browser) ---------- */
    const langBtn = document.getElementById('langToggle');
    const setLang = (lang) => {
        body.classList.toggle('lang-en', lang === 'en');
        body.classList.toggle('lang-ms', lang !== 'en');
        document.documentElement.lang = lang === 'en' ? 'en' : 'ms';
        langBtn.textContent = lang === 'en' ? 'BM' : 'ENG';
        try { localStorage.setItem('citraloka-lang', lang); } catch (e) {}
    };
    let saved = null;
    try { saved = localStorage.getItem('citraloka-lang'); } catch (e) {}
    if (saved) setLang(saved);
    langBtn.addEventListener('click', () => setLang(body.classList.contains('lang-ms') ? 'en' : 'ms'));

    /* ---------- 2. Mobile menu ---------- */
    const menuBtn = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    const closeMenu = () => {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

    /* ---------- 3. Header state + floating WhatsApp ---------- */
    const header = document.getElementById('siteHeader');
    const waFloat = document.querySelector('.wa-float');
    const onScroll = () => {
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > 40);
        if (waFloat) waFloat.classList.toggle('is-visible', y > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- 4. Active nav link ---------- */
    const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const updateActive = () => {
        const mid = window.innerHeight * 0.45;
        let current = sections[0];
        sections.forEach(s => { if (s.getBoundingClientRect().top <= mid) current = s; });
        navLinks.forEach(a => a.classList.toggle('is-active', current && a.getAttribute('href') === '#' + current.id));
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });

    /* ---------- 5. Collection filter ---------- */
    const chips = document.querySelectorAll('.chip');
    const grid = document.getElementById('productGrid');
    const cards = grid ? [...grid.querySelectorAll('.product-card')] : [];

    // Keep counts in sync automatically with the cards in the HTML
    document.querySelectorAll('[data-product-count]').forEach(el => { el.textContent = cards.length; });
    chips.forEach(chip => {
        const f = chip.dataset.filter;
        const n = f === 'all' ? cards.length : cards.filter(c => c.dataset.cat === f).length;
        const sup = chip.querySelector('sup');
        if (sup) sup.textContent = n;
        if (n === 0 && f !== 'all') chip.hidden = true;
    });

    chips.forEach(chip => chip.addEventListener('click', () => {
        const f = chip.dataset.filter;
        chips.forEach(c => {
            const on = c === chip;
            c.classList.toggle('is-active', on);
            c.setAttribute('aria-pressed', String(on));
        });
        cards.forEach(card => {
            const show = f === 'all' || card.dataset.cat === f;
            card.hidden = !show;
            if (show) card.classList.add('is-in');
        });
        grid.scrollTo({ left: 0, behavior: 'smooth' });

        // Bawa pengguna ke atas senarai produk bila filter ditukar (menu filter kekal melekat)
        if (filterBar && grid.getBoundingClientRect().top < filterBar.offsetHeight + header.offsetHeight) {
            const y = grid.getBoundingClientRect().top + window.scrollY - filterBar.offsetHeight - header.offsetHeight - 12;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }));

    /* ---------- 5b. Sticky filter bar: shadow bila melekat ---------- */
    const filterBar = document.querySelector('.filter-bar');
    const onFilterStick = () => {
        if (!filterBar) return;
        const top = parseFloat(getComputedStyle(filterBar).top) || 0;
        filterBar.classList.toggle('is-stuck', filterBar.getBoundingClientRect().top <= top + 1 && grid.getBoundingClientRect().bottom > top + filterBar.offsetHeight);
    };
    onFilterStick();
    window.addEventListener('scroll', onFilterStick, { passive: true });

    /* ---------- 6. Reveal on scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach((el, i) => {
            el.style.transitionDelay = (i % 4) * 70 + 'ms';
            io.observe(el);
        });
    } else {
        reveals.forEach(el => el.classList.add('is-in'));
    }
});
