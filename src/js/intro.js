export default function intro() {
  
    const elements = Array.from(document.querySelectorAll('.js-intro'));


    if (!window.matchMedia('(max-width: 640px)').matches) {
        elements.forEach(element => {
            const sectors = Array.from(element.querySelectorAll('.intro__cards-sector'));
    
            sectors.forEach(sector => {
                sector.addEventListener('mouseenter', () => {
                    element.classList.add('hovered');
                    sector.classList.add('active');
                    sectors.forEach(otherSector => {
                        if (otherSector === sector) {
                            otherSector.classList.remove('faded');
                        } else {
                            otherSector.classList.add('faded');
                        }
                    });
                });
                sector.addEventListener('mouseleave', () => {
                    sector.classList.remove('active');
                    element.classList.remove('hovered');
                    sectors.forEach(sector => {
                        sector.classList.remove('faded');
                    });
                });
            });
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
                console.log('Progress', progress)
            })
        })
    }
   
}
