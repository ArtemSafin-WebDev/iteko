import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function solutionGallerySlider() {
    const elements = Array.from(document.querySelectorAll('.js-solution-gallery-slider'));

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
            threshold: window.matchMedia('(max-width: 640px)').matches ? 0 : 4,

            navigation: {
                nextEl: element.querySelector('.solution-gallery__slider-arrow--next'),
                prevEl: element.querySelector('.solution-gallery__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    spaceBetween: 0,
                    speed: 1200
                }
            }
        });
    });
}
