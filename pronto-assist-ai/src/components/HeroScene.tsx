import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function MedicalCross() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.15]} />
        <meshStandardMaterial color="#5BA4CF" transparent opacity={0.8} emissive="#5BA4CF" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.0, 0.3, 0.15]} />
        <meshStandardMaterial color="#5BA4CF" transparent opacity={0.8} emissive="#5BA4CF" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1.5, 0.03, 16, 64]} />
      <meshStandardMaterial color="#5BA4CF" emissive="#5BA4CF" emissiveIntensity={1.5} transparent opacity={0.5} />
    </mesh>
  );
}

function Particles({ count = 80 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 8;
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#5BA4CF" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function BackgroundSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={[0, 0, -2]} scale={2.5}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial color="#e8e4f0" emissive="#5BA4CF" emissiveIntensity={0.03} wireframe distort={0.2} speed={2} transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#5BA4CF" />
        <pointLight position={[-3, -3, 2]} intensity={0.3} color="#F87171" />
        <MedicalCross />
        <GlowRing />
        <Particles />
        <BackgroundSphere />
      </Canvas>
    </div>
  );
}
