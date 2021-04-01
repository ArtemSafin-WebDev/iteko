export default function intro() {
    if (window.matchMedia('(max-width: 640px)').matches) return;
    const elements = Array.from(document.querySelectorAll('.js-intro'));

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
}
