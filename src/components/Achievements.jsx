import { motion } from 'framer-motion';
import { Award, CheckCircle, Trophy } from 'lucide-react';
import AntiGravity from './AntiGravity';
import './Achievements.css';

const awards = [
    {
        title: "Top 2 Position - Datathon",
        event: "Karnataka Police Datathon 2024",
        desc: "Secured top position out of 200+ teams."
    },
    {
        title: "Winner - Game Dev",
        event: "Mohamed Sathak A.J. College Symposium",
        desc: "Won the Game Development Competition (2023)."
    },
    {
        title: "TN Startup Smartcard",
        event: "Tamil Nadu Startup Program",
        desc: "Selected and awarded smartcard in 2025."
    }
];

const certifications = [
    "Introduction to Generative AI – Google Cloud",
    "Google Analytics Certification - Google",
    "Networking Basics – Cisco"
];

const Achievements = () => {
    return (
        <section id="achievements" className="achievements-section container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Awards & <span className="text-gradient">Certifications</span>
            </motion.h2>

            <div className="achievements-grid">
                {awards.map((award, index) => (
                    <motion.div
                        key={index}
                        className="achievement-card glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <AntiGravity>
                            <div className="icon-box">
                                <Trophy size={32} color="#ffd700" />
                            </div>
                            <h3>{award.title}</h3>
                            <p className="event-name">{award.event}</p>
                            <p className="desc">{award.desc}</p>
                        </AntiGravity>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="cert-container glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h3><Award size={24} className="inline-icon" /> Professional Certifications</h3>
                <div className="cert-list">
                    {certifications.map((cert, index) => (
                        <div key={index} className="cert-item">
                            <CheckCircle size={18} color="#03dac6" />
                            <span>{cert}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Achievements;
