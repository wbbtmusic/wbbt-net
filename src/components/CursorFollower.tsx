import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHoveringElement, setIsHoveringElement] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
    const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-cursor]');

            setIsHoveringElement(!!isInteractive);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    const showCursor = isVisible && isHoveringElement;

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-screen"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            {/* Outer glow */}
            <div
                className="w-[400px] h-[400px] rounded-full transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle, rgba(134, 239, 172, 0.1) 0%, rgba(134, 239, 172, 0.03) 30%, transparent 60%)',
                    filter: 'blur(40px)',
                    opacity: showCursor ? 1 : 0,
                }}
            />
            {/* Inner dot */}
            <div
                className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                style={{
                    background: 'rgba(134, 239, 172, 0.3)',
                    boxShadow: '0 0 60px rgba(134, 239, 172, 0.5)',
                    opacity: showCursor ? 1 : 0,
                }}
            />
        </motion.div>
    );
};

export default CursorFollower;
