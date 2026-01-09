import { useEffect, useRef } from 'react';
import './TagCloud.css';

const TagCloud = ({ skills }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const radius = 180; // Radius of the sphere
        const total = skills.length;

        // Create tags
        container.innerHTML = '';
        skills.forEach((skill, i) => {
            const tag = document.createElement('div');
            tag.className = 'tag-cloud-item';
            tag.textContent = skill;

            // Golden Angle Position
            const phi = Math.acos(-1 + (2 * i) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            container.appendChild(tag);
        });

        // Rotation Logic
        let angleX = 0;
        let angleY = 0;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) * 0.0005;
            mouseY = (e.clientY - rect.top - rect.height / 2) * 0.0005;
        };

        container.parentElement.addEventListener('mousemove', handleMouseMove);

        let animationId;
        const animate = () => {
            angleX += (mouseY - angleX) * 0.1; // Smooth lerp
            angleY += (mouseX - angleY) * 0.1;

            container.style.transform = `rotateX(${-angleX * 50}deg) rotateY(${angleY * 50}deg)`;

            // Counter-rotate items to keep text facing forward (Billboard effect)
            const items = container.querySelectorAll('.tag-cloud-item');
            items.forEach(item => {
                // Get current translation from computed style or stored?
                // Simpler: Just rotate the container. Text will rotate with it.
                // To keep text readable: rotate text opposite to container?
                // item.style.transform = `... rotateY(${-angleY * 50}deg) rotateX(${angleX * 50}deg)`; 
                // This is expensive to do every frame for DOM nodes.
                // Let's stick to rotating container for V1, it looks like a 3D object.
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            container.parentElement.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [skills]);

    return (
        <div className="tag-cloud-wrapper">
            <div ref={containerRef} className="tag-cloud-container"></div>
        </div>
    );
};

export default TagCloud;
