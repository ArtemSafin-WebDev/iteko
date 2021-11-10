import { lockScroll, unlockScroll } from './scrollBlocker';
import gsap from 'gsap';

export default function menu() {
    const menu = document.querySelector('.page-header__menu');
    const burger = document.querySelector('.page-header__burger');
    const menuInner = document.querySelector('.page-header__menu-inner');
    const navLinkTexts = Array.from(document.querySelectorAll('.page-header__menu-nav-link-text'));
    const menuSolutionsHeadingText = document.querySelector('.page-header__menu-solutions-heading-text');
    const menuSolutionsListItems = Array.from(document.querySelectorAll('.page-header__menu-solutions-card'));
    const menuContacts = document.querySelector('.page-header__menu-contacts');

    if (!menu || !burger) return;
    let menuOpen = false;

    let activeTl = null;

    const openMenu = () => {
        if (menuOpen) return;

        if (activeTl) {
            activeTl.kill();
        }

        if (typeof window.closeSearchDropdown === 'function') {
            window.closeSearchDropdown();
        }

        lockScroll(menu);
        document.body.classList.add('menu-open');

        const tl = gsap.timeline();

        activeTl = tl;
        tl.fromTo(
            menu,
            {
                autoAlpha: 0,
                scaleY: 0
            },
            {
                autoAlpha: 1,
                duration: 0.5,
                scaleY: 1
            }
        )
            .fromTo(
                menuInner,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.3
                }
            )
            .fromTo(
                navLinkTexts,
                {
                    yPercent: 100
                },
                {
                    yPercent: 0,
                    duration: 0.8,
                    stagger: 0.1
                },
                '<'
            )
            .fromTo(
                menuSolutionsHeadingText,
                {
                    yPercent: 100
                },
                {
                    yPercent: 0,
                    duration: 0.8
                },
                '<'
            )
            .fromTo(
                menuSolutionsListItems,
                {
                    yPercent: 100
                },
                {
                    yPercent: 0,

                    duration: 0.8,
                    stagger: 0.1
                },
                '<'
            )
            .fromTo(
                menuContacts,
                {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    duration: 0.4
                },
                '<'
            );
        menuOpen = true;
    };

    const closeMenu = () => {
        if (!menuOpen) return;
        unlockScroll();
        document.body.classList.remove('menu-open');
        const tl = gsap.timeline();
        tl.to(menu, {
            autoAlpha: 0,
            duration: 0.3
        }).to(menuInner, {
            autoAlpha: 0,
            duration: 0.3
        });
        menuOpen = false;
    };


    window.openMenu = openMenu;
    window.closeMenu = closeMenu;

    burger.addEventListener('click', event => {
        event.preventDefault();
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}
