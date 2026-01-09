import { useState, useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion'
import './App.css'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Achievements from './components/Achievements'
import ProjectGrid from './components/ProjectGrid'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Scene3D from './components/3d/Scene3D'
import CustomCursor from './components/CustomCursor'
import NeuralChat from './components/NeuralChat'
import NeuralBackground from './components/NeuralBackground'
import LiquidDistortion from './components/LiquidDistortion'
import SpotlightNavbar from './components/SpotlightNavbar'
import ScrollManager from './components/ScrollManager'

const VelocitySkew = ({ children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]); // Skew degree

  return (
    <motion.div style={{ skewY: skew, transformOrigin: "center center" }}>
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <div className="app-container">
      <NeuralBackground />
      <LiquidDistortion />
      <SpotlightNavbar />
      <CustomCursor />
      <ScrollManager />
      <NeuralChat />
      <Scene3D />

      <VelocitySkew>
        <Hero />
        <Experience />
        <ProjectGrid />
        <Skills />
        <Achievements />
        <Testimonials />
        <Contact />
      </VelocitySkew>
    </div>
  )
}

export default App
