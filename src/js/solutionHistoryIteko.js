import { Navigation, Swiper } from 'swiper';

Swiper.use([Navigation]);

export default function solutionHistoryIteko() {
    const elements = Array.from(document.querySelectorAll('.solution-history'));

    elements.forEach(element => {
        const swiperYears = new Swiper(element.querySelector('.solution-history__years-list-container'), {
            direction: 'vertical',
            slidesPerView: 13,
            spaceBetween: 20,
            mousewheel: true,
            centeredSlides: true,
            centerSlidesBounds: true
        });

        const swiperAnnotation = new Swiper(element.querySelector('.solution-history__annotations-list-container'), {
            direction: 'vertical',
            slidesPerView: 1.1,
            spaceBetween: 84,
            mousewheel: true
        });

        swiperYears.slideTo(6, 300);
        swiperAnnotation.slideTo(6, 300);

        const yearsList = Array.from(element.querySelectorAll('.solution-history__year-item'));
        const annotationsList = Array.from(element.querySelectorAll('.solution-history__annotation-item'));

        yearsList.forEach((yearItem, index) => {
            yearItem.onclick = () => {
                swiperYears.slideTo(index, 300);
                swiperAnnotation.slideTo(index, 300);
            };
        });

        annotationsList.forEach((annotationItem, index) => {
            annotationItem.onclick = () => {
                swiperYears.slideTo(index, 300);
                swiperAnnotation.slideTo(index, 300);
            };
        });
    });
}
