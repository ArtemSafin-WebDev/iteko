export default function careerCatalogFilter() {
    function initializeCareerCatalogFilter() {
        const elements = Array.from(document.querySelectorAll('.js-career-catalog-filter'));

        elements.forEach(element => {
            const btn = element.querySelector('.career-catalog__filter-btn');

            btn.addEventListener('click', event => {
                event.preventDefault();
                element.classList.toggle('active');
            });

            element.addEventListener('mouseenter', () => {
                element.classList.add('active');
            });
            element.addEventListener('mouseleave', () => {
                element.classList.remove('active');
            });

            document.addEventListener('click', event => {
                if (event.target.matches('.js-career-catalog-filter') || event.target.closest('.js-career-catalog-filter')) return;
                element.classList.remove('active');
            });
        });
    }

    initializeCareerCatalogFilter();
    
    window.initializeCareerCatalogFilter = initializeCareerCatalogFilter;
}
