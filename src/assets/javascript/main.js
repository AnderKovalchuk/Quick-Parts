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

    /* Product Tub Menu */
    (function () {
        if(w.matchMedia('(max-width: 768px)').matches || !d.querySelector('.prodcard__tab-content'))
            return

        let tabDescription = d.querySelector('.prodcard__tab-description'),
            tabReviews = d.querySelector('.prodcard__tab-reviews'),
            reviews = d.querySelector('.prodcard__reviews'),
            description = d.querySelector('.prodcard__description');
        reviews.style.display = "none";

        tabDescription.addEventListener('click', (event) => {
            if(tabDescription.classList.contains('prodcard__tab-content--active'))
                return
            reviews.style.display = "none";
            description.style.display = "block";
            tabDescription.classList.toggle('prodcard__tab-content--active');
            tabReviews.classList.toggle('prodcard__tab-content--active');
        });
        tabReviews.addEventListener('click', (event) => {
            if(tabReviews.classList.contains('prodcard__tab-content--active'))
                return
            reviews.style.display = "block";
            description.style.display = "none";
            tabDescription.classList.toggle('prodcard__tab-content--active');
            tabReviews.classList.toggle('prodcard__tab-content--active');
        });
        
        /*let tabDescription = d.querySelector('.prodcard__js--tab-description'),
            tabReviews = d.querySelector('.prodcard__js--tab-reviews'),
            contentDescription = d.querySelector('.prodcard__description'),
            contentReviews = d.querySelector('.prodcard__reviews');
        
        function toggleProductTab() {
            tabReviews.classList.toggle('prodcard__tub-item--active');
            tabDescription.classList.toggle('prodcard__tub-item--active');
            contentDescription.classList.toggle('--active');
            contentReviews.classList.toggle('--active');
        }

        tabDescription.addEventListener('click', toggleProductTab);
        tabReviews.addEventListener('click', toggleProductTab);*/
    }());

    (function () {
        let contentTongle = d.querySelectorAll('.prodcard__content-header');
        contentTongle.forEach(el => {
            el.addEventListener('click', (event) => {
                el.nextElementSibling.classList.toggle('prodcard__content-iner--open');
                el.querySelector('.toggle-menu').classList.toggle('toggle-menu--open')
            });
        });
    }());

    (function (){
        let buttonMinus = d.querySelector('.quantity__button--minus'),
            buttonPlus = d.querySelector('.quantity__button--plus'),
            quantity = d.querySelector('.quantity__input');
        
        buttonMinus.addEventListener('click', (event) => {
            if(quantity.value <= 1)
                quantity.value = 1;
            else
                quantity.value = quantity.value - 1;
        });
        buttonPlus.addEventListener('click', (event) => {
            if(quantity.value >= 50)
                quantity.value = 50;
            else
                quantity.value =  parseInt(quantity.value) + 1;
        });
    }());
});