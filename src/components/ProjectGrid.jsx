import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects';
import './ProjectGrid.css';

const ProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="projects-section container">
            <motion.div
                className="projects-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="section-heading">Featured <span className="text-gradient">Intelligence</span></h2>
                <p className="section-subheading">A collection of advanced AI agents and neural implementations.</p>
            </motion.div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ProjectCard project={project} onClick={setSelectedProject} />
                    </motion.div>
                ))}
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default ProjectGrid;
