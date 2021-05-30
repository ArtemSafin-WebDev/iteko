import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function playersSlider() {
    const elements = Array.from(document.querySelectorAll('.js-players'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        new Swiper(container, {
            slidesPerView: 2,
            watchOverflow: true,
            spaceBetween: 40,
            threshold: 5,
            speed: 500,
            navigation: {
                nextEl: element.querySelector('.players__arrow--next'),
                prevEl: element.querySelector('.players__arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 60
                }
            }
        });
    });
}
