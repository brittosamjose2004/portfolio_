import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        id: 1,
        role: "AI & ML Intern",
        company: "Impactree.ai",
        period: "Dec 2025 – Present",
        location: "Chennai, India",
        description: [
            "Contributed to Caetis, an AI-powered product, designing ML solutions.",
            "Implemented RAG & LLMs for intelligent text response generation.",
            "Integrated AI models with cloud APIs for scalable deployment."
        ]
    },
    {
        id: 2,
        role: "Gen AI - Intern",
        company: "Hexalith Solutions",
        period: "June 2025 - July 2025",
        location: "Chennai, India",
        description: [
            "Building AI models for generative text and content creation.",
            "Integrating AI features into web applications for enhanced UX.",
            "Fine-tuning models for specific performance metrics."
        ]
    },
    {
        id: 3,
        role: "AI Intern",
        company: "Plant Green Inertia Pvt Ltd",
        period: "Jun 2024 – Jul 2024",
        location: "Chennai, India",
        description: [
            "Architected a music-based profile matching algorithm for a dating app.",
            "Spearheaded React Native mobile app conversion for cross-platform support."
        ]
    },
    {
        id: 4,
        role: "Internship Trainee",
        company: "Intelizign",
        period: "Jul 2024 (2 weeks)",
        location: "Chennai, India",
        description: [
            "Gained foundational knowledge in Product Lifecycle Management (PLM) and corporate structures."
        ]
    },
    {
        id: 5,
        role: "Project Intern",
        company: "Campus Coder",
        period: "Nov 2023 – Dec 2023",
        location: "Remote",
        description: [
            "Built an image classification model (CNN) on Kaggle datasets achieving 90% accuracy."
        ]
    }
];

const Experience = () => {
    return (
        <section id="experience" className="experience-section container">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="section-heading">Professional <span className="text-gradient">Experience</span></h2>
                <p className="section-subheading">My journey through the tech landscape.</p>
            </motion.div>

            <div className="timeline">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -50, scale: 0.9, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                    >
                        <div className="timeline-dot"></div>
                        <div className="timeline-content glass-card">
                            <div className="timeline-header">
                                <h3 className="role-title">{exp.role}</h3>
                                <span className="company-name">{exp.company}</span>
                            </div>
                            <div className="timeline-meta">
                                <span className="meta-item"><Calendar size={14} /> {exp.period}</span>
                                <span className="meta-item"><MapPin size={14} /> {exp.location}</span>
                            </div>
                            <ul className="timeline-desc">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
