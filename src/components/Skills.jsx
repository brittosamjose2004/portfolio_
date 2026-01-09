import { motion } from 'framer-motion';
import { Brain, Database, Cloud, Terminal, Cpu, Globe, Code, Figma, GitBranch, Layout, Server, Box, Smartphone, Flame, Link2, Bot, AppWindow } from 'lucide-react';
import TagCloud from './TagCloud';
import './Skills.css';

const skillsData = [
    { name: "Generative AI & LLMs", icon: <Brain size={24} />, level: 95 },
    { name: "Machine Learning (Scikit-learn)", icon: <Cpu size={24} />, level: 90 },
    { name: "Computer Vision (OpenCV)", icon: <Terminal size={24} />, level: 85 },
    { name: "Full-Stack (React/Flask)", icon: <Globe size={24} />, level: 92 },
    { name: "Cloud (Azure/AWS)", icon: <Cloud size={24} />, level: 80 },
    { name: "Data Science (Pandas/NumPy)", icon: <Database size={24} />, level: 88 },
];

const toolsData = [
    { name: "VS Code", icon: <Code size={24} color="#007acc" /> },
    { name: "Git & GitHub", icon: <GitBranch size={24} color="#f05032" /> },
    { name: "Docker", icon: <Box size={24} color="#2496ed" /> },
    { name: "LangChain", icon: <Link2 size={24} color="#1c3c3c" /> },
    { name: "Hugging Face", icon: <Bot size={24} color="#ffad1f" /> },
    { name: "PyTorch", icon: <Flame size={24} color="#ee4c2c" /> },
    { name: "MongoDB", icon: <Database size={24} color="#47a248" /> },
    { name: "Streamlit", icon: <AppWindow size={24} color="#ff4b4b" /> },
    { name: "Android Studio", icon: <Smartphone size={24} color="#3ddc84" /> },
    { name: "Postman", icon: <Server size={24} color="#ef5b25" /> },
    { name: "Figma", icon: <Figma size={24} color="#a259ff" /> },
    { name: "Jupyter", icon: <Layout size={24} color="#f37626" /> },
];

const Skills = () => {
    return (
        <section className="skills-section container">
            <div className="skills-content">
                <motion.div
                    className="skills-text"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-heading">Neural <span className="text-gradient">Capabilities</span></h2>
                    <p className="section-subheading">A comprehensive neural network of technical expertise.</p>

                    <div className="skills-grid">
                        {skillsData.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="skill-item glass-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="skill-icon">{skill.icon}</div>
                                <div className="skill-info">
                                    <h3 className="skill-name">{skill.name}</h3>
                                    <div className="skill-bar-bg">
                                        <motion.div
                                            className="skill-bar-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="skills-visual"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ flexDirection: 'column' }} // Inline fix or update CSS
                >
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Technical <span className="text-gradient">Proficiency</span>
                    </motion.h2>

                    <motion.div
                        className="skill-graph-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <TagCloud skills={[
                            "React", "Node.js", "Python", "TensorFlow", "PyTorch", "OpenAI",
                            "LangChain", "Flask", "Docker", "AWS", "Azure", "MongoDB",
                            "PostgreSQL", "Git", "Figma", "Three.js", "OpenGL", "CV", "NLP"
                        ]} />
                    </motion.div>

                    <div className="tools-container">
                        <h3 className="tools-heading">Tools & <span className="text-gradient">Products</span></h3>
                        <div className="tools-grid">
                            {toolsData.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    className="tool-item glass-card"
                                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 0 15px var(--primary-color)" }}
                                    initial={{ opacity: 0, y: 30, rotateX: 90, filter: 'blur(8px)' }}
                                    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: 0.8,
                                        delay: index * 0.05
                                    }}
                                >
                                    {tool.icon}
                                    <span>{tool.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
