import { Navigation, Swiper, Mousewheel } from 'swiper';

Swiper.use([Navigation]);
Swiper.use([Mousewheel]);

export default function solutionHistoryIteko() {
    const elements = Array.from(document.querySelectorAll('.solution-history'));

    elements.forEach(element => {
        const yearsList = element.querySelector('.solution-history__years-list-container');
        const annotationsList = element.querySelector('.solution-history__annotations-list-container');

        const yearsArr = Array.from(element.querySelectorAll('.solution-history__year-item'));
        const annotationsArr = Array.from(element.querySelectorAll('.solution-history__annotation-item'));
        const yearUpNumber = element.querySelector('.solution-history__year-up-number-wrapper');
        const yearDownNumber = element.querySelector('.solution-history__year-down-number-wrapper');

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
            slidesPerView: 'auto',
            spaceBetween: 84,
            mousewheel: true
        });

        swiperYears.on('slideChange', () => {
            setCurrentYear(swiperYears.activeIndex, yearsArr[swiperYears.activeIndex].value);
        });

        swiperAnnotation.on('slideChange', () => {
            setCurrentYear(swiperAnnotation.activeIndex, annotationsArr[swiperAnnotation.activeIndex].value);
        });

        const setCurrentYear = (index, yearValue) => {
            swiperYears.slideTo(index, 300);
            swiperAnnotation.slideTo(index, 300);

            yearUpNumber.innerText = yearValue.slice(0, 2);
            yearDownNumber.innerText = yearValue.slice(2, 4);

            if (index === 0) {
                annotationsList.classList.remove('solution-history__up-silencing-block');
            }

            if (index <= 7) {
                yearsList.classList.remove('solution-history__up-silencing-block');
            } else {
                yearsList.classList.add('solution-history__up-silencing-block');
            }

            if (index === annotationsArr.length - 1) {
                annotationsList.classList.remove('solution-history__down-silencing-block');
            } else {
                annotationsList.classList.add('solution-history__down-silencing-block');
            }

            if (index >= yearsArr.length - 6) {
                yearsList.classList.remove('solution-history__down-silencing-block');
            } else {
                yearsList.classList.add('solution-history__down-silencing-block');
            }
        };

        swiperYears.slideTo(6, 300);
        swiperAnnotation.slideTo(6, 300);

        yearsArr.forEach((yearItem, index) => {
            yearItem.onclick = () => {
                setCurrentYear(index, yearItem.value);
            };
        });

        annotationsArr.forEach((annotationItem, index) => {
            annotationItem.onclick = () => {
                setCurrentYear(index, annotationItem.value);
            };
        });
    });
}
