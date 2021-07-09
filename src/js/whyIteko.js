export default function whyIteko() {
    const elements = Array.from(document.querySelectorAll('.why-iteko'));

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.why-iteko__card'));

        const calculateOffsets = () => {
            cards.forEach(card => {
                const category = card.querySelector('.why-iteko__card-category');

                card.style.setProperty('--offset', category.offsetWidth + 'px');
            });
        };

        calculateOffsets();

        window.addEventListener('resize', () => {
            calculateOffsets();
        })
    });
}
