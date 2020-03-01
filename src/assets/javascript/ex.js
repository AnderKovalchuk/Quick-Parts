"use strict";
const lang = document.documentElement.lang;
let cart = [];
/*let blockedDates = {};*/
if (getCookie('cart')) cart = JSON.parse(getCookie('cart'));

window.addEventListener('load', () => {
    const d = document;
    const w = window;
    const video = d.getElementById('h-video');
    const instafeed = d.getElementById('instafeed');
    const home = d.querySelector('.home');
    const prodcard = d.querySelector('.prodcard');
    const catMoreBtn = d.querySelector('.catalog__more-btn');
    const bSlider = d.querySelector('#brands-slider');
    const bSlider2 = d.querySelector('#brands-slider2');
    const filter = d.querySelector('.filter');
    // const order      = d.querySelector('.order');
    // const order      = d.querySelectorAll('.neworder__calendar');
    const steps = d.querySelector('.cart-order__steps');
    const complete = d.querySelector('.order-complete');
    var deleteFitting = d.querySelectorAll(".newcart-page__del");
    const search = d.querySelector('.header__icon-search figure');

    let device = {
        '768': w.matchMedia('(max-width: 768px)').matches,
        '1200': w.matchMedia('(max-width: 1200px)').matches
    }
    const hsale = {
        block: d.querySelector('.h-sale'),
        left: d.querySelector('.h-sale__img--lside'),
        right: d.querySelector('.h-sale__img--rside')
    };
    if (video) {
        video.play();
    }
    /* Scroll effects */
    if (home) {
        w.addEventListener("scroll", () => {
            inView(video) ? video.play() : video.pause();
            if (inView(hsale.block)) {
                let top = hsale.left.getBoundingClientRect().top;
                hsale.left.firstChild.style.transform = `translateY(${-top / 3}px)`;
                hsale.right.firstChild.style.transform = `translateY(${top / 3}px)`;
            };
        });
    };


    function inView(el) {
        if (el) {
            let docViewTop = window.pageYOffset;
            let docViewBottom = docViewTop + window.innerHeight;
            let elTop = el.getBoundingClientRect().top + window.pageYOffset;
            let elBottom = elTop + el.clientHeight;
            return (docViewBottom >= elTop && docViewTop <= elBottom);
        }
    }

    if (home && device[1200]) video.controls = true;

    /* Footer Toggle menu */
    if (device[768]) {
        const title = [...d.querySelectorAll('.footer__navtitle')];
        const ul = [...d.querySelectorAll('.footer__navlist')];
        const activeClss = "footer__navtitle--active";
        title.forEach(el => el.addEventListener('click', e => {
            e.preventDefault();
            if (!el.classList.contains(activeClss)) {
                title.forEach(el => el.classList.remove(activeClss));
                el.classList.add(activeClss);
                ul.forEach(ul => $(ul).slideUp());
                $(el.nextElementSibling).slideDown();
            };
        }));
    }

    /* Slick common obj */
    const slickObj = {
        brandS: {
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '0px',
            arrows: true,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        },
        prodS: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            swipe: false,
            asNavFor: '.prodslider__nav',
            infinite: false,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        dots: true,
                        swipe: true
                    }
                }
            ]
        },
        prodNav: {
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.prodslider__slider',
            vertical: true,
            focusOnSelect: true,
            arrows: false
        },
        prodMore: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: true,
            centerPadding: '0px',
            responsive: [
                {
                    breakpoint: 501,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }
    };

    $(bSlider).slick(slickObj.brandS);
    $(bSlider2).slick(slickObj.brandS);
    $('.prodslider__slider').slick(slickObj.prodS);
    $('.prodslider__nav').slick(slickObj.prodNav);
    if (device[768]) $('.prodmore__list').slick(slickObj.prodMore);


    /*Insta */
    var dataCity = document.documentElement.dataset.city;
    if (instafeed && dataCity == 'Kyiv') {
        instaFeed('https://api.instagram.com/v1/users/self/media/recent/?access_token=6319334104.1677ed0.50c666357d3845b8b8e5d9130e7e5def&count=8');
    } else if (instafeed) {
        instaFeed('https://api.instagram.com/v1/users/self/media/recent/?access_token=308771480.1677ed0.a67bbd6f4777410a97e42a6add788690&count=8');
    };

    function instaFeed(targetUrl) {
        fetch(targetUrl)
            .then(res => res.json())
            .then(res => {
                res.data.forEach(el => {
                    let img = d.createElement('img');
                    let li = d.createElement('li');
                    let link = d.createElement('a');
                    li.className = "instafeed__item";
                    img.src = el.images.low_resolution.url;
                    link.href = el.link;
                    link.target = '_blank';
                    link.appendChild(img);
                    li.appendChild(link);
                    instafeed.appendChild(li);
                });
            })
            .catch(err => console.error('Insta Error:', err));
    }

    if (search) {
        search.addEventListener('click', (e) => {
            if (d.getElementById('search-full').style.top === "-70px") {
                // d.getElementById('mob-search').style.display="block";
                d.getElementById('search-full').style.top = "75px";
                // d.getElementById('mob-search-inp').style.display="block";
            } else {
                // d.getElementById('mob-search-inp').style.display="none";
                d.getElementById('search-full').style.top = "-70px"
            }
        })
    }


    /* Mobile Menu*/
    (function () {
        /* Burger menu */
        let burger = d.querySelector('.header__burg'),
            nav = d.querySelector('.bottom_line'),
            overlay = d.createElement('div');
        overlay.className = 'overlay';

        function toggleMobmenu() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            d.body.classList.toggle('hidden');
            (nav.classList.contains('active')) ? d.body.insertBefore(overlay, d.body.firstChild) : overlay.remove()
        };

        [overlay, burger].forEach(el => el.addEventListener('click', toggleMobmenu));

        /* Toggle Mobile Sumbenu */
        const ddown = d.querySelectorAll('.header__navlist-toggle');

        ddown.forEach(el => {
            el.addEventListener('click', (event) => {
                toggleMore(el);
            });
        });

        function toggleMore(el) {
            el.classList.toggle('active');
            if (el.classList.contains('active')) {
                $(el.nextElementSibling).slideDown();
            } else {
                $(el.nextElementSibling).slideUp();
            }
        };

    }());


    /* Catalog filter toggle */
    if (filter) {
        const btn = d.querySelector('.filter__toggle');
        const form = d.getElementById('filterForm');
        const input = form.querySelectorAll('input[type="checkbox"]');
        const reset = form.querySelector('.filter__reset');
        const close = d.querySelector('.filter__close');

        form.addEventListener('change', activeFilter);
        reset.addEventListener('click', () => setInterval(activeFilter, 50));
        btn.addEventListener('click', toggleFilter);
        close.addEventListener('click', toggleFilter);

        function activeFilter(res) {
            input.forEach(el => {
                if (el.checked) res = true;
            });
            (res === true) ? btn.dataset.dot = res : btn.dataset.dot = false;
        }
        activeFilter();

        function toggleFilter() {
            if (!device[768]) $(filter).slideToggle();
            filter.classList.toggle('filter--visible');
        }
    };


    /* Cart-order delte actions */
    const del = [...d.querySelectorAll('.cart-item__delete')];
    const cartInner = d.querySelector('.newcart-page__inner');

    del.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            delItem(el, 500)
                .then(isCartEmpty);
        });
    });


    function delItem(el, deltime) {
        return new Promise((resolve, reject) => {
            el.closest('.cart-item').style.animation = `zoomOut ${deltime}ms both`;
            setTimeout(() => {
                var i = el.closest('section.newcart-page__fitting-item');
                var item = i.querySelectorAll(".cart-item");
                el.closest('.cart-item').remove();
                if (item.length < 2) {
                    document.querySelector("[data-el='" + i.dataset.el + "']").remove();
                    document.querySelector("[name='date[" + i.dataset.el + "]']").remove();
                    document.querySelector("[name='time[" + i.dataset.el + "]']").remove();
                }
                resolve();
            }, deltime);
        });
    };

    deleteFitting.forEach(el =>
        el.addEventListener("click",
            e => {
                e.preventDefault();
                return new Promise((resolve, reject) => {
                    if (confirm('Р’С‹ СѓРІРµСЂРµРЅРЅС‹?')) {
                        var deleteFittingInput = "";
                        deleteFittingInput = el.closest(".newcart-page__fitting-item").querySelectorAll("input[name='prop[]']");
                        deleteFittingInput.forEach(els => {
                            deleteCartItem(parseInt(els.value));
                        });
                        var i = el.closest('.newcart-page__fitting-item');
                        document.querySelector("[name='date[" + i.dataset.el + "]']").remove();
                        document.querySelector("[name='time[" + i.dataset.el + "]']").remove();
                        i.remove();
                        resolve();
                        ifsEmpty();
                    }
                });
            })
    );
    function ifsEmpty() {
        if (cart.length == 0) {
            document.location.reload(true);
        }
    }
    const isCartEmpty = () => {
        if (cart.length == 0) {
            document.location.reload(true);
        }
    }

    // // };

    /* Order complete page */
    if (complete) {
        let url = (new URL(document.location)).searchParams;
        let date = complete.querySelector('.order-complete__date');
        let addr = complete.querySelector('.order-complete__addr');
        let urlDate = url.get('date') || date.textContent;
        let urlTime = url.get('time') || date.textContent;
        let urlCity = url.get('city');
        let tarAddr = addr.textContent;
        if (urlCity == "РљРёРµРІ" || urlCity == "РљРёС—РІ") {
            if (lang == 'ua') tarAddr = "Р·Р° Р°РґСЂРµСЃРѕСЋ: Рј. РљРёС—РІ, РІСѓР». РЁРѕС‚Р° Р СѓСЃС‚Р°РІРµР»Р»С–, 34"
            if (lang == 'ru') tarAddr = "РїРѕ Р°РґСЂРµСЃСѓ: Рі. РљРёРµРІ, СѓР». РЁРѕС‚Р° Р СѓСЃС‚Р°РІРµР»Р»Рё, 34"
        }
        else if (urlCity == "Р›СЊРІРѕРІ" || urlCity == "Р›СЊРІС–РІ") {
            if (lang == 'ua') tarAddr = "Р·Р° Р°РґСЂРµСЃРѕСЋ: Рј. Р›СЊРІС–РІ, РІСѓР». Р†. Р¤СЂР°РЅРєР°, 61"
            if (lang == 'ru') tarAddr = "РїРѕ Р°РґСЂРµСЃСѓ: Рі. Р›СЊРІРѕРІ, СѓР». Р. Р¤СЂР°РЅРєР°, 61"
        }
        date.textContent = `${urlDate} (${urlTime})`;
        addr.textContent = tarAddr;
    }


    /* Popup`s */
    d.querySelectorAll('.open-popup').forEach(el => {
        el.addEventListener('click', () => {
            d.querySelector(el.dataset.modal).dataset.visible = true;
        });
    });

    d.querySelectorAll('.popup-box').forEach(el => {
        el.addEventListener('click', e => {
            if (e.target.classList.contains("popup-box") || e.target.classList.contains("popup-box__close")) {
                el.dataset.visible = false;
            }
        });
    });

    if (!getCookie("city")) d.getElementById("popCity").dataset.visible = true;

    /* Load more Products */
    if (catMoreBtn) {
        const catalog = d.querySelector('.catalog__products');
        const paginat = d.querySelector('.pagination');
        const path = catMoreBtn.dataset.path;
        const maxpage = +catMoreBtn.dataset.maxpage;
        let curpage = +catMoreBtn.dataset.curentpage;

        noMoreProd(curpage, maxpage);

        catMoreBtn.addEventListener('click', () => {
            if (curpage < maxpage) {
                curpage++;
                paginat.classList.add('invisible');
                catMoreBtn.classList.add('catalog__more-btn--loading');
                fetch(`/index.php?route=product/moreproduct&path=${path}&page=${curpage}`, {
                    method: 'GET'
                })
                    .then(resp => { return resp.text() })
                    .then(html => {
                        catMoreBtn.classList.remove('catalog__more-btn--loading');
                        catalog.innerHTML += html;
                    })
                    .catch(err => console.error('Error:', err));
            }
            noMoreProd(curpage, maxpage);
        });
        function noMoreProd(cur, max) {
            if (cur === max) {
                $(catMoreBtn).fadeOut();
            }
        }
    }


});





