import { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

const LiquidDistortion = () => {
    const filterRef = useRef(null);

    useAnimationFrame((t) => {
        if (!filterRef.current) return;
        // Oscillate turbulance for ripple effect
        const freq = 0.01 + 0.005 * Math.sin(t * 0.002);
        filterRef.current.setAttribute("baseFrequency", `${freq} ${freq}`);
    });

    return (
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
            <defs>
                <filter id="liquid-distortion">
                    <feTurbulence
                        ref={filterRef}
                        type="turbulence"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in2="turbulence"
                        in="SourceGraphic"
                        scale="30"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default LiquidDistortion;
