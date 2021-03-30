import gsap from 'gsap';

class IntroCard {
    constructor(element, options) {
        this.element = element;

        if (!this.element) {
            console.error('Element not found');
            return;
        }

        this.ring = element.querySelector('.intro__item-card-ring');
        this.title = element.querySelector('.intro__item-card-title')
        this.services = element.querySelector('.intro__item-card-services-list');
        this.placement = options.placement;
        this.currentTransform = {
            x: 0,
            y: 0
        };
        console.log('Options', options);
        console.log('Card placemenet', this.placement);
    }

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
            const cardScale = 0.8;
            const ringScale = 1.5;
            const y = window.innerHeight - this.element.getBoundingClientRect().top - this.element.offsetHeight * cardScale - topOffset;
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
            const ringScale = 1.4;
            const y = window.innerHeight - this.element.getBoundingClientRect().top - this.element.offsetHeight * cardScale - topOffset;
            const x = window.innerWidth / 2 - this.element.getBoundingClientRect().left;
            return {
                x,
                y,
                cardScale,
                ringScale
            };
        }
    };

    position = () => {
        const offset = this.getOffset();

        if (!offset) return;
        const tl = gsap.timeline();
        tl.to(this.element, {
            x: offset.x,
            y: offset.y,
            scale: offset.cardScale
        })
            .to(
                this.services,
                {
                    autoAlpha: 0,
                    duration: 0.3
                },
                0
            )
            .to(
                this.ring,
                {
                    scale: offset.ringScale,
                    duration: 0.3
                },
                0
            );

        console.log('Offset', offset);
    };

    reposition = () => {};

    open = () => {};

    close = () => {};

    hide = () => {};
}

export default function introRemake() {
    const intro = document.querySelector('.js-intro');

    if (!intro) return;

    const cards = [
        new IntroCard(document.querySelector('#software-card'), {
            placement: 'left top'
        }),
        new IntroCard(document.querySelector('#engineering-card'), {
            placement: 'center top'
        }),
        new IntroCard(document.querySelector('#communication-card'), {
            placement: 'right top'
        }),
        new IntroCard(document.querySelector('#consulting-card'), {
            placement: 'left bottom'
        }),
        new IntroCard(document.querySelector('#security-card'), {
            placement: 'center bottom'
        })
    ];

    const initialize = () => {
        cards.forEach(card => {
            card.position();
        });
    };

    initialize();
}