/* Gallery in popup start */
{
    let current_photo = 1;
    let images = null;
    document.addEventListener("click", e => popGallery(e));
    document.onkeydown = popGalleryKey;

    function popGallery(e) {
        if (e.srcElement.dataset.gallery == 'true') {
            images = (images == null ? document.querySelectorAll(".prodslider__slider img").length : images);

            document.querySelectorAll(".prodslider__slider li img").forEach((img, i) => {
                img.dataset.n = (i + 1);
            });

            current_photo = (parseInt(e.target.dataset.n));
            const popup = document.createElement('div');
            popup.id = 'popGallery';
            popup.className = 'popup-box';
            popup.dataset.visible = true;
            document.body.appendChild(popup);
            popup.innerHTML += `
          <div class="popup-box__content">
            <div class="popup-box__close"></div>
            <div id="popup-load" class="popup-box__load"></div>
            <div id="popup-prev" class="popup-box__nav">prev</div>
            <div id="popup-next" class="popup-box__nav">next</div>
            <div id="popup-slides" class="popup-box__slides"></div>
            <div class="popup-box__images" id="popup-img">
              <figure id="popup-zoom" class="popup-box__zoomed" style="background-image: url('${e.srcElement.dataset.popup}')" onmousemove='zooming(event)' >
                <img id="popup-photo" class="popup-box__image" src="${e.srcElement.dataset.popup}">
              </figure>
            </div>
          </div>`;
            popGalleryNav();
            popGalleryPreload(document.getElementById("popup-photo"));
        } else if (e.srcElement.classList.contains("popup-box") || e.srcElement.classList.contains("popup-box__close")) {
            if (document.getElementById("popGallery")) document.getElementById("popGallery").remove();
        } else if (document.getElementById("popGallery") && e.srcElement.id == "popup-next" || e.srcElement.id == "popup-prev") {
            (e.srcElement.id == "popup-next") ? current_photo++ : current_photo--;

            let elements = document.querySelectorAll(".prodslider__slider li");
            let src = (elements.item(current_photo - 1).getElementsByTagName("img")[0].dataset.popup);
            let img = document.getElementById("popup-photo");
            let zoom = document.getElementById("popup-zoom");
            img.src = src;
            zoom.style.backgroundImage = `url('${src}')`;
            popGalleryNav();
            popGalleryPreload(img);
        }
    }

    function popGalleryNav() {
        document.getElementById("popup-slides").innerHTML = "<b>" + current_photo + "</b> / " + images;
        document.getElementById("popup-prev").style.display = (current_photo == 1 || images == 0) ? "none" : "flex";
        document.getElementById("popup-next").style.display = (current_photo == images || images == 0) ? "none" : "flex";
    }

    function popGalleryPreload(img) {
        let preload = document.getElementById("popup-load");
        let interval = setInterval(() => {
            if (img.complete) {
                $(preload).fadeOut();
                clearInterval(interval);
            } else {
                $(preload).fadeIn();
            }
        }, 100)
    }

    function popGalleryKey(e) {
        e = e || window.event;
        if (document.getElementById("popGallery")) {
            if (e.keyCode == "37") { // ON KEYDOWN LEFT ARROW
                if (document.getElementById("popup-prev").style.display != "none") document.getElementById("popup-prev").click();
            }
            else if (e.keyCode == "39") { // ON KEYDOWN RIGHT ARROW
                if (document.getElementById("popup-next").style.display != "none") document.getElementById("popup-next").click();
            }
            else if (e.keyCode == "27") { // ON KEYDOWN ESCAPE
                document.getElementById("popGallery").remove();
            }
        }
    }

}

