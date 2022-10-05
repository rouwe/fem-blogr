function resetToggledNavItem(subNavResetCaller: HTMLUListElement | null): void {
    /**
     * Sets all header sub navigation's display value to none.
     * @param subNavResetCaller: sub navigation to be displayed.
     */
    const navWrapperClass = '.nav-wrapper';
    const navWrapper: Element | null = document.querySelector(navWrapperClass);
    if (navWrapper && subNavResetCaller) {
        const navItemWrapperClass = '.nav-item-wrapper';
        const navItemsWrapperArr: NodeListOf<HTMLLIElement> = navWrapper.querySelectorAll(navItemWrapperClass);
        if (navItemsWrapperArr.length > 0) {
            for (const navItemWrapper of navItemsWrapperArr) {
                const subNavTagName = 'ul'
                const subNavWrapper: HTMLUListElement| null = navItemWrapper.querySelector(subNavTagName);
                const navItemButtonClass = 'nav-item-button';
                const navItemButton: HTMLButtonElement = navItemWrapper.getElementsByClassName(navItemButtonClass)[0] as HTMLButtonElement;
                if (subNavWrapper) {
                    if (subNavResetCaller !== subNavWrapper) {
                        // Reset arrow transformation
                        const arrowsArr: NodeListOf<SVGSVGElement> = navItemButton.querySelectorAll('svg');
                        for (const arrow of arrowsArr) {
                            rotateElement(arrow, 0);
                        }
                        // Reset display
                        subNavWrapper.style.display = 'none';
                    }
                }
            }
        }
    }
}

function navItemClickHandler(this: HTMLElement): void {
    /**
     * Handler that toggles element display style.
     */
    const targetName = 'ul';
    const subNav: HTMLUListElement | null = this.querySelector(targetName);
    const arrowsArr: NodeListOf<SVGSVGElement> = this.querySelectorAll('svg');
    const visibleDisplay = 'flex';
    if (subNav && typeof subNav === 'object') {
        // Reset toggled nav
        resetToggledNavItem(subNav);
        // Toggle nav
        displayToggler(subNav, visibleDisplay);
        // Toggle arrows
        const deviceSize: DeviceSize = getDeviceSize();
        const deviceBreakPoints: DeviceBreakPoint = getDeviceBreakpoints();
        toggleNavItemArrows(arrowsArr, deviceSize, deviceBreakPoints);
    }
}

function navItemToggleEvent(id: string, eventHandler: () => void): void {
    /**
     * Add event listener to nav item elements.
     * @param id: selector used for targeting elements.
     */
    const navItemsArr: NodeListOf<Element> = document.querySelectorAll(id);
    if (navItemsArr && navItemsArr.length > 0) {
        for (const navItem of navItemsArr) {
            navItem.addEventListener('click', eventHandler);
        }
    } else {
        console.error(`Error: found(${navItemsArr.length}) element!`);
    }
}

function menuToggleHandler(openMenu: HTMLElement, closeMenu: HTMLElement): void {
    /**
     * Event handler that toggles mobile navigation menu.
     * @param openMenu: element for opening menu.
     * @param closeMenu: element for closing menu.
     */
    const [open, close] = ['block', 'none'];
    const navigationClass = '.header-actions';
    const navigation: HTMLDivElement | null = document.querySelector(navigationClass);
    if (navigation && typeof navigation === 'object') {
        // Toggle navigation
        displayToggler(navigation, open);
        const navigationDisplayState = navigation.style.display;
        if (navigationDisplayState === open) {
            // navigation is open
            displayToggler(openMenu, open);
            displayToggler(closeMenu, open);
        } else {
            // navigation is close
            displayToggler(openMenu, open);
            displayToggler(closeMenu, open);
        }
    }
}

function addMenuToggleEvent(togglerId: string, openMenuId: string, closeMenuId: string, eventHandler: (openMenu: HTMLElement, closeMenu: HTMLElement) => void): void {
    /**
     * Add event listener for toggling mobile menu.
     * @param togglerId: element to be toggled.
     * @param openMenuId: open menu element.
     * @param closeMenuId: close menu element.
     * @param eventHandler: toggle event handler.
     */
    if (togglerId && openMenuId && closeMenuId) {
        const toggler: HTMLElement | null = document.querySelector(togglerId);
        const openMenu: HTMLElement | null = document.querySelector(openMenuId);
        const closeMenu: HTMLElement | null = document.querySelector(closeMenuId);
        if (toggler && openMenu && closeMenu) {
            // Initialize openMenu & closeMenu display property
            initDisplayProp(openMenu, 'block');
            initDisplayProp(closeMenu, 'none');
            // Add event
            if (typeof toggler === 'object' && typeof toggler === 'object' && typeof toggler === 'object') {
                toggler.addEventListener('click', () => {
                    eventHandler(openMenu, closeMenu);
                });
            }
        }
    }
}