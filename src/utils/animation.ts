import { gsap, Power1 } from "gsap";

export const gsapSlideToggle = (
    height: string,
    target: HTMLElement,
    state: boolean
) => {
    gsap.set(target, {
        duration: 0.3,
        // display: state ? 'none' : 'block',
        visibility: state ? 0 : 1,
        height: state ? 0 : height,
        ease: Power1.easeOut,
    });
    gsap.to(target, {
        duration: 0.3,
        // display: state ? 'block' : 'none',
        visibility: state ? 1 : 0,
        height: state ? height : 0,
        ease: Power1.easeOut,
    });
};

export const gsapFade = (
    type: string,
    target: HTMLElement,
    duration: number = 0.5
) => {
    if (type === "in") {
        gsap.to(target, {
            duration: duration,
            opacity: 1,
            display: "block",
        });
    } else {
        gsap.to(target, {
            duration: duration,
            opacity: 0,
            display: "none",
        });
    }
};

export const fadeInitStyle = { opacity: 0, display: "none" };
