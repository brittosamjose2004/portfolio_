import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import AntiGravity from './AntiGravity';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: "Project Manager",
        role: "Impactree.ai",
        text: "Britto's ability to integrate RAG pipelines into our product was impressive. He is a quick learner and a dedicated developer."
    },
    {
        id: 2,
        name: "Team Lead",
        role: "Hexalith Solutions",
        text: "Excellent work on the Gen AI models. His innovative approach to content generation added significant value to our platform."
    },
    {
        id: 3,
        name: "Client",
        role: "Plant Green Inertia",
        text: "The music-based algorithm he built was unique and highly effective. Delivered the React Native app ahead of schedule."
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="testimonials-section container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                What People <span className="text-gradient">Say</span>
            </motion.h2>

            <div className="testimonials-grid">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="testimonial-card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <AntiGravity>
                            <Quote size={32} className="quote-icon" />
                            <p className="testimonial-text">"{item.text}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{item.name[0]}</div>
                                <div className="author-info">
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </AntiGravity>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
