import gsap from 'gsap';


export default function solutionAccordions() {
    const accordions = Array.from(document.querySelectorAll('.solution-description__accordions-list-item'));


    accordions.forEach(accordion => {
        const btn = accordion.querySelector('.solution-description__accordions-btn');
        const content = accordion.querySelector('.solution-description__accordions-content');
        btn.addEventListener('click', event => {
            event.preventDefault();

            if (accordion.classList.contains('active')) {
                accordion.classList.remove('active')
                gsap.to(content, {
                    height: 0,
                    duration: 0.4
                })
            } else {
                accordion.classList.add('active')
                gsap.to(content, {
                    height: 'auto',
                    duration: 0.4
                })
            }
        })
    })
}