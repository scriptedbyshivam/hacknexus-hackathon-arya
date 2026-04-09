import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

interface DepartmentData {
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  beds: number;
  patients: number;
}

const departments: DepartmentData[] = [
  { name: "Emergency Room", position: [-1.5, 0.4, 0], size: [1.2, 0.8, 1], color: "#F87171", beds: 20, patients: 17 },
  { name: "ICU", position: [0, 0.6, 0.5], size: [1, 1.2, 0.8], color: "#FBBF24", beds: 12, patients: 10 },
  { name: "General Ward", position: [1.5, 0.3, -0.3], size: [1.4, 0.6, 1.2], color: "#34D399", beds: 40, patients: 28 },
  { name: "Surgery", position: [0.5, 0.5, -1], size: [0.8, 1, 0.8], color: "#5BA4CF", beds: 8, patients: 5 },
];

function Department({ data }: { data: DepartmentData }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, hovered ? 1.15 : 1, 0.1);
    }
  });

  return (
    <group position={data.position}>
      <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={data.size} />
        <meshStandardMaterial color={data.color} transparent opacity={hovered ? 0.9 : 0.7} emissive={data.color} emissiveIntensity={hovered ? 0.3 : 0.08} />
      </mesh>
      <mesh>
        <boxGeometry args={data.size} />
        <meshBasicMaterial color={data.color} wireframe transparent opacity={0.2} />
      </mesh>
      {hovered && (
        <Html center position={[0, data.size[1] / 2 + 0.3, 0]} distanceFactor={5}>
          <div className="glass-card p-3 min-w-[140px] pointer-events-none">
            <p className="text-sm font-semibold text-foreground">{data.name}</p>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Beds: {data.beds}</span>
              <span>Patients: {data.patients}</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(data.patients / data.beds) * 100}%`, backgroundColor: data.color }} />
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function BasePlatform() {
  return (
    <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 5]} />
      <meshStandardMaterial color="#e2e8f0" transparent opacity={0.5} />
    </mesh>
  );
}

function SceneParticles({ count = 40 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 8;
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#5BA4CF" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function HospitalModel() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={0.8} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={groupRef}>
        <BasePlatform />
        {departments.map((dept) => (
          <Department key={dept.name} data={dept} />
        ))}
      </group>
    </Float>
  );
}

export default function HospitalScene() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Department <span className="text-primary">Overview</span>
        </h2>
        <p className="text-muted-foreground">Interactive 3D hospital status — hover departments for details</p>
      </div>
      <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] glass-card overflow-hidden">
        <Canvas camera={{ position: [4, 3, 4], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#5BA4CF" />
          <pointLight position={[-5, 3, -3]} intensity={0.2} color="#F87171" />
          <HospitalModel />
          <SceneParticles />
        </Canvas>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-6 max-w-4xl mx-auto">
        {departments.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
            {d.name}
          </div>
        ))}
      </div>
    </section>
  );
}
