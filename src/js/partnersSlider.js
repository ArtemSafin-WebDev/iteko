import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function partnersSlider() {
    const elements = Array.from(document.querySelectorAll('.js-partners-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 2,
            slidesPerColumn: 4,
            spaceBetween: 20,
            slidesPerGroup: 1,
            slidesPerColumnFill: 'row',
            watchOverflow: true,
            threshold: 5,
            navigation: {
                nextEl: element.querySelector('.partners__slider-arrow--prev'),
                prevEl: element.querySelector('.partners__slider-arrow--next')
            },
            breakpoints: {
                768: {
                    slidesPerView: 5,
                    slidesPerColumn: 5,
                    spaceBetween: 50,
                    slidesPerGroup: 2,
                },
                968: {
                    slidesPerView: 6,
                    slidesPerColumn: 5,
                    spaceBetween: 70,
                    slidesPerGroup: 2,
                },
                1025: {
                    slidesPerView: 8,
                    slidesPerColumn: 5,
                    spaceBetween: 70,
                    slidesPerGroup: 2,
                }
            }
        });
    });
}
