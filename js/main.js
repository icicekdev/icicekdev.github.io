// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const setTheme = (mode) => {
    if (mode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', mode);
};
const stored = localStorage.getItem('theme');
if (stored) setTheme(stored);
themeBtn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(dark ? 'light' : 'dark');
});

// Mobile menu
const burger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
    const open = !mobileMenu.hasAttribute('hidden');
    if (open) {
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
    } else {
        mobileMenu.removeAttribute('hidden');
        burger.setAttribute('aria-expanded', 'true');
    }
});
mobileMenu.querySelectorAll('[data-close]').forEach(a =>
    a.addEventListener('click', () => {
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
    })
);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
        mobileMenu.setAttribute('hidden', '');
        burger.setAttribute('aria-expanded', 'false');
    }
});

// Scrollspy
const links = Array.from(document.querySelectorAll('.nav-links a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove('active'));
            const idx = sections.indexOf(entry.target);
            if (links[idx]) links[idx].classList.add('active');
        }
    });
}, { rootMargin: '-55% 0px -40% 0px', threshold: 0 });
sections.forEach(s => s && spy.observe(s));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: .1 });
reveals.forEach(el => revealObs.observe(el));

// Ticker
(function () {
    const items = Array.from(document.querySelectorAll('.ticker span'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || items.length === 0) return;
    let i = 0;
    setInterval(() => {
        items[i].classList.remove('is-active');
        i = (i + 1) % items.length;
        items[i].classList.add('is-active');
    }, 1600);
})();
