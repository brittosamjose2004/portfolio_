import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { Code, Cpu, Sparkles } from 'lucide-react';
import profileImg from '../assets/profile.png';
import './Hero.css';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse spring
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Parallax Transforms (Different depths)
    const orb1X = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
    const orb1Y = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

    const orb2X = useTransform(smoothX, [-0.5, 0.5], [-50, 50]);
    const orb2Y = useTransform(smoothY, [-0.5, 0.5], [-50, 50]);

    const titleX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
    const titleY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

    const prismX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
    const prismY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

    // Scroll Parallax
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="hero-container" ref={ref}>
            <div className="hero-background">
                <motion.div style={{ x: orb1X, y: orb1Y }} className="orb orb-1"></motion.div>
                <motion.div style={{ x: orb2X, y: orb2Y }} className="orb orb-2"></motion.div>
                <div className="orb orb-3"></div>
            </div>

            <div className="hero-content container">
                <motion.div
                    style={{ x: prismX, y: prismY }}
                    className="profile-prism-container"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, type: "spring" }}
                >
                    <div className="profile-portal">
                        <div className="portal-ring ring-1"></div>
                        <div className="portal-ring ring-2"></div>
                        <div className="portal-ring ring-3"></div>
                        <div className="portal-glow"></div>
                        <div className="portal-content">
                            <img src={profileImg} alt="Britto Sam Jose J" className="profile-img" />
                        </div>
                    </div>

                    <div className="data-rain rain-1">101010</div>
                    <div className="data-rain rain-2">010101</div>

                    <div className="orbit-electron"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-badge"
                >
                    <Sparkles size={16} />
                    <span>AI Data Scientist & Full-Stack Developer</span>
                </motion.div>

                <motion.div style={{ x: titleX, y: titleY, opacity: opacityText, overflow: 'hidden' }}>
                    <motion.h1
                        className="hero-title glitch-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        Britto Sam <span className="text-gradient">Jose J</span> <br />
                        Engineering <span className="text-gradient">Intelligence</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        Crafting advanced AI solutions with magical user experiences.
                        Transforming complex models into intuitive interfaces.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <MagneticButton href="#projects">
                        <span className="btn btn-primary glitch-effect" data-text="View Projects"><Code size={20} /> View Projects</span>
                    </MagneticButton>

                    <MagneticButton href="#contact">
                        <span className="btn btn-secondary glitch-effect" data-text="Contact Me"><Cpu size={20} /> Contact Me</span>
                    </MagneticButton>
                </motion.div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
