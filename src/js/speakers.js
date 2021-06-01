import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function speakers() {
    const elements = Array.from(document.querySelectorAll('.js-speakers'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 20,
            threshold: 5,
            navigation: {
                nextEl: element.querySelector('.speakers__arrow--next'),
                prevEl: element.querySelector('.speakers__arrow--prev')
            },
            breakpoints: {
                641: {
                    spaceBetween: 40,
                    slidesPerView: 4,
                }
            }
        });
    })
}