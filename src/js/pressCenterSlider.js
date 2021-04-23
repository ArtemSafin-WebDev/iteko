import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function pressCenterSlider() {
    const elements = Array.from(document.querySelectorAll('.js-press-center-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        new Swiper(container, {
            slidesPerView: 1,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopedSlides: 3,
            loopAdditionalSlides: 3,
            // slideToClickedSlide: true,
            navigation: {
                nextEl: element.querySelector('.press-center-slider__arrow--next'),
                prevEl: element.querySelector('.press-center-slider__arrow--prev')
            },
           
        });
    });
}
