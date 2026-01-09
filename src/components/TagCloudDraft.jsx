import { useEffect, useState, useRef } from 'react';

const TagCloud = ({ skills }) => {
    const containerRef = useRef(null);

    // Config
    const radius = 200;
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        let animationFrame;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            // Speed factor
            setRotation({
                x: mouseY * 0.0005,
                y: mouseX * 0.0005
            });
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    // Calculate positions
    const items = skills.map((skill, i) => {
        // Golden Angle distribution for even sphere coverage
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;

        return {
            id: i,
            text: skill,
            x: 0,
            y: 0,
            z: 0,
            phi,
            theta
        };
    });

    const [tags, setTags] = useState(items);
    const rotationRef = useRef({ x: 0, y: 0 }); // Use ref for smooth animation loop

    // Animation Loop
    useEffect(() => {
        rotationRef.current = rotation;
    }, [rotation]);

    useEffect(() => {
        let frameId;
        // Base auto-rotation
        let curX = 0;
        let curY = 0;

        const animate = () => {
            // Apply mouse damping or auto spin
            const targetX = rotationRef.current.x || 0.002;
            const targetY = rotationRef.current.y || 0.002;

            curX += (targetX - curX) * 0.1;
            curY += (targetY - curY) * 0.1;

            setTags(prevTags => {
                return prevTags.map(tag => {
                    // Rottenburg rotation logic
                    const sinX = Math.sin(curX);
                    const cosX = Math.cos(curX);
                    const sinY = Math.sin(curY);
                    const cosY = Math.cos(curY);

                    // 3D Matrix Rotation
                    let x = radius * Math.sin(tag.phi) * Math.cos(tag.theta);
                    let y = radius * Math.sin(tag.phi) * Math.sin(tag.theta);
                    let z = radius * Math.cos(tag.phi);

                    // Rotate around X
                    let y1 = y * cosX - z * sinX;
                    let z1 = z * cosX + y * sinX;

                    // Rotate around Y
                    let x1 = x * cosY - z1 * sinY;
                    let z2 = z1 * cosY + x * sinY;

                    // Back to spherical for next frame? No, keep Cartesian for rendering, 
                    // but we need to update stored phi/theta for accumulated rotation.
                    // Actually, simpler to just rotate the CURRENT [x,y,z]
                    // But simplified approach: Just re-calculate positions from scratch with an accumulated angle offset?
                    // No, that's Orbit controls. We want TagCloud style.
                    // Standard TagCloud rotates the coordinate system.

                    return { ...tag, x: x1, y: y1, z: z2, scale: (z2 + radius * 2) / 300, opacity: (z2 + radius) / (radius * 2) };
                });
            });
            frameId = requestAnimationFrame(animate);
        };

        // Initialize positions once? Use simple accumulated rotation state
        // Actually, let's use a simpler library-free approach:
        // Accumulate global rotation angles

    }, []);

    // ... Retrying with simpler logic
    // We need to keep state of current rotation matrix or accumulated Euler angles.

    return (
        <div ref={containerRef} style={{ width: '500px', height: '500px', position: 'relative', margin: '0 auto', perspective: '1000px' }}>
            {/* Placeholder for complex logic. 
                I will switch to a simpler CSS-based rotation or use a library if available.
                Since I cannot install new deps easily without user permission, I'll write a robust vanilla JS implementation in a separate attempt.
            */}
            <div style={{ color: 'white' }}>3D Sphere Placeholder (Logic too complex for inline write, will use simpler 3D CSS approach)</div>
        </div>
    );
};
// ABORTING this file write to switch to a proven CSS-only 3D sphere approach which is safer and performs better.
