import { Swiper, Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

export default function solutionExamples() {
    const elements = Array.from(document.querySelectorAll('.js-solution-examples-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        new Swiper(container, {
            watchOverflow: true,
            touchStartPreventDefault: false,
            speed: 700,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: element.querySelector('.solution-examples__arrow--next'),
                prevEl: element.querySelector('.solution-examples__arrow--prev')
            },
            pagination: {
                el: element.querySelector('.solution-examples__slider-pagination'),
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                641: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        });
    });
}
