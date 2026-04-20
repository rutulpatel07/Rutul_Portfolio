document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.primary-nav');
    const navLinks = document.querySelectorAll('.primary-nav a');
    const sections = document.querySelectorAll('main section[id]');
    const year = document.getElementById('current-year');
    const siteHeader = document.querySelector('.site-header');

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const setActiveNavLink = () => {
        let currentSection = '';
        const headerOffset = siteHeader ? siteHeader.offsetHeight + 24 : 120;

        sections.forEach(section => {
            const top = section.offsetTop - headerOffset;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${currentSection}`;
            link.classList.toggle('active', isActive);
        });
    };

    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink, { passive: true });
});
