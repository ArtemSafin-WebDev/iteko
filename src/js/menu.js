import { lockScroll, unlockScroll } from './scrollBlocker';

export default function menu() {
    const menu = document.querySelector('.page-header__menu');
    const burger = document.querySelector('.page-header__burger');

    if (!menu || !burger) return;
    let menuOpen = false;

    const openMenu = () => {
        if (menuOpen) return;

        lockScroll(menu);
        document.body.classList.add('menu-open');
        menuOpen = true;
    };

    const closeMenu = () => {
        if (!menuOpen) return;
        unlockScroll();
        document.body.classList.remove('menu-open');
        menuOpen = false;
    };


    burger.addEventListener('click', event => {
        event.preventDefault();
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    })
}
