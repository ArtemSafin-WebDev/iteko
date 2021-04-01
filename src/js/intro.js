export default function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    elements.forEach(element => {
        const sectors = Array.from(element.querySelectorAll('.intro__cards-sector'));


        sectors.forEach(sector => {
            sector.addEventListener('mouseenter', () => {
                sector.classList.add('active');
                sectors.forEach(otherSector => {
                    if (otherSector === sector) {
                        otherSector.classList.remove('faded')
                    } else {
                        otherSector.classList.add('faded')
                    }
                });
            })
            sector.addEventListener('mouseleave', () => {
                sector.classList.remove('active');
                sectors.forEach(sector => {
                    sector.classList.remove('faded')
                })
            })
        })
    })
}