import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Smartphone } from 'lucide-react';
import './Contact.css';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section container">
            <div className="contact-glass glass-card">
                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="contact-heading">Ready to <span className="text-gradient">Collaborate?</span></h2>
                    <p className="contact-sub">
                        Whether you need a custom AI agent, a neural network architect, or a full-stack visionary,
                        I'm ready to bring your ideas to life.
                    </p>

                    <div className="contact-form-wrapper">
                        <form className="contact-form">
                            <div className="form-group">
                                <input type="text" placeholder="Name" className="form-input" />
                                <div className="scanline"></div>
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email" className="form-input" />
                                <div className="scanline"></div>
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Message" rows="5" className="form-input"></textarea>
                                <div className="scanline"></div>
                            </div>
                            <button type="submit" className="submit-btn" disabled>
                                Initialize Transmission
                            </button>
                        </form>

                        <div className="contact-socials">
                            <a href="https://github.com/brittosamjose2004" target="_blank" rel="noopener noreferrer" className="social-link"><Github size={24} /></a>
                            <a href="https://linkedin.com/in/brittosamjosej" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={24} /></a>
                            <a href="mailto:brittosamjosej@gmail.com" className="social-link"><Mail size={24} /></a>
                        </div>
                    </div>
                </motion.div>
            </div>

            <footer className="footer">
                <p>&copy; 2024 AI Developer Portfolio. Crafted with Neural Intelligence.</p>
            </footer>
        </section>
    );
};

export default Contact;
