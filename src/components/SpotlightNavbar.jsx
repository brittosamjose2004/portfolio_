import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Code, Layers, Mail } from 'lucide-react';
import './SpotlightNavbar.css';

const navItems = [
    { id: 'hero', icon: <Home size={20} />, label: 'Home', href: '#' },
    { id: 'experience', icon: <Briefcase size={20} />, label: 'Experience', href: '#experience' },
    { id: 'projects', icon: <Code size={20} />, label: 'Projects', href: '#projects' },
    { id: 'skills', icon: <Layers size={20} />, label: 'Skills', href: '#skills' },
    { id: 'contact', icon: <Mail size={20} />, label: 'Contact', href: '#contact' },
];

const SpotlightNavbar = () => {
    const [hoveredTab, setHoveredTab] = useState(null);

    return (
        <div className="navbar-container">
            <nav className="spotlight-nav glass-card">
                {navItems.map((tab) => (
                    <a
                        key={tab.id}
                        href={tab.href}
                        className="nav-item"
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        {hoveredTab === tab.id && (
                            <motion.span
                                layoutId="nav-spotlight"
                                className="nav-spotlight"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="nav-icon">{tab.icon}</span>
                        <span className="nav-label">{tab.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default SpotlightNavbar;
