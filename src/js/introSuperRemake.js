import gsap from 'gsap';
import { debounce } from 'lodash';

export default function introSuperRemake() {
    const intro = document.querySelector('.js-intro');

    if (!intro) return;

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

    const lock = () => {
        state.animating = true;
        intro.classList.add('locked');
    };

    const unlock = () => {
        state.animating = false;
        intro.classList.remove('locked');
    };

    const cards = [
        {
            card: document.querySelector('#software-card'),
            cardScale: 1.2,
            ringScale: 1.8,
            cardScaleActive: 1.2,
            ringScaleActive: 1.8,
            active: false,
            posBeforeFocus: {
                x: 0,
                y: 0
            },
            shiftAmount: item => {
                return window.innerWidth * 0.03;
            },
            positionFormula: item => {
                const ring = item.card.querySelector('.intro__item-card-ring');
                const topOffset = intro * 0.08;
                const y =
                    -1 * (item.card.getBoundingClientRect().top + window.pageYOffset) +
                    (ring.offsetHeight * item.cardScale * item.ringScale) / 2 +
                    topOffset;
                const x =
                    -1 * item.card.getBoundingClientRect().left +
                    (ring.offsetWidth * item.cardScale * item.ringScale) / 2 +
                    document.querySelector('.intro__content').getBoundingClientRect().left;
                return {
                    x,
                    y
                };
            },
            shiftFormula: amount => {
                const x = `-=${amount}`;
                const y = `-=${amount}`;

                return {
                    x,
                    y
                };
            },
            unshiftFormula: amount => {
                const x = `+=${amount}`;
                const y = `+=${amount}`;

                return {
                    x,
                    y
                };
            },
            focusFormula: item => {
                const x = intro.offsetWidth / 2 - item.card.getBoundingClientRect().left - (item.card.offsetWidth * item.cardScaleActive) / 2;
                const y =
                    intro.offsetHeight / 2 -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) -
                    (item.card.offsetHeight * item.cardScaleActive) / 2;

                return {
                    x,
                    y
                };
            }
        },
        {
            card: document.querySelector('#engineering-card'),
            cardScale: 0.8,
            ringScale: 1.5,
            cardScaleActive: 1.2,
            ringScaleActive: 1.8,
            active: false,
            posBeforeFocus: {
                x: 0,
                y: 0
            },
            shiftAmount: item => {
                return window.innerWidth * 0.06;
            },
            positionFormula: item => {
                const ring = item.card.querySelector('.intro__item-card-ring');
                const topOffset = intro * 0.08;
                const y =
                    -1 * (item.card.getBoundingClientRect().top + window.pageYOffset) +
                    (ring.offsetHeight * item.cardScale * item.ringScale * 1.6) / 2 +
                    topOffset;
                const x = window.innerWidth / 2 - item.card.getBoundingClientRect().left;
                return {
                    x,
                    y
                };
            },
            shiftFormula: amount => {
                const x = `-=${0}`;
                const y = `-=${amount}`;

                return {
                    x,
                    y
                };
            },
            unshiftFormula: amount => {
                const x = `+=${0}`;
                const y = `+=${amount}`;

                return {
                    x,
                    y
                };
            },
            focusFormula: item => {
                const x = intro.offsetWidth / 2 - item.card.getBoundingClientRect().left - (item.card.offsetWidth * item.cardScaleActive) / 2;
                const y =
                    intro.offsetHeight / 2 -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) -
                    (item.card.offsetHeight * item.cardScaleActive) / 2;

                return {
                    x,
                    y
                };
            }
        },
        {
            card: document.querySelector('#communication-card'),
            cardScale: 1.2,
            ringScale: 1.7,
            cardScaleActive: 1.2,
            ringScaleActive: 1.8,
            active: false,
            posBeforeFocus: {
                x: 0,
                y: 0
            },
            shiftAmount: item => {
                return window.innerWidth * 0.05;
            },
            positionFormula: item => {
                const ring = item.card.querySelector('.intro__item-card-ring');
                const topOffset = intro * 0.08;
                const y =
                    -1 * (item.card.getBoundingClientRect().top + window.pageYOffset) +
                    (ring.offsetHeight * item.cardScale * item.ringScale) / 2 +
                    topOffset;
                const x =
                    -1 *
                    (window.innerWidth -
                        item.card.getBoundingClientRect().left -
                        item.card.offsetWidth * item.cardScale -
                        (window.innerWidth - document.querySelector('.intro__content').getBoundingClientRect().right));
                return {
                    x,
                    y
                };
            },
            shiftFormula: amount => {
                const x = `+=${amount}`;
                const y = `-=${amount}`;

                return {
                    x,
                    y
                };
            },
            unshiftFormula: amount => {
                const x = `-=${amount}`;
                const y = `+=${amount}`;

                return {
                    x,
                    y
                };
            },
            focusFormula: item => {
                const x = intro.offsetWidth / 2 - item.card.getBoundingClientRect().left - (item.card.offsetWidth * item.cardScaleActive) / 2;
                const y =
                    intro.offsetHeight / 2 -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) -
                    (item.card.offsetHeight * item.cardScaleActive) / 2;

                return {
                    x,
                    y
                };
            }
        },
        {
            card: document.querySelector('#consulting-card'),
            cardScale: 1,
            ringScale: 1.5,
            cardScaleActive: 1.2,
            ringScaleActive: 1.8,
            active: false,
            posBeforeFocus: {
                x: 0,
                y: 0
            },
            shiftAmount: item => {
                return window.innerWidth * 0.04;
            },
            positionFormula: item => {
                const ring = item.card.querySelector('.intro__item-card-ring');
                const topOffset = intro.offsetHeight * 0.08;
                const title = item.card.querySelector('.intro__item-card-title');
                const y =
                    intro.offsetHeight -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) -
                    title.offsetHeight * item.cardScale -
                    topOffset * 3;
                const x =
                    -1 * item.card.getBoundingClientRect().left +
                    (ring.offsetWidth * item.cardScale * item.ringScale) / 2 +
                    document.querySelector('.intro__content').getBoundingClientRect().left;

                return {
                    x,
                    y
                };
            },
            shiftFormula: amount => {
                const x = `-=${amount}`;
                const y = `+=${amount}`;

                return {
                    x,
                    y
                };
            },
            unshiftFormula: amount => {
                const x = `+=${amount}`;
                const y = `-=${amount}`;

                return {
                    x,
                    y
                };
            },
            focusFormula: item => {
                const x = intro.offsetWidth / 2 - item.card.getBoundingClientRect().left - (item.card.offsetWidth * item.cardScaleActive) / 2;
                const y =
                    intro.offsetHeight / 2 -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) +
                    (item.card.offsetHeight * item.cardScaleActive) / 2;

                return {
                    x,
                    y
                };
            }
        },
        {
            card: document.querySelector('#security-card'),
            cardScale: 1,
            ringScale: 1.7,
            cardScaleActive: 1.2,
            ringScaleActive: 1.8,
            active: false,
            posBeforeFocus: {
                x: 0,
                y: 0
            },
            shiftAmount: item => {
                return window.innerWidth * 0.06;
            },
            positionFormula: item => {
                const ring = item.card.querySelector('.intro__item-card-ring');
                const topOffset = intro.offsetHeight * 0.08;
                const title = item.card.querySelector('.intro__item-card-title');
                const y =
                    intro.offsetHeight -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) -
                    title.offsetHeight * item.cardScale -
                    topOffset * 2;
                const x = window.innerWidth / 2 - item.card.getBoundingClientRect().left;
                return {
                    x,
                    y
                };
            },
            shiftFormula: amount => {
                const x = `-=${0}`;
                const y = `+=${amount}`;

                return {
                    x,
                    y
                };
            },
            unshiftFormula: amount => {
                const x = `+=${0}`;
                const y = `-=${amount}`;

                return {
                    x,
                    y
                };
            },
            focusFormula: item => {
                const x = intro.offsetWidth / 2 - item.card.getBoundingClientRect().left - (item.card.offsetWidth * item.cardScaleActive) / 2;
                const y =
                    intro.offsetHeight / 2 -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) +
                    (item.card.offsetHeight * item.cardScaleActive) / 2;

                return {
                    x,
                    y
                };
            }
        },
        {
            card: document.querySelector('#outsorcing-card'),
            cardScale: 1,
            ringScale: 1.7,
            cardScaleActive: 1.2,
            ringScaleActive: 1.8,
            active: false,
            posBeforeFocus: {
                x: 0,
                y: 0
            },
            shiftAmount: item => {
                return window.innerWidth * 0.03;
            },
            positionFormula: item => {
                const ring = item.card.querySelector('.intro__item-card-ring');
                const topOffset = intro.offsetHeight * 0.08;
                const title = item.card.querySelector('.intro__item-card-title');
                const y =
                    intro.offsetHeight -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) -
                    title.offsetHeight * item.cardScale -
                    topOffset * 2;
                const x =
                    -1 *
                    (window.innerWidth -
                        item.card.getBoundingClientRect().left -
                        item.card.offsetWidth * item.cardScale -
                        (window.innerWidth - document.querySelector('.intro__content').getBoundingClientRect().right));
                return {
                    x,
                    y
                };
            },
            shiftFormula: amount => {
                const x = `+=${amount}`;
                const y = `+=${amount}`;

                return {
                    x,
                    y
                };
            },
            unshiftFormula: amount => {
                const x = `-=${amount}`;
                const y = `-=${amount}`;

                return {
                    x,
                    y
                };
            },
            focusFormula: item => {
                const x = intro.offsetWidth / 2 - item.card.getBoundingClientRect().left - (item.card.offsetWidth * item.cardScaleActive) / 2;
                const y =
                    intro.offsetHeight / 2 -
                    (item.card.getBoundingClientRect().top + window.pageYOffset) +
                    (item.card.offsetHeight * item.cardScaleActive) / 2;

                return {
                    x,
                    y
                };
            }
        }
    ];

    const positionCard = (item, forced = false) => {
        let duration = forced ? 0 : 0.7;
        const services = item.card.querySelector('.intro__item-card-services-list');
        const ring = item.card.querySelector('.intro__item-card-ring');

        const position = item.positionFormula(item);

        if (!position) return;
        const tl = gsap.timeline();
        tl.to(item.card, {
            x: position.x,
            y: position.y,
            scale: item.cardScale,
            duration
        })
            .to(
                services,
                {
                    autoAlpha: 0,
                    duration
                },
                0
            )
            .to(
                ring,
                {
                    scale: item.ringScale,
                    duration
                },
                0
            );
    };

    const returnCard = (item, forced = false) => {
        let duration = forced ? 0 : 0.7;

        const services = item.card.querySelector('.intro__item-card-services-list');
        const ring = item.card.querySelector('.intro__item-card-ring');
        item.card.classList.remove('shifted');
        item.card.classList.remove('active');

        const tl = gsap.timeline();
        tl.to(item.card, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration
        })
            .to(
                services,
                {
                    autoAlpha: 1,
                    duration
                },
                0
            )
            .to(
                ring,
                {
                    scale: 1,
                    duration
                },
                0
            );
    };

    const shiftCard = item => {
        const offset = item.shiftFormula(item.shiftAmount());
        let duration = 0.7;
        if (!offset) return;
        const tl = gsap.timeline();
        item.card.classList.add('shifted');
        tl.to(item.card, {
            x: offset.x,
            y: offset.y,
            duration,
            autoAlpha: 0.6
        });
    };

    const unshiftCard = item => {
        const offset = item.unshiftFormula(item.shiftAmount());
        let duration = 0.7;
        if (!offset) return;
        const tl = gsap.timeline();
        item.card.classList.remove('shifted');
        tl.to(item.card, {
            x: offset.x,
            y: offset.y,
            duration,
            autoAlpha: 1
        });
    };

    const focusCard = item => {
        state.cardChosen = true;
        state.activeCard = item.card;
        cards.forEach(otherItem => {
            if (otherItem.card !== item.card) {
                otherItem.active = false;
                otherItem.card.classList.remove('active');
                shiftCard(otherItem);
            } else {
                otherItem.active = true;
                otherItem.card.classList.add('active');
            }
        });

        let duration = 0.7;
        const services = item.card.querySelector('.intro__item-card-services-list');
        const ring = item.card.querySelector('.intro__item-card-ring');
        const offset = item.focusFormula(item);

        console.log('Position X before transform', gsap.getProperty(item.card, "x"));
        console.log('Position Y before transform', gsap.getProperty(item.card, "y"));

        item.posBeforeFocus.x = gsap.getProperty(item.card, "x");
        item.posBeforeFocus.y = gsap.getProperty(item.card, "y");

        const tl = gsap.timeline();
        tl.to(item.card, {
            x: offset.x,
            y: offset.y,
            scale: item.cardScaleActive,
            duration
        })
            .to(
                services,
                {
                    autoAlpha: 1,
                    duration
                },
                0
            )
            .to(
                ring,
                {
                    scale: item.ringScaleActive,
                    duration
                },
                0
            );

       
    };

    const blurCard = item => {
        state.cardChosen = false;
        state.activeCard = null;
        cards.forEach(otherItem => {
            otherItem.active = false;
            otherItem.card.classList.remove('active');
        });

        let duration = 0.7;
        const services = item.card.querySelector('.intro__item-card-services-list');
        const ring = item.card.querySelector('.intro__item-card-ring');

        const tl = gsap.timeline();

        

        tl.to(item.card, {
            x: item.posBeforeFocus.x,
            y: item.posBeforeFocus.y,
            scale: item.cardScale,
            duration
        })
            .to(
                services,
                {
                    autoAlpha: 0,
                    duration
                },
                0
            )
            .to(
                ring,
                {
                    scale: item.ringScale,
                    duration
                },
                0
            );
    };

    const positionCards = (forced = false) => {
        cards.forEach(item => {
            positionCard(item, forced);
        });
    };

    const returnCards = (forced = false) => {
        cards.forEach(item => {
            returnCard(item, forced);
        });
        state.activeCard = null;
        state.cardChosen = false;
    };

    const enterChaosMode = () => {
        if (state.mode === 'chaos') return;
        state.mode = 'chaos';
        state.cardChosen = false;
        state.activeCard = null;
        elements.chaosViewBtn.classList.add('active');
        elements.orderedViewBtn.classList.remove('active');
        positionCards();
    };

    const enterOrderMode = () => {
        if (state.mode === 'order') return;
        state.mode = 'order';
        state.cardChosen = false;
        state.activeCard = null;
        elements.chaosViewBtn.classList.remove('active');
        elements.orderedViewBtn.classList.add('active');
        returnCards();
    };

    const initialize = () => {
        state.mode = 'chaos';
        state.cardChosen = false;
        state.activeCard = null;
        elements.chaosViewBtn.classList.add('active');
        elements.orderedViewBtn.classList.remove('active');
        positionCards(true);

        const tl = gsap.timeline();

        tl.to(elements.pane, {
            autoAlpha: 1,
            duration: 0.4
        });
    };

    elements.orderedViewBtn.addEventListener('click', event => {
        event.preventDefault();

        enterOrderMode();
    });
    elements.chaosViewBtn.addEventListener('click', event => {
        event.preventDefault();

        enterChaosMode();
    });

    window.addEventListener(
        'resize',
        debounce(() => {
            if (state.mode === 'chaos') {
                returnCards(true);
                positionCards(true);
            }
        }, 400)
    );

    setTimeout(() => {
        focusCard(cards[3]);

        setTimeout(() => {
            blurCard(cards[3]);
        }, 4000);
    }, 2000);

    // setTimeout(() => {
    //     cards.forEach(item => {
    //         shiftCard(item);
    //     });

    //     setTimeout(() => {
    //         cards.forEach(item => {
    //             unshiftCard(item);
    //         });
    //     }, 2000);
    // }, 2000);

    initialize();
}