function zooming(e) {
    let zoomer = e.currentTarget;
    let offsetX, offsetY, x, y;
    e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
    e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
    x = offsetX / zoomer.offsetWidth * 100
    y = offsetY / zoomer.offsetHeight * 100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
}


/* Google map */
function initMap() {

    const gMap = {
        Kiev: {
            position: { lat: 50.4370785, lng: 30.517750699999965 },
            map() { return newMap('mapKiev', this.position) }
        },
        Lviv: {
            position: { lat: 49.8311398, lng: 24.033193900000015 },
            map() { return newMap('mapLviv', this.position) }
        },
        LvivA: {
            position: { lat: 49.828446, lng: 23.991518 },
            map() { return newMap('mapLvivA', this.position) }
        }
    };

    for (let key in gMap) {
        gMarker(gMap[key].position, gMap[key].map());
    }

    function gMarker(position, map) {
        return new google.maps.Marker({
            position,
            map,
            animation: google.maps.Animation.BOUNCE,
            icon: { url: '/img/icons/map__marker--black.png' }
        })
    }

    function newMap(id, position) {
        return new google.maps.Map(document.getElementById(id), { zoom: 15, center: position })
    }
}


/* Global Cart scripts */
function addToCart(id, btn) {
    let color = [...document.querySelectorAll('[name=p-color]')].filter(el => el.checked)[0];
    let size = [...document.querySelectorAll('[name=p-size]')].filter(el => el.checked)[0];

    for (let i in cart) {
        if (cart[i].id == id) {
            cart[i].prop = {
                color: (color) ? color.value : "",
                size: (size) ? size.value : ""
            }
            saveCart();
            return;
        }
    }

    let item = {
        id: id,
        prop: {
            color: (color) ? color.value : "",
            size: (size) ? size.value : ""
        }
    };

    cart.push(item);
    saveCart();
    updCartQuantity();
    cartPopup(btn);
}

