import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className, href, onClick }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // 0.3 is magnetic pull strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const content = (
        <motion.div
            style={{ position: 'relative', display: 'inline-block' }}
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return <a href={href} className={className} style={{ display: 'inline-block', border: 'none', background: 'none', padding: 0 }}>{content}</a>;
    }

    return <button onClick={onClick} className={className} style={{ display: 'inline-block', border: 'none', background: 'none', padding: 0 }}>{content}</button>;
};

export default MagneticButton;
