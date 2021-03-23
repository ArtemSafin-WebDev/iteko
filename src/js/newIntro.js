import gsap from 'gsap';
import { debounce } from 'lodash';

export default function newIntro() {
    const intro = document.querySelector('.js-intro');
    if (window.matchMedia('(max-width: 768px)').matches || !intro) return;
    const RESIZE_DEBOUNCE = 300;
    const CARD_TRANSITION_DURATION = 1.2;

    const elements = {
        slogan: intro.querySelector('.intro__slogan'),
        pane: intro.querySelector('.intro__pane'),
        chaosViewBtn: intro.querySelector('.js-chaos-view'),
        orderedViewBtn: intro.querySelector('.js-ordered-view'),
        controls: intro.querySelector('.intro__controls')
    };

    const state = {
        animating: false,
        mode: 'order'
    };

    const cards = [
        {
            card: intro.querySelector('#communication-card'),
            cardMultiplier: 1.2,
            ringMultiplier: 1.4,
            cardActiveMultiplier: 1.2,
            ringActiveMultiplier: 1.8,
            active: false,
            cardOffsetFormula: (item) => {
                const controlsOffset = parseFloat(window.getComputedStyle(elements.controls).right);
                const x =
                    document.documentElement.clientWidth -
                    item.card.getBoundingClientRect().left -
                    item.card.offsetWidth * item.cardMultiplier -
                    controlsOffset -
                    elements.controls.offsetWidth;

                const y =
                    -1 *
                    (item.card.getBoundingClientRect().top -
                        document.querySelector('.page-header').offsetHeight -
                        (item.card.querySelector('.intro__item-card-ring').offsetHeight * item.ringMultiplier) / 2);

                return {
                    x,
                    y
                };
            }
        }
    ];

    console.log('cards', cards);

    const lock = () => {
        state.animating = true;
        intro.classList.add('locked');
    };

    const unlock = () => {
        state.animating = false;
        intro.classList.remove('locked');
    };

    const moveCardsToPositions = (forced = false) => {
        if (state.animating) return;
        if (!forced) {
            lock();
        }

        const tl = gsap.timeline({
            onComplete: () => {
                unlock();
            }
        });
        cards.forEach(item => {
            const { card, cardMultiplier, cardOffsetFormula, ringMultiplier } = item;
            console.log('Moving to position card', card)
            if (!card) return;
            const ring = card.querySelector('.intro__item-card-ring');
            const servicesList = card.querySelector('.intro__item-card-services-list');
            const offset = cardOffsetFormula(item);
            console.log('Calculated offset', offset)
            tl.to(
                card,
                {
                    x: offset.x,
                    y: offset.y,
                    scale: cardMultiplier,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );

            tl.to(
                ring,
                {
                    scale: ringMultiplier,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );
            tl.to(
                servicesList,
                {
                    autoAlpha: 0,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );
        });

        return tl;
    };

    const initialize = () => {
        const tl = gsap.timeline();

        tl.to(elements.pane, {
            autoAlpha: 1,
            duration: 0.4
        });

        moveCardsToPositions(true);
    };

    initialize();

    window.addEventListener(
        'resize',
        debounce(() => {}, RESIZE_DEBOUNCE)
    );
}
