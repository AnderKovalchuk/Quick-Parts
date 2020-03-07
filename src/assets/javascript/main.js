window.addEventListener('load', () => {
    const d = document;
    const w = window;

    /* Mobile Menu*/
    (function () {
        /* Burger menu */
        let burger = d.querySelector('.header__menu-toggle'),
            close = d.querySelector('.header__mobile-menu-close'),
            nav = d.querySelector('.header__bottom-line'),
            overlay = d.createElement('div');
        overlay.className = 'overlay';

        function toggleMobmenu() {
            burger.classList.toggle('active');
            nav.classList.toggle('header__bottom-line--active');
            d.body.classList.toggle('hidden');
            (nav.classList.contains('header__bottom-line--active')) ? d.body.insertBefore(overlay, d.body.firstChild) : overlay.remove()
        };

        burger.addEventListener('click', toggleMobmenu);
        overlay.addEventListener('click', toggleMobmenu);
        close.addEventListener('click', toggleMobmenu);

        /* Toggle Mobile Sumbenu */
        const ddown = d.querySelectorAll('.catalog-menu__toggle');

        ddown.forEach(el => {
            el.addEventListener('click', (event) => {
                toggleMore(el);
            });
        });

        function toggleMore(el) {
            el.classList.toggle('toggle-menu--open');
            el.parentElement.nextElementSibling.classList.toggle('catalog-menu__sub-menu--open');
        };

        const fdown = d.querySelectorAll('.footer__menu-toggle');

        fdown.forEach(el => {
            el.addEventListener('click', (event) => {
                toggleFooterMore(el);
            });
        });

        function toggleFooterMore(el) {
            el.classList.toggle('toggle-menu--open');
            el.parentElement.nextElementSibling.classList.toggle('footer__info-block--open');
        };

    }());
});