import gsap from 'gsap';

class IntroCard {
    constructor(element, options) {
        this.element = element;

        if (!this.element) {
            console.error('Element not found');
            return;
        }

        this.ring = element.querySelector('.intro__item-card-ring');
        this.title = element.querySelector('.intro__item-card-title');
        this.services = element.querySelector('.intro__item-card-services-list');
        this.placement = options.placement;
        this.currentTransform = {
            x: 0,
            y: 0
        };
        console.log('Options', options);
        console.log('Card placemenet', this.placement);
    }

    getCard = () => {
        return this.element;
    };

    getOffset = () => {
        const topOffset = window.innerHeight * 0.08;
        if (this.placement === 'left top') {
            const cardScale = 1.2;
            const ringScale = 1.8;
            const y = -1 * this.element.getBoundingClientRect().top + (this.ring.offsetHeight * cardScale * ringScale) / 2 + topOffset;
            const x =
                -1 * this.element.getBoundingClientRect().left +
                (this.ring.offsetWidth * cardScale * ringScale) / 2 +
                document.querySelector('.intro__content').getBoundingClientRect().left;
            console.log('Ring scale', this.ring.offsetWidth * cardScale);

            return {
                x,
                y,
                cardScale,
                ringScale
            };
        } else if (this.placement === 'center top') {
            const cardScale = 0.8;
            const ringScale = 1.5;
            const y = -1 * this.element.getBoundingClientRect().top + (this.ring.offsetHeight * cardScale * ringScale * 1.6) / 2 + topOffset;
            const x = window.innerWidth / 2 - this.element.getBoundingClientRect().left;
            return {
                x,
                y,
                cardScale,
                ringScale
            };
        } else if (this.placement === 'right top') {
            const cardScale = 1.2;
            const ringScale = 1.7;

            const y = -1 * this.element.getBoundingClientRect().top + (this.ring.offsetHeight * cardScale * ringScale) / 2 + topOffset;
            const x =
                -1 *
                (window.innerWidth -
                    this.element.getBoundingClientRect().left -
                    this.element.offsetWidth * cardScale -
                    (window.innerWidth - document.querySelector('.intro__content').getBoundingClientRect().right));
            return {
                x,
                y,
                cardScale,
                ringScale
            };
        } else if (this.placement === 'left bottom') {
            const cardScale = 1;
            const ringScale = 1.5;
            const y = window.innerHeight - this.element.getBoundingClientRect().top - this.title.offsetHeight * cardScale - topOffset * 3;
            const x =
                -1 * this.element.getBoundingClientRect().left +
                (this.ring.offsetWidth * cardScale * ringScale) / 2 +
                document.querySelector('.intro__content').getBoundingClientRect().left;
            console.log('Ring scale', this.ring.offsetWidth * cardScale);
            // const x = 0;

            return {
                x,
                y,
                cardScale,
                ringScale
            };
        } else if (this.placement === 'center bottom') {
            const cardScale = 1;
            const ringScale = 1.7;
            const y = window.innerHeight - this.element.getBoundingClientRect().top - this.title.offsetHeight * cardScale - topOffset * 2;
            const x = window.innerWidth / 2 - this.element.getBoundingClientRect().left;
            return {
                x,
                y,
                cardScale,
                ringScale
            };
        } else if (this.placement === 'right bottom') {
            const cardScale = 1;
            const ringScale = 1.7;
            const y = window.innerHeight - this.element.getBoundingClientRect().top - this.title.offsetHeight * cardScale - topOffset * 2;

            const x =
                -1 *
                (window.innerWidth -
                    this.element.getBoundingClientRect().left -
                    this.element.offsetWidth * cardScale -
                    (window.innerWidth - document.querySelector('.intro__content').getBoundingClientRect().right));
            return {
                x,
                y,
                cardScale,
                ringScale
            };
        }
    };

    position = (forced = false) => {
        const offset = this.getOffset();

        let duration = forced ? 0 : 0.7;

        if (!offset) return;
        const tl = gsap.timeline();
        tl.to(this.element, {
            x: offset.x,
            y: offset.y,
            scale: offset.cardScale,
            duration
        })
            .to(
                this.services,
                {
                    autoAlpha: 0,
                    duration
                },
                0
            )
            .to(
                this.ring,
                {
                    scale: offset.ringScale,
                    duration
                },
                0
            );

        console.log('Offset', offset);
    };

    reposition = (forced = false) => {
        let duration = forced ? 0 : 0.7;

        const tl = gsap.timeline();
        tl.to(this.element, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration
        })
            .to(
                this.services,
                {
                    autoAlpha: 1,
                    duration
                },
                0
            )
            .to(
                this.ring,
                {
                    scale: 1,
                    duration
                },
                0
            );
    };

    focus = () => {};

    blur = () => {};
}

export default function introRemake() {
    const intro = document.querySelector('.js-intro');

    if (!intro) return;

    const cards = [
        new IntroCard(document.querySelector('#software-card'), {
            placement: 'left top',
            cardScale: 1.2,
            ringScale: 1.8
        }),
        new IntroCard(document.querySelector('#engineering-card'), {
            placement: 'center top',
            cardScale: 0.8,
            ringScale: 1.5
        }),
        new IntroCard(document.querySelector('#communication-card'), {
            placement: 'right top',
            cardScale: 1.2,
            ringScale: 1.7
        }),
        new IntroCard(document.querySelector('#consulting-card'), {
            placement: 'left bottom',
            cardScale: 1,
            ringScale: 1.5
        }),
        new IntroCard(document.querySelector('#security-card'), {
            placement: 'center bottom',
            cardScale: 1,
            ringScale: 1.7
        }),
        new IntroCard(document.querySelector('#outsorcing-card'), {
            placement: 'right bottom',
            cardScale: 1,
            ringScale: 1.7
        })
    ];

    const initialize = () => {
        cards.forEach(card => {
            card.position(true);
        });
    };

    const returnCards = () => {
        cards.forEach(card => {
            card.reposition();
        });
    };

    initialize();

    setTimeout(() => {
        // returnCards();
    }, 3000);
}
