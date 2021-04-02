import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function solutionExamples() {
    const elements = Array.from(document.querySelectorAll('.js-solution-examples-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        new Swiper(container, {
            watchOverflow: true,
            touchStartPreventDefault: false,
            slidesPerView: 3,
            speed: 700,
            spaceBetween: 40,
            navigation: {
                nextEl: element.querySelector('.solution-examples__arrow--next'),
                prevEl: element.querySelector('.solution-examples__arrow--prev')
            }
        });
    });
}
