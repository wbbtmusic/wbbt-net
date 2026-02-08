import { useEffect, useRef } from 'react';

const useSmoothScroll = () => {
    const rafId = useRef<number | null>(null);
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);

    useEffect(() => {
        // Initialize with current scroll
        currentScroll.current = window.scrollY;
        targetScroll.current = window.scrollY;

        let ticking = false;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll.current += e.deltaY;
            targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll));

            if (!ticking) {
                ticking = true;
                animate();
            }
        };

        const animate = () => {
            const diff = targetScroll.current - currentScroll.current;

            // Faster lerp = less lag (0.12 instead of 0.08)
            currentScroll.current += diff * 0.12;

            window.scrollTo(0, currentScroll.current);

            if (Math.abs(diff) > 0.1) {
                rafId.current = requestAnimationFrame(animate);
            } else {
                ticking = false;
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, []);
};

export default useSmoothScroll;
