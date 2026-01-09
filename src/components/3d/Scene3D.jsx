import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './Scene3D.css';

const NeuralKnot = () => {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    // Generate points on a Torus Knot for "Complex Geometry"
    const particleData = useMemo(() => {
        const count = 4000; // More points for density
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const baseColor = new THREE.Color("#bb86fc");
        const activeColor = new THREE.Color("#03dac6");

        // Create a temporary geometry to sample points from
        const geometry = new THREE.TorusKnotGeometry(4, 1.2, 120, 20, 3, 5);
        const tempPos = geometry.attributes.position;

        for (let i = 0; i < count; i++) {
            // Sample random index from the knot geometry
            const index = Math.floor(Math.random() * tempPos.count);

            // Add some noise/dispersion for "Neural Cloud" look
            const noise = 0.3;
            positions[i * 3] = tempPos.getX(index) + (Math.random() - 0.5) * noise;
            positions[i * 3 + 1] = tempPos.getY(index) + (Math.random() - 0.5) * noise;
            positions[i * 3 + 2] = tempPos.getZ(index) + (Math.random() - 0.5) * noise;

            colors[i * 3] = baseColor.r;
            colors[i * 3 + 1] = baseColor.g;
            colors[i * 3 + 2] = baseColor.b;
        }

        return { positions, colors, initialColors: colors.slice() };
    }, []);

    useFrame((state) => {
        if (ref.current) {
            // Auto Rotation
            ref.current.rotation.y -= 0.003;
            ref.current.rotation.z += 0.001;

            // "Gesture" Animation: Pulse / Breathe
            const time = state.clock.elapsedTime;
            const pulse = Math.sin(time * 1.5) * 0.05 + 1; // Breathe between 0.95 and 1.05 scale

            // Scanner Effect: A wave of light passing through the mesh
            const positions = ref.current.geometry.attributes.position.array;
            const colors = ref.current.geometry.attributes.color.array;
            const scanPos = Math.sin(time * 2) * 5; // Move scan wave back and forth

            const baseColor = new THREE.Color("#bb86fc");
            const scanColor = new THREE.Color("#03dac6");

            for (let i = 0; i < particleData.positions.length / 3; i++) {
                const y = positions[i * 3 + 1]; // Use Y axis for scan wave

                // Check if point is within scan band
                const dist = Math.abs(y - scanPos);
                if (dist < 1.5) {
                    // Highlight
                    colors[i * 3] = scanColor.r;
                    colors[i * 3 + 1] = scanColor.g;
                    colors[i * 3 + 2] = scanColor.b;
                } else {
                    // Reset to base
                    colors[i * 3] = baseColor.r;
                    colors[i * 3 + 1] = baseColor.g;
                    colors[i * 3 + 2] = baseColor.b;
                }
            }
            ref.current.geometry.attributes.color.needsUpdate = true;

            // Apply pulse scale
            ref.current.scale.set(pulse, pulse, pulse);
        }
    });

    // Interaction Ref for rotation
    const groupRef = useRef();
    useFrame((state) => {
        if (groupRef.current) {
            const { x, y } = state.mouse;
            // Advanced Focus Gesture: Model leans towards cursor
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.3, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.3, 0.1);
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, 0]}>
            <Points
                ref={ref}
                positions={particleData.positions}
                colors={particleData.colors}
                stride={3}
                frustumCulled={false}
                onClick={() => console.log("Neural Link Established")}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <PointMaterial
                    transparent
                    color="#fff"
                    size={0.035} // Slightly larger for visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                    vertexColors
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
};

const Scene3D = () => {
    return (
        <div className="scene-container">
            <Canvas camera={{ position: [0, 0, 14], fov: 60 }}>
                <fog attach="fog" args={['#050510', 8, 25]} />
                <NeuralKnot />
            </Canvas>
        </div>
    );
};

export default Scene3D;
