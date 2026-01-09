import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import './SkillGraph.css';

const SkillNode = ({ position, label, color, connections }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[hovered ? 0.35 : 0.25, 32, 32]} />
                    <meshStandardMaterial
                        color={hovered ? "#fff" : color}
                        emissive={color}
                        emissiveIntensity={hovered ? 2 : 0.5}
                        toneMapped={false}
                    />
                </mesh>
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.25}
                    color={hovered ? "#fff" : "rgba(255,255,255,0.7)"}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            </Float>
            {connections.map((target, i) => (
                <Connection key={i} start={[0, 0, 0]} end={target} color={color} />
            ))}
        </group>
    );
};

const Connection = ({ start, end, color }) => {
    // Relative line drawing
    // In a real force graph we'd track global positions, but for this visual we can fake it or use global coords.
    // Let's rely on parent group for start, but end needs to be relative to start... which is tricky in this structure.
    // Alternative: Draw all lines in a separate parent component.
    return null; // Handled in parent
};

const GraphScene = () => {
    const skills = useMemo(() => [
        { id: 0, label: "AI & ML", pos: [0, 0, 0], color: "#bb86fc", links: [1, 2, 3, 4] },
        { id: 1, label: "Python", pos: [-2, 1, 0], color: "#03dac6", links: [] },
        { id: 2, label: "LLMs", pos: [2, 1, 0.5], color: "#bb86fc", links: [5, 6] },
        { id: 3, label: "Computer Vision", pos: [-1.5, -1.5, 1], color: "#cf6679", links: [] },
        { id: 4, label: "React", pos: [1.5, -1, -0.5], color: "#03dac6", links: [] },
        { id: 5, label: "RAG", pos: [3, 2, 1], color: "#bb86fc", links: [] },
        { id: 6, label: "Prompt Eng", pos: [2.5, 0, 2], color: "#bb86fc", links: [] },
        { id: 7, label: "Azure", pos: [0, 2, -1], color: "#0176d3", links: [0] },
    ], []);

    const lines = useMemo(() => {
        const lineList = [];
        skills.forEach(skill => {
            skill.links.forEach(targetId => {
                const target = skills.find(s => s.id === targetId);
                if (target) {
                    lineList.push({ start: skill.pos, end: target.pos, color: skill.color });
                }
            });
        });
        return lineList;
    }, [skills]);

    return (
        <group>
            {skills.map((skill) => (
                <SkillNode
                    key={skill.id}
                    {...skill}
                    position={skill.pos}
                    connections={[]} // Lines drawn centrally
                />
            ))}

            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={[line.start, line.end]}
                    color={line.color}
                    opacity={0.2}
                    transparent
                    lineWidth={1}
                />
            ))}
        </group>
    );
};

const SkillGraph = () => {
    return (
        <div className="skill-graph-container">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <GraphScene />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default SkillGraph;
