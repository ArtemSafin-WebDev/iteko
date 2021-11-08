import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function partnersSlider() {
    const elements = Array.from(document.querySelectorAll('.js-partners-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        let options = {
            slidesPerView: 2,
            slidesPerColumn: 4,
            spaceBetween: 20,
            slidesPerGroup: 2,
            slidesPerColumnFill: 'row',
            watchOverflow: true,
            speed: 700,
            threshold: 5,
            navigation: {
                nextEl: element.querySelector('.partners__slider-arrow--prev'),
                prevEl: element.querySelector('.partners__slider-arrow--next')
            }
        };

        if (window.matchMedia('(min-width: 768px)').matches) {
            options = {
                ...options,
                slidesPerView: 5,
                slidesPerColumn: 5,
                spaceBetween: 50,
                slidesPerGroup: 5
            };
        }
        if (window.matchMedia('(min-width: 968px)').matches) {
            options = {
                ...options,
                slidesPerView: 6,
                slidesPerColumn: 5,
                spaceBetween: 70,
                slidesPerGroup: 6
            };
        }
        if (window.matchMedia('(min-width: 1025px)').matches) {
            options = {
                ...options,
                slidesPerView: 8,
                slidesPerColumn: 5,
                spaceBetween: 70,
                slidesPerGroup: 8
            };
        }

        new Swiper(container, options);
    });
}
