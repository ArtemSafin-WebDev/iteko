import gsap from 'gsap';
import { debounce } from 'lodash';

export default function intro() {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.intro__item-card'));
        const introItemsLeftCol = element.querySelector('.intro__items-left-col');
        const pane = element.querySelector('.intro__pane');
        const controls = element.querySelector('.intro__controls');
        const slogan = element.querySelector('.intro__slogan');
        const chaosViewBtn = element.querySelector('.js-chaos-view');
        const orderedViewBtn = element.querySelector('.js-ordered-view');
        const introNews = element.querySelector('.intro__news');

        let cardTransitionDuration = 1.2;
        let mode = '';

        let animating = false;

        let movedToCardOne = false;

        const calculateCard0Offset = () => {
            const controlsOffset = parseFloat(window.getComputedStyle(controls).right);
            return {
                x: document.documentElement.clientWidth - cards[0].getBoundingClientRect().left - cards[0].offsetWidth * 1.4 - controlsOffset - controls.offsetWidth,
                y:
                    -1 *
                    (cards[0].getBoundingClientRect().top -
                        document.querySelector('.page-header').offsetHeight -
                        (cards[0].querySelector('.intro__item-card-ring').offsetHeight * 1.6) / 2)
            };
        };

        let card0Offset = calculateCard0Offset();

        console.log('Card0Offset', card0Offset);

        const moveCardOneForPosition = (forced = false) => {
            if (animating) return;
            if (!forced) {
                animating = true;
                element.classList.add('locked');
            }

            const ring = cards[0].querySelector('.intro__item-card-ring');
            const servicesList = cards[0].querySelector('.intro__item-card-services-list');
            const tl = gsap.timeline({
                onComplete: () => {
                    animating = false;
                    element.classList.remove('locked');
                }
            });

            tl.to(cards[0], {
                x: card0Offset.x,
                y: card0Offset.y,
                scale: 1.4,
                duration: forced ? 0 : cardTransitionDuration
            });

            tl.to(
                ring,
                {
                    scale: 1.6,
                    duration: forced ? 0 : cardTransitionDuration
                },
                0
            );
            tl.to(
                servicesList,
                {
                    autoAlpha: 0,
                    duration: forced ? 0 : cardTransitionDuration
                },
                0
            );

            return tl;
        };

        const moveToCardOne = () => {
            if (movedToCardOne || animating || mode === 'order') return;
            movedToCardOne = true;
            animating = true;
            element.classList.add('locked');
            const ring = cards[0].querySelector('.intro__item-card-ring');
            const servicesList = cards[0].querySelector('.intro__item-card-services-list');
            const products = cards[0].querySelector('.intro__item-card-products');
            const cardContent = cards[0].querySelector('.intro__item-card-content');
            const tl = gsap.timeline({
                onComplete: () => {
                    animating = false;
                    element.classList.remove('locked');
                }
            });
            tl.to(products, {
                autoAlpha: 1,
                duration: 0.3
            });

            const cardContentLeft = cardContent.getBoundingClientRect().right;
            const cardProductsLeft = products.getBoundingClientRect().right;
            const controlsOffset = parseFloat(window.getComputedStyle(controls).right);
            console.log({
                cardContentLeft,
                cardProductsLeft
            });

            tl.to(
                pane,
                {
                    x: -1 * (cardProductsLeft - cardContentLeft + controlsOffset),
                    y: `+=${window.innerHeight * 0.1}`,
                    duration: 0.6
                },
                0
            );

            tl.to(
                ring,
                {
                    scale: 2.3,
                    duration: 0.6
                },
                0
            );

            tl.to(
                servicesList,
                {
                    autoAlpha: 1,
                    duration: 0.6
                },
                0
            );

            tl.to(
                slogan,
                {
                    autoAlpha: 0.5,
                    duration: 0.6
                },
                0
            );
        };

        const moveFromCardOne = () => {
            if (!movedToCardOne || animating || mode === 'order') return;
            animating = true;
            element.classList.add('locked');

            const ring = cards[0].querySelector('.intro__item-card-ring');
            const servicesList = cards[0].querySelector('.intro__item-card-services-list');
            const products = cards[0].querySelector('.intro__item-card-products');

            const tl = gsap.timeline({
                onComplete: () => {
                    movedToCardOne = false;
                    animating = false;
                    element.classList.remove('locked');
                }
            });
            tl.to(products, {
                autoAlpha: 0,
                duration: 0.3
            });

            tl.to(
                pane,
                {
                    x: 0,
                    y: 0,
                    duration: 0.6
                },
                0
            );

            tl.to(
                ring,
                {
                    scale: 1.6,
                    duration: 0.6
                },
                0
            );

            tl.to(
                servicesList,
                {
                    autoAlpha: 0,
                    duration: 0.6
                },
                0
            );

            tl.to(
                slogan,
                {
                    autoAlpha: 1,
                    duration: 0.6
                },
                0
            );
        };

        const moveCardOneBack = (recalculate = false) => {
            if (animating) return;
            animating = true;
            element.classList.add('locked');
            const ring = cards[0].querySelector('.intro__item-card-ring');
            const servicesList = cards[0].querySelector('.intro__item-card-services-list');
            const products = cards[0].querySelector('.intro__item-card-products');
            const tl = gsap.timeline({
                onComplete: () => {
                    animating = false;
                    element.classList.remove('locked');

                    if (recalculate) {
                        card0Offset = calculateCard0Offset();
                    }
                }
            });
            tl.to(cards[0], {
                x: 0,
                y: 0,
                scale: 1,
                duration: cardTransitionDuration
            });

            tl.to(
                ring,
                {
                    scale: 1,
                    duration: cardTransitionDuration
                },
                0
            );
            tl.to(
                products,
                {
                    autoAlpha: 0,
                    duration: cardTransitionDuration
                },
                0
            );
            tl.to(servicesList, {
                autoAlpha: 1,
                duration: cardTransitionDuration
            });
        };

        const enterChaosMode = (forced = false) => {
            if (animating) return;
            mode = 'chaos';
            chaosViewBtn.classList.add('active');
            orderedViewBtn.classList.remove('active');
            const tl = gsap.timeline();
            tl.to(introItemsLeftCol, {
                autoAlpha: 0,
                duration: 0.4
            });

            tl.to(
                slogan,
                {
                    autoAlpha: 1,
                    duration: 0.4
                },
                0
            );

            tl.to(
                introNews,
                {
                    autoAlpha: 1,
                    duration: 0.4
                },
                0
            );

            moveCardOneForPosition(forced);

            return [tl];
        };

        const enterOrderMode = (recalculate = false) => {
            if (animating) return;
            mode = 'order';
            chaosViewBtn.classList.remove('active');
            orderedViewBtn.classList.add('active');
            const tl = gsap.timeline();

            tl.to(introItemsLeftCol, {
                autoAlpha: 1,
                duration: 0.4
            });

            tl.to(
                slogan,
                {
                    autoAlpha: 0,
                    duration: 0.4
                },
                0
            );

            tl.to(
                pane,
                {
                    x: 0,
                    y: 0,
                    duration: 0.4
                },
                0
            );

            tl.to(
                introNews,
                {
                    autoAlpha: 0,
                    duration: 0.4
                },
                0
            );

            moveCardOneBack(recalculate);
        };

        const initialize = async () => {
            console.log('Initializing');

            try {
                await Promise.all(enterChaosMode(true));
            } catch (err) {
                console.error(err);
                return;
            }

            console.log('Initialized');
            const tl = gsap.timeline();

            tl.to(pane, {
                autoAlpha: 1,
                duration: 0.4
            });
        };

        initialize();

        window.intro = {};
        window.intro.moveCardOneBack = moveCardOneBack;
        window.intro.moveCardOneForPosition = moveCardOneForPosition;
        window.intro.moveToCardOne = moveToCardOne;
        window.intro.enterOrderMode = enterOrderMode;
        window.intro.enterChaosMode = enterChaosMode;

        element.addEventListener('mouseover', event => {
            if (event.target.closest('.intro__item-card')) {
                moveToCardOne();
            } else {
                moveFromCardOne();
            }
        });

        cards[0].addEventListener('mouseleave', () => {
            moveFromCardOne();
        });

        window.addEventListener(
            'resize',
            debounce(() => {
                enterOrderMode(true);
            }, 300)
        );

        orderedViewBtn.addEventListener('click', event => {
            event.preventDefault();

            enterOrderMode();
        });

        chaosViewBtn.addEventListener('click', event => {
            event.preventDefault();

            enterChaosMode();
        });
    });
}
