import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    if (!window.matchMedia('(max-width: 640px)').matches) {
        elements.forEach(element => {
            const sectors = Array.from(element.querySelectorAll('.intro__cards-sector'));
            const chaosView = element.querySelector('.js-chaos-view');
            const listView = element.querySelector('.js-ordered-view');

            sectors.forEach((sector, sectorIndex) => {
                sector.addEventListener('mouseenter', () => {
                    element.classList.add('hovered');
                    sector.classList.add('active');
                    sectors.forEach((otherSector, otherSectorIndex) => {
                        if (otherSector === sector) {
                            otherSector.classList.remove('faded');
                            element.classList.add(`sector-${otherSectorIndex + 1}-hovered`);
                        } else {
                            element.classList.remove(`sector-${otherSectorIndex + 1}-hovered`);
                            otherSector.classList.add('faded');
                        }
                    });
                });
                sector.addEventListener('mouseleave', () => {
                    sector.classList.remove('active');
                    element.classList.remove('hovered');
                    element.classList.remove(`sector-${sectorIndex + 1}-hovered`);
                    sectors.forEach(sector => {
                        sector.classList.remove('faded');
                    });
                });
            });


            window.returnToGrid = () => {
                const state = Flip.getState(document.querySelectorAll('.intro__card'));
                element.classList.add('returned-to-grid');
                Flip.from(state, {
                    duration: 2,
                    paused: false,
                    // ease: 'none'
                });
            };

            const enterChaosView = () => {
                chaosView.classList.add('active');
                listView.classList.remove('active');
                element.classList.remove('ordered-view');
              
            };

            const enterOrderView = () => {
                chaosView.classList.remove('active');
                listView.classList.add('active');
                element.classList.add('ordered-view');
                
                
            };

          

            if (chaosView) {
                chaosView.addEventListener('click', event => {
                    event.preventDefault();
                    enterChaosView();
                });
            }
            if (listView) {
                listView.addEventListener('click', event => {
                    event.preventDefault();
                    enterOrderView();
                });
            }
            chaosView.classList.add('active');
            listView.classList.remove('active');
            
        });
    } else {
        elements.forEach(element => {
            const scrollWrapper = element.querySelector('.intro__cards-wrapper');
            const scrollProgress = element.querySelector('.intro__scroll-progress');

            console.log('scroll wrapper offset width', scrollWrapper.offsetWidth, scrollWrapper.scrollWidth);

            if (scrollWrapper.scrollWidth <= scrollWrapper.offsetWidth) {
                scrollProgress.style.display = 'none';
                return;
            }

            scrollWrapper.addEventListener('scroll', () => {
                const progress = scrollWrapper.scrollLeft / (scrollWrapper.scrollWidth - scrollWrapper.offsetWidth);

                scrollProgress.style.setProperty('--scroll-progress', progress.toFixed(2));
                console.log('Progress', progress);
            });
        });
    }
}
