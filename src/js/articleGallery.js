import { Swiper, Thumbs, Navigation } from 'swiper';

Swiper.use([Thumbs, Navigation]);

export default function articleGallery() {
    const elements = Array.from(document.querySelectorAll('.js-article-gallery'));

    elements.forEach(element => {
        const mainContainer = element.querySelector('.article-content__gallery-main-slider .swiper-container');
        const thumbsContainer = element.querySelector('.article-content__gallery-thumbs-slider .swiper-container');
        const mainSliderOptions = {
            watchOverflow: true,
            spaceBetween: 0,
            thumbs: {},

            navigation: {
                nextEl: element.querySelector('.article-content__gallery-arrow--next'),
                prevEl: element.querySelector('.article-content__gallery-arrow--prev')
            }
        };

        mainSliderOptions.thumbs.swiper = new Swiper(thumbsContainer, {
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 14,
            centerInsufficientSlides: window.matchMedia("(max-width: 640px)").matches ? false : true,
            breakpoints: {
                641: {
                    spaceBetween: 16
                }
            }
        });

        new Swiper(mainContainer, mainSliderOptions);
    });
}
