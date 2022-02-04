import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function ceoCardSlider() {
    const elements = Array.from(document.querySelectorAll('.js-ceo-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 1,
            watchOverflow: true,
            longSwipesRatio: 0.5,
            speed: 700,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoHeight: window.matchMedia('(max-width: 640px)').matches ? true : false,
            navigation: {
                nextEl: element.querySelector('.ceo__card-slider-arrow--prev'),
                prevEl: element.querySelector('.ceo__card-slider-arrow--next')
            }
        });
    });
}
