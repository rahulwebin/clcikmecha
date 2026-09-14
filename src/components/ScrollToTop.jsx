import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }

        // Delay refresh slightly to ensure content has started rendering
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    }, [pathname, lenis]);

    return null;
};

export default ScrollToTop;
