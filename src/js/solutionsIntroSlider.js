import { Swiper, Navigation, EffectFade, Pagination } from 'swiper';

Swiper.use([Navigation, EffectFade, Pagination]);

export default function solutionsIntroSlider() {
    const elements = Array.from(document.querySelectorAll('.js-solutions-intro-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: true,
            loop: true,
            speed: 400,
            slideToClickedSlide: true,
            loopedSlides: 4,
            threshold: window.matchMedia("(max-width: 640px)").matches ? 0 : 4,
            pagination: {
                el: element.querySelector('.solutions-intro__slider-pagination'),
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: element.querySelector('.solutions-intro__slider-arrow--next'),
                prevEl: element.querySelector('.solutions-intro__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    spaceBetween: 60,
                    speed: 1200,
                }
            }
        });
    });
}
