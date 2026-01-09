import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Trail system
    const [trail, setTrail] = useState([]);
    const trailRef = useRef([]);

    // Spring physics for main cursor
    const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setMousePosition({ x: clientX, y: clientY });
            cursorX.set(clientX - 10); // Offset for center
            cursorY.set(clientY - 10);

            // Add particle to trail
            const newParticle = {
                x: clientX,
                y: clientY,
                id: Date.now(),
                color: Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)'
            };

            trailRef.current = [...trailRef.current.slice(-15), newParticle]; // Keep last 15
            setTrail(trailRef.current);

            // Cleanup old particles logic handled by simple timeout wrapper or just state slice
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Remove particles over time effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (trailRef.current.length > 0) {
                trailRef.current = trailRef.current.slice(1);
                setTrail([...trailRef.current]);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Particle Trail */}
            {trail.map((particle, index) => (
                <div
                    key={particle.id}
                    className="magic-particle"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        backgroundColor: particle.color,
                        opacity: (index + 1) / trail.length, // Fade out tail
                        transform: `scale(${(index + 1) / trail.length})`
                    }}
                />
            ))}

            {/* Main Cursor Orb */}
            <motion.div
                className={`cursor-orb ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
                style={{ x: cursorX, y: cursorY }}
            >
                <div className="cursor-core"></div>
                <div className="cursor-aura"></div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
