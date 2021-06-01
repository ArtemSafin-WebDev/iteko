import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function ourClientsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-our-clients-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const links = Array.from(element.querySelectorAll('.our-clients__nav-link'));

        const slider = new Swiper(container, {
            loop: false,
            watchOverflow: true,
            touchStartPreventDefault: false,
            allowTouchMove: false,
            preventClicks: false,
            autoHeight: true,
            speed: 700,
            effect: 'fade',
            threshold: 5,
            fadeEffect: {
                crossFade: true
            },
            init: false,
            navigation: {
                nextEl: element.querySelector('.our-slients__arrow--next'),
                prevEl: element.querySelector('.our-slients__arrow--prev')
            },
            on: {
                slideChangeTransitionStart: () => {
                    element.classList.add('slider-transitioning');
                },
                slideChangeTransitionEnd: () => {
                    element.classList.remove('slider-transitioning');
                },
                slideChange: swiper => {
                    links.forEach(link => link.classList.remove('active'));
                    links[swiper.realIndex].classList.add('active');
                },
                init: swiper => {
                    links.forEach(link => link.classList.remove('active'));
                    links[swiper.realIndex].classList.add('active');
                }
            }
        });

        slider.init();

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                console.log('Clicked index', linkIndex);
                slider.slideToLoop(linkIndex);
            });
        });
    });
}
