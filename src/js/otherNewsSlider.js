import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function otherNewsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-other-news-slider'));

    if (!window.matchMedia('(max-width: 640px)').matches) return;

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            watchOverflow: true
        });
    });
}
