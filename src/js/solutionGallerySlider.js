import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function solutionGallerySlider() {
    const elements = Array.from(document.querySelectorAll('.js-solution-gallery-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const slides = Array.from(element.querySelectorAll('.swiper-slide'));

        new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            watchOverflow: true,
            loop: slides > 3 ? true : false,
            speed: 400,
            slideToClickedSlide: true,
            loopedSlides: 3,
            threshold: window.matchMedia('(max-width: 640px)').matches ? 0 : 3,

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
