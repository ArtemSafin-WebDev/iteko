export default function searchDropdown() {
    const btn = document.querySelector('.page-header__search-btn');
    const dropdown = document.querySelector('.page-header__dropdown-search-form-wrapper');

    if (btn && dropdown) {
        btn.addEventListener('click', event => {
            event.preventDefault();
            dropdown.classList.toggle('active');
            btn.classList.toggle('active');
        });

        window.closeSearchDropdown = () => {
            dropdown.classList.remove('active');
            btn.classList.remove('active');
        }
    }
}