function saveCart() {
    if (navigator.cookieEnabled) {
        deleteCookie('cart');
        setCookie('cart', JSON.stringify(cart), 240);
    } else {
        alert('Р’РєР»СЋС‡РёС‚Рµ cookie РІ РЅР°СЃС‚СЂРѕР№РєР°С… Р±СЂР°СѓР·РµСЂР°');
    }
}

function deleteCartItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updCartQuantity();
}

function updCartQuantity() {
    let indicator = document.querySelectorAll('.header__booking-btn i');
    indicator.forEach(el => el.textContent = cart.length);
}

updCartQuantity();


function cartPopup(btn) {
    const popup = document.querySelector('#popProduct');
    const popupTitle = popup.querySelector('.popup-box__title i');
    let prodName;
    if (btn.closest('.product')) prodName = btn.closest('.product').querySelector('.product__title');
    if (btn.closest('.prodcard')) prodName = btn.closest('.prodcard').querySelector('.prodcard__name');
    popupTitle.innerHTML = '';
    popupTitle.innerHTML = prodName.textContent;
    popup.dataset.visible = true;
}

function cityPopup(city) {
    deleteCookie('city');
    setCookie('city', encodeURIComponent(city), 96);
    location.reload();
}

function consultForm(id, btn) {
    const popup = document.querySelector('#consultForm');
    popup.dataset.visible = true;
}

const textForm = document.getElementById('consult');
let consult = {
    consName: document.querySelector('input[name=consultForm_name]'),
    consTel: document.querySelector('input[name=consultForm_tel]')
}

function submitForm(e, consult) {
    e.preventDefault();
    fetch('file.php', {
        method: 'post',
        body: JSON.stringify({ name: consult.constName.value, tel: consult.consTel.value })
    }).then(response => response.json())
        .then(data => alert('form submited'))   //Success code goes here
        .then(res => popThanks(btn))
        .catch(err => console.error('Error:', err));
}

function popThanks(btn) {
    const popup = document.querySelector('#popThanks');
    document.querySelector('#consultForm').dataset.visible = false;
    popup.dataset.visible = true;
}


function applyCatalogFilter(form, event) {
    event.preventDefault();
    const filter = [];
    const checked = [...document.querySelectorAll('.filter__filters input')].filter(el => el.checked);
    const action = form.action;
    checked.forEach(el => filter.push(el.value));
    window.location.href = `${action}&filter=${filter.join(',')}`;
}

function setCookie(cookiename, cookievalue, hours) {
    let date = new Date();
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
}

function getCookie(name) {
    let match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}