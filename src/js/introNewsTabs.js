import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);


export default function introNewsTabs() {
    const elements = Array.from(document.querySelectorAll('.js-intro-news-tabs'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const links = Array.from(element.querySelectorAll('.intro__news-tabs-nav-link'));
        const slider = new Swiper(container, {
            effect: 'fade',
            loop: true,
            watchOverflow: true,
            touchStartPreventDefault: false,
            allowTouchMove: false,
            preventClicks: false,
            fadeEffect: {
                crossFade: true
            },
            autoHeight: true,

            speed: 500,
            on: {
                slideChange: swiper => {
                    links.forEach(link => link.classList.remove('active'));
                    links[swiper.realIndex].classList.add('active');
                }
            }
        });

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                console.log('Clicked index', linkIndex)
                slider.slideToLoop(linkIndex);
            })
        })
    });
}