import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function successStories() {
    const elements = Array.from(document.querySelectorAll('.js-success-stories'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const links = Array.from(element.querySelectorAll('.success-stories__slider-nav-link'));

        const slider = new Swiper(container, {
            loop: false,
            watchOverflow: true,
            touchStartPreventDefault: false,
            allowTouchMove: false,
            preventClicks: false,
            autoHeight: true,
            speed: 700,
            on: {
                slideChangeTransitionStart: () => {
                    element.classList.add('slider-transitioning')
                },
                slideChangeTransitionEnd: () => {
                    element.classList.remove('slider-transitioning')
                },
                slideChange: swiper => {
                    links.forEach(link => link.classList.remove('active'));
                    links[swiper.realIndex].classList.add('active');
                }
            }
        });

        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                console.log('Clicked index', linkIndex);
                slider.slideToLoop(linkIndex);
            });
        });
    });
}
