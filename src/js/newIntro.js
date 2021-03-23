import gsap from 'gsap';
import { debounce } from 'lodash';

export default function newIntro() {
    const intro = document.querySelector('.js-intro');
    if (window.matchMedia('(max-width: 768px)').matches || !intro) return;
    const RESIZE_DEBOUNCE = 300;
    const CARD_TRANSITION_DURATION = 1.2;
    const CARD_ACTIVATION_DURATION = 0.6;

    const elements = {
        slogan: intro.querySelector('.intro__slogan'),
        pane: intro.querySelector('.intro__pane'),
        chaosViewBtn: intro.querySelector('.js-chaos-view'),
        orderedViewBtn: intro.querySelector('.js-ordered-view'),
        controls: intro.querySelector('.intro__controls'),
        introItemsLeftCol: intro.querySelector('.intro__items-left-col'),
        introNews: intro.querySelector('.intro__news')
    };

    const state = {
        animating: false,
        mode: 'order',
        cardChosen: false,
        activeCard: null
    };

    const cards = [
        {
            card: intro.querySelector('#communication-card'),
            cardMultiplier: 1.2,
            ringMultiplier: 1.4,
            cardActiveMultiplier: 1.2,
            ringActiveMultiplier: 1.8,
            active: false,
            paneOffsetFormula: item => {
                // const cardContent = item.card.querySelector('.intro__item-card-content');
                const hiddenContent = item.card.querySelector('.js-intro-card-hidden-content');

                const cardContentRight = item.card.getBoundingClientRect().right;
                const cardProductsRight = hiddenContent.getBoundingClientRect().right;
                const controlsOffset = parseFloat(window.getComputedStyle(elements.controls).right);

                const x = -1 * (cardProductsRight - cardContentRight + controlsOffset);
                const y = `+=${window.innerHeight * 0.1}`;

                return {
                    x,
                    y
                };
            },
            cardOffsetFormula: item => {
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
        },
        {
            card: intro.querySelector('#engineering-card'),
            cardMultiplier: 0.8,
            ringMultiplier: 1.2,
            cardActiveMultiplier: 1.2,
            ringActiveMultiplier: 2.1,
            
            active: false,
            cardOffsetFormula: item => {
                const x = -1 * window.innerWidth * 0.1;
                const y =
                    -1 *
                    (item.card.getBoundingClientRect().top -
                        document.querySelector('.page-header').offsetHeight -
                        (item.card.querySelector('.intro__item-card-ring').offsetHeight * item.ringMultiplier) / 2);

                return {
                    x,
                    y
                };
            },
            paneOffsetFormula: item => {
                const x = `+=${item.card.offsetWidth * 0.3}`;
                const y = `+=${item.card.offsetHeight * 1.2}`;

                return {
                    x, y
                }
            },
            activeOffsetFormula: item => {
                const x = `-=${item.card.offsetWidth * 0.4}`;
                const y = `-=${item.card.offsetHeight * 1.2}`;

                return {
                    x, y
                }
            },
            exitOffsetFormula: item => {
                const x = `+=${item.card.offsetWidth * 0.4}`;
                const y = `+=${item.card.offsetHeight * 1.2}`;

                return {
                    x, y
                }
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
            console.log('Moving to position card', card);
            if (!card) return;
            const ring = card.querySelector('.intro__item-card-ring');
            const servicesList = card.querySelector('.intro__item-card-services-list');
            const offset = cardOffsetFormula(item);
            console.log('Calculated offset', offset);
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

    const returnCardsToOriginalPositions = (forced = false) => {
        if (state.animating) return;
        lock();

        const tl = gsap.timeline({
            onComplete: () => {
                unlock();
            }
        });

        if (forced) {
            unlock();
        }

        cards.forEach(item => {
            const { card } = item;
            console.log('Moving to original position card', card);
            if (!card) return;
            const ring = card.querySelector('.intro__item-card-ring');
            const servicesList = card.querySelector('.intro__item-card-services-list');
            const hiddenContent = card.querySelector('.js-intro-card-hidden-content');

            tl.to(
                card,
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );

            tl.to(
                ring,
                {
                    scale: 1,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );

            tl.to(
                hiddenContent,
                {
                    autoAlpha: 0,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );

            tl.to(
                servicesList,
                {
                    autoAlpha: 1,
                    duration: forced ? 0 : CARD_TRANSITION_DURATION
                },
                0
            );
        });
    };

    const activateCard = card => {
        if (state.cardChosen || state.animating || state.mode === 'order') return;

        const item = cards.find(item => item.card === card);

        if (!item) {
            console.error('Card not found in cards list');
            return;
        }
        state.cardChosen = true;
        state.activeCard = card;
        card.classList.add('active');
        lock();

        const ring = card.querySelector('.intro__item-card-ring');
        const servicesList = card.querySelector('.intro__item-card-services-list');
        const hiddenContent = card.querySelector('.js-intro-card-hidden-content');

        const paneOffset = item.paneOffsetFormula(item);

        console.log('Pane offset for card', paneOffset);

        const tl = gsap.timeline({
            onComplete: () => {
                unlock();
            }
        });

        tl.to(
            item.card,
            {
             
                scale: item.cardActiveMultiplier,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            hiddenContent,
            {
                autoAlpha: 1,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            elements.pane,
            {
                x: paneOffset.x,
                y: paneOffset.y,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            ring,
            {
                scale: item.ringActiveMultiplier,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            servicesList,
            {
                autoAlpha: 1,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            elements.slogan,
            {
                autoAlpha: 0.5,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        if (item.activeOffsetFormula) {
            const activeOffset = item.activeOffsetFormula(item);
            console.log('Active offset on enter', activeOffset)
            tl.to(
                item.card,
                {
                    x: activeOffset.x,
                    y: activeOffset.y,
                    duration: CARD_ACTIVATION_DURATION
                },
                0
            );
        }
    };

    const deactivateCurrentCard = (onDeactivation) => {
        if (!state.cardChosen || !state.activeCard || state.animating || state.mode === 'order') return;
        const card = state.activeCard;
        const item = cards.find(item => item.card === card);
        card.classList.remove('active');
        if (!item) {
            console.error('Card not found in cards list');
            return;
        }
        lock();

        const ring = card.querySelector('.intro__item-card-ring');
        const servicesList = card.querySelector('.intro__item-card-services-list');
        const hiddenContent = card.querySelector('.js-intro-card-hidden-content');

        const tl = gsap.timeline({
            onComplete: () => {
                state.cardChosen = false;
                state.activeCard = null;
                unlock();

                if (typeof onDeactivation === 'function') {
                    onDeactivation();
                }
            }
        });

        tl.to(
            hiddenContent,
            {
                autoAlpha: 0,
                duration: 0.3
            },
            0
        );

        tl.to(
            item.card,
            {
               
                scale: item.cardMultiplier,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            elements.pane,
            {
                x: 0,
                y: 0,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            ring,
            {
                scale: item.ringMultiplier,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            servicesList,
            {
                autoAlpha: 0,
                duration: CARD_ACTIVATION_DURATION
            },
            0
        );

        tl.to(
            elements.slogan,
            {
                autoAlpha: 1,
                duration: 0.6
            },
            0
        );


        if (item.exitOffsetFormula) {
            const activeOffset = item.exitOffsetFormula(item);
            console.log('Active offset on exit', activeOffset)
            tl.to(
                item.card,
                {
                    x: activeOffset.x,
                    y: activeOffset.y,
                    duration: CARD_ACTIVATION_DURATION
                },
                0
            );
        }
    };

    const enterChaosMode = (forced = false) => {
        if (state.animating) return;
        state.mode = 'chaos';
        state.cardChosen = false;
        state.activeCard = null;
        elements.chaosViewBtn.classList.add('active');
        elements.orderedViewBtn.classList.remove('active');

        const tl = gsap.timeline();

        tl.to(elements.introItemsLeftCol, {
            autoAlpha: 0,
            duration: 0.4
        });

        tl.to(
            elements.slogan,
            {
                autoAlpha: 1,
                duration: 0.4
            },
            0
        );

        tl.to(
            elements.introNews,
            {
                autoAlpha: 1,
                duration: 0.4
            },
            0
        );

        moveCardsToPositions(forced);

        return [tl];
    };

    const enterOrderMode = (forced = false) => {
        if (state.animating) return;
        state.mode = 'order';
        state.cardChosen = false;
        state.activeCard = null;
        elements.chaosViewBtn.classList.remove('active');
        elements.orderedViewBtn.classList.add('active');

        const tl = gsap.timeline();

        tl.to(elements.introItemsLeftCol, {
            autoAlpha: 1,
            duration: forced ? 0 : 0.4
        });

        tl.to(
            elements.slogan,
            {
                autoAlpha: 0,
                duration: forced ? 0 : 0.4
            },
            0
        );

        tl.to(
            elements.pane,
            {
                x: 0,
                y: 0,
                duration: forced ? 0 : 0.4
            },
            0
        );

        tl.to(
            elements.introNews,
            {
                autoAlpha: 0,
                duration: forced ? 0 : 0.4
            },
            0
        );

        returnCardsToOriginalPositions(forced);
    };

    const initialize = async () => {
        try {
            await Promise.all(enterChaosMode(true));
        } catch (err) {
            console.error(err);
            return;
        }
        const tl = gsap.timeline();

        tl.to(elements.pane, {
            autoAlpha: 1,
            duration: 0.4
        });
    };

    initialize();

    elements.orderedViewBtn.addEventListener('click', event => {
        event.preventDefault();

        enterOrderMode();
    });
    elements.chaosViewBtn.addEventListener('click', event => {
        event.preventDefault();

        enterChaosMode();
    });

    intro.addEventListener('mouseover', event => {
        if (event.target.matches('.intro__item-card') || event.target.closest('.intro__item-card')) {
            const card = event.target.matches('.intro__item-card') ? event.target : event.target.closest('.intro__item-card');

            if (state.cardChosen && card !== state.activeCard) {
                deactivateCurrentCard(() => {
                    activateCard(card);
                });
            } else {
                activateCard(card);
            }
            
        } else {
            deactivateCurrentCard();
        }
    });

    window.addEventListener(
        'resize',
        debounce(() => {
            if (state.mode === 'chaos') {
                enterOrderMode(true);
                enterChaosMode(true);
            }
        }, RESIZE_DEBOUNCE)
    );
}
