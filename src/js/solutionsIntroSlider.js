import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function solutionsIntroSlider() {
    const elements = Array.from(document.querySelectorAll('.js-solutions-intro-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 20,
            watchOverflow: true,
            loop: true,
            speed: 1200,
            slideToClickedSlide: true,
            loopedSlides: 4,
            threshold: 4,
            navigation: {
                nextEl: element.querySelector('.solutions-intro__slider-arrow--next'),
                prevEl: element.querySelector('.solutions-intro__slider-arrow--prev')
            }
        });
    });
}
