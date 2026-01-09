import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers } from 'lucide-react';
import './ProjectModal.css';

import { useState } from 'react';

const ProjectModal = ({ project, onClose }) => {
    const [activeImage, setActiveImage] = useState(project ? project.image : null);

    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-content glass-card"
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        <span className="modal-category">{project.category}</span>
                        <h2 className="modal-title">{project.title}</h2>
                    </div>

                    <div className="modal-body">
                        <div className="modal-image-wrapper">
                            <img src={activeImage || project.image} alt={project.title} className="modal-image" />

                            {project.gallery && (
                                <div className="gallery-thumbnails">
                                    {project.gallery.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                                            onClick={() => setActiveImage(img)}
                                        >
                                            <img src={img} alt={`Screenshot ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="modal-info">
                            <h3 className="section-title">About the Project</h3>
                            <p className="modal-description">{project.fullDescription}</p>

                            <div className="tech-stack">
                                <h4 className="stack-title"><Layers size={18} /> Tech Stack</h4>
                                <div className="tags-container">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="modal-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <a href="#" className="btn btn-primary modal-btn">
                                    <ExternalLink size={18} /> Live Demo
                                </a>
                                <a href="#" className="btn btn-secondary modal-btn">
                                    <Github size={18} /> View Code
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;
