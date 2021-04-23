import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function publicationsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-publications-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 12,
            loop: true,
            loopedSlides: 4,
            navigation: {
                nextEl: element.querySelector('.publications-slider__arrow--next'),
                prevEl: element.querySelector('.publications-slider__arrow--prev')
            },
            breakpoints: {
                641: {
                    spaceBetween: 18,
                }
            }
        });
    });
}
