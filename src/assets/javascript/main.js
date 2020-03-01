window.addEventListener('load', () => {
    const d = document;
    const w = window;

    /* Mobile Menu*/
    (function () {
        /* Burger menu */
        let burger = d.getElementById('.header_burger'),
            nav = d.querySelector('.bottom_line'),
            overlay = d.createElement('div');
        overlay.className = 'overlay';

        function toggleMobmenu() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            d.body.classList.toggle('hidden');
            (nav.classList.contains('active')) ? d.body.insertBefore(overlay, d.body.firstChild) : overlay.remove()
        };

        menuToggle.addEventListener('click', toggleMobmenu);
        menuClose.addEventListener('click', toggleMobmenu);

        /* Toggle Mobile Sumbenu */
        const ddown = d.querySelectorAll('.catalog_menu_sub_toggle');

        ddown.forEach(el => {
            el.addEventListener('click', (event) => {
                toggleMore(el);
            });
        });

        function toggleMore(el) {
            el.classList.toggle('active');
            el.parentElement.nextElementSibling.classList.toggle('active');
        };

    }());
});