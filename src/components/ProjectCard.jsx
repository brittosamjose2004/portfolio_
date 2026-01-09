import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="project-card holo-tilt-card"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onClick(project)}
        >
            <div
                className="holo-content"
                style={{ transform: "translateZ(50px)" }}
            >
                <div className="card-image-container">
                    <img src={project.image} alt={project.title} className="card-image" />
                    <div className="card-overlay">
                        <span className="view-text">View Details <ArrowUpRight size={16} /></span>
                    </div>
                </div>

                <div className="card-content">
                    <span className="card-category">{project.category}</span>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.description}</p>

                    <div className="card-tags">
                        {project.tags.map(tag => (
                            <span key={tag} className="tag">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Holographic Shine Effect */}
            <motion.div
                className="holo-shine"
                style={{
                    background: useTransform(
                        mouseX,
                        [-0.5, 0.5],
                        [
                            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.1) 45%, transparent 100%)",
                            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
                        ]
                    ),
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0, 1])
                }}
            />
        </motion.div>
    );
};

export default ProjectCard;
