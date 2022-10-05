interface DeviceSize {
    width: number,
    height: number
};

interface DeviceBreakPoint {
    sm: number,
    md: number,
    lg: number,
    xlg: number,
    xxlg: number
};

function displayToggler<HTMLElementTagNameMap extends { style: CSSStyleDeclaration}>(
        targetElement: HTMLElementTagNameMap | null, displayProp: string
    ): void {
    /**
     * Toggles element display.
     * @param targetElement: element to toggle the display proper.
     * @param displayProp: display property value when visible.
     */
    type ChangeDisplay = (target: HTMLElementTagNameMap, state: string) => void;
    const toggleDisplay: ChangeDisplay = (target, state) => {
        target.style.display = state;
    }
    // Toggle
    if (targetElement && typeof targetElement === 'object') {
        const displayState = targetElement.style.display;
        switch(displayState) {
            case '':
            case 'none':
                toggleDisplay(targetElement, displayProp);
                break;
            case displayProp:
                toggleDisplay(targetElement, 'none');
        }
    }
}

function toggleNavItemArrows(arrowsArr: NodeListOf<SVGSVGElement>, deviceSize: DeviceSize, breakPoints: DeviceBreakPoint): void {
    /**
     * Toggles nav item 
     */
    const lightArrowClass = 'arrow-light';
    const darkArrowClass = 'arrow-dark';
    type ToggleArrow = (arrow: SVGSVGElement, transformRotateAngle: string) => void;
    const toggleArrow: ToggleArrow = (arrow, transformRotateAngle) => {
        switch(transformRotateAngle) {
            case '':
            case 'rotate(0deg)':
                rotateElement(arrow, 180);
                break;
            case 'rotate(180deg)':
                rotateElement(arrow, 0);
        };
    };
    for (const arrow of arrowsArr) {
        // Mobile device -> arrow-dark
        if (deviceSize.width < breakPoints.lg) {
            const arrowIsDark = arrow.classList.contains(darkArrowClass); 
            if (arrowIsDark) {
                const transformRotateAngle = arrow.style.transform;
                toggleArrow(arrow, transformRotateAngle);
            }
        } 
        // Desktop device -> arrow-light
        else {
            const arrowIsLight = arrow.classList.contains(lightArrowClass);
            if (arrowIsLight) {
                const transformRotateAngle = arrow.style.transform;
                toggleArrow(arrow, transformRotateAngle);
            }
        }
    }
}

function rotateElement<HTMLElementTagNameMap extends { style: CSSStyleDeclaration}>(
        targetElement: HTMLElementTagNameMap, angle: number
    ): void {
    /**
     * Rotates an element.
     * @param targetElement: element to rotate.
     * @param angle: angle value of an element.
     */

    targetElement.style.transform = `rotate(${angle}deg)`;
}

function getDeviceSize(): DeviceSize {
    /**
     * Returns the device width.
     */
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;
    const deviceSize: DeviceSize = {
        width: deviceWidth,
        height: deviceHeight
    }; 
    return deviceSize;
}

function getDeviceBreakpoints(): DeviceBreakPoint {
    const breakPointsObj: DeviceBreakPoint = {
        sm: 576,
        md: 768,
        lg: 992,
        xlg: 1200,
        xxlg: 1400
    }
    return breakPointsObj;
}

function initDisplayProp(targets: HTMLElement | HTMLElement[], initProp: string): void {
    /**
     * Initialize the display property of an element to be @displayProp or 'none'.
     * @param target: one or more elements.
     * @param initProp: be used for initializing display property.
     */
    if (targets && typeof targets === 'object') {
        if (targets instanceof Array) {
            for (const target of targets) {
                target.style.display = initProp;
            }
        } else {
            targets.style.display = initProp;
        }
    }
}