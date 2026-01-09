import { motion } from 'framer-motion';

const AntiGravity = ({ children, active = true }) => {
    if (!active) return children;

    // Randomize float parameters
    const duration = 2 + Math.random() * 2; // 2-4s
    const yOffset = 10 + Math.random() * 10; // 10-20px
    const delay = Math.random() * 2;

    return (
        <motion.div
            animate={{
                y: [-yOffset, yOffset, -yOffset],
            }}
            transition={{
                duration: duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay: delay
            }}
        >
            {children}
        </motion.div>
    );
};

export default AntiGravity;
