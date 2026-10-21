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
        let best = -Infinity;
        // Pilih seksyen paling dekat di atas garis tengah (ikut kedudukan sebenar, bukan susunan menu)
        sections.forEach(s => { const t = s.getBoundingClientRect().top; if (t <= mid && t > best) { best = t; current = s; } });
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
    // Kiraan automatik untuk setiap kumpulan nama beg (ikut koleksi + nama beg)
    const groupLabels = grid ? [...grid.querySelectorAll('.group-label')] : [];
    document.querySelectorAll('[data-group-count]').forEach(el => {
        const cat = el.closest('.group-label')?.dataset.groupCat;
        const n = cards.filter(c => c.dataset.group === el.dataset.groupCount && c.dataset.cat === cat).length;
        el.querySelectorAll('b').forEach(b => { b.textContent = n; });
        const en = el.querySelector('.en');
        if (en) en.lastChild.textContent = n === 1 ? ' design' : ' designs';
    });

    // 'all' = semua, 'new' = Koleksi Baharu (data-new="true"), lain-lain = data-cat
    // 'sale' = Beg Mini (data-mini="true") semasa sale
    const matches = (card, f) => f === 'all' || (f === 'new' ? card.dataset.new === 'true' : f === 'sale' ? card.dataset.mini === 'true' : card.dataset.cat === f);
    chips.forEach(chip => {
        const f = chip.dataset.filter;
        const n = cards.filter(c => matches(c, f)).length;
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
        // Label kumpulan nama beg hanya dipapar bila satu koleksi dipilih
        const hasGroups = groupLabels.some(l => l.dataset.groupCat === f);
        grid.classList.toggle('show-groups', hasGroups);
        groupLabels.forEach(l => { l.hidden = l.dataset.groupCat !== f; });
        cards.forEach(card => {
            const show = matches(card, f);
            card.hidden = !show;
            if (show) card.classList.add('is-in');
        });
        grid.scrollTo({ left: 0, behavior: 'smooth' });
        if (saleTerms) saleTerms.hidden = !(f === 'sale' && salePhase !== 'off');

        // Bawa pengguna ke atas senarai produk bila filter ditukar (menu filter kekal melekat)
        const headBottom = header.getBoundingClientRect().bottom;
        if (filterBar && grid.getBoundingClientRect().top < filterBar.offsetHeight + headBottom) {
            const y = grid.getBoundingClientRect().top + window.scrollY - filterBar.offsetHeight - headBottom - 12;
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

    /* ---------- 5c. SALE BEG MINI (22–25 Okt 2026, waktu Malaysia) ----------
       Teaser: 21 Okt | Sale: 22 Okt 12:00am – 25 Okt 11:59pm | Selepas itu hilang sendiri.
       Pratonton: tambah ?sale=teaser, ?sale=live atau ?sale=off pada URL. */
    const SALE = {
        teaser: new Date('2026-10-21T00:00:00+08:00'),
        start:  new Date('2026-10-22T00:00:00+08:00'),
        end:    new Date('2026-10-26T00:00:00+08:00') // = tamat 25 Okt 11:59:59pm
    };
    const saleBar = document.getElementById('saleBar');
    const heroSale = document.getElementById('heroSale');
    const saleTerms = document.getElementById('saleTerms');
    const saleChip = document.querySelector('.chip-sale');
    const allChip = document.querySelector('.chip[data-filter="all"]');
    const saleCtas = [...document.querySelectorAll('.pc-cta[data-sale-href]')];
    saleCtas.forEach(a => { a.dataset.normalHref = a.getAttribute('href'); });
    let forced = null;
    try { forced = new URLSearchParams(location.search).get('sale'); } catch (e) {}
    let barClosed = false;
    try { barClosed = sessionStorage.getItem('citraloka-salebar') === 'closed'; } catch (e) {}
    let salePhase = 'off';

    const getPhase = (now) => {
        if (['teaser', 'live', 'off'].includes(forced)) return forced;
        if (now >= SALE.teaser && now < SALE.start) return 'teaser';
        if (now >= SALE.start && now < SALE.end) return 'live';
        return 'off';
    };
    const setBarH = () => {
        const h = saleBar && !saleBar.hidden ? saleBar.offsetHeight : 0;
        document.documentElement.style.setProperty('--bar-h', h + 'px');
    };
    const applyPhase = (phase, first) => {
        const prev = salePhase;
        salePhase = phase;
        const on = phase !== 'off';
        body.classList.toggle('sale-on', on);
        body.classList.toggle('sale-teaser', phase === 'teaser');
        body.classList.toggle('sale-live', phase === 'live');
        if (saleBar) saleBar.hidden = !on || barClosed;
        if (heroSale) heroSale.hidden = !on;
        if (saleChip) saleChip.hidden = !on;
        saleCtas.forEach(a => { a.href = phase === 'live' ? a.dataset.saleHref : a.dataset.normalHref; });
        setBarH();
        // Semasa sale: filter Sale dipilih automatik bila website dibuka
        if (phase === 'live' && (first || prev !== 'live') && saleChip) saleChip.click();
        // Sale tamat semasa website dibuka: kembali ke Semua
        if (!on && saleChip && saleChip.classList.contains('is-active') && allChip) allChip.click();
        if (saleTerms && !on) saleTerms.hidden = true;
    };
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
        const now = new Date();
        const phase = getPhase(now);
        if (phase !== salePhase) applyPhase(phase, false);
        if (phase === 'off') return;
        const target = phase === 'teaser' ? SALE.start : SALE.end;
        const t = Math.max(0, Math.floor((target - now) / 1000));
        const d = Math.floor(t / 86400), h = Math.floor(t % 86400 / 3600), m = Math.floor(t % 3600 / 60), s = t % 60;
        const isEn = body.classList.contains('lang-en');
        const short = (d ? d + (isEn ? 'd ' : 'h ') : '') + pad(h) + (isEn ? 'h ' : 'j ') + pad(m) + 'm ' + pad(s) + 's';
        document.querySelectorAll('[data-countdown="short"]').forEach(el => { el.textContent = short; });
        document.querySelectorAll('[data-cd]').forEach(el => { el.textContent = pad({ d, h, m, s }[el.dataset.cd]); });
    };
    // Tag "Pos Percuma" pada SEMUA kad produk (dipapar semasa sale sahaja)
    const truck = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>';
    cards.forEach(card => {
        const media = card.querySelector('.pc-media');
        if (media && !media.querySelector('.pc-ship')) media.insertAdjacentHTML('beforeend', '<span class="pc-ship">' + truck + '<span class="ms">Pos Percuma</span><span class="en">Free Shipping</span></span>');
    });
    // Bar atas: mesej bergilir setiap 4 saat
    const barMsgs = saleBar ? [...saleBar.querySelectorAll('.sb-msg')] : [];
    let msgIdx = 0;
    if (barMsgs.length > 1) setInterval(() => {
        if (salePhase === 'off') return;
        barMsgs[msgIdx].classList.remove('is-active');
        msgIdx = (msgIdx + 1) % barMsgs.length;
        barMsgs[msgIdx].classList.add('is-active');
    }, 4000);

    applyPhase(getPhase(new Date()), true);
    tick();
    setInterval(tick, 1000);
    window.addEventListener('resize', setBarH);
    langBtn.addEventListener('click', () => { setBarH(); tick(); });

    const closeBtn = document.getElementById('saleBarClose');
    if (closeBtn) closeBtn.addEventListener('click', () => {
        barClosed = true;
        try { sessionStorage.setItem('citraloka-salebar', 'closed'); } catch (e) {}
        saleBar.hidden = true;
        setBarH();
    });
    // Butang "Lihat Beg Mini": pilih filter Sale & pergi ke koleksi
    document.querySelectorAll('[data-sale-jump]').forEach(a => a.addEventListener('click', e => {
        e.preventDefault();
        if (saleChip && !saleChip.hidden && !saleChip.classList.contains('is-active')) saleChip.click();
        const target = document.getElementById('koleksi');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    }));

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
