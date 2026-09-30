"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Points, PointMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { random } from "gsap/gsap-core";

function ParticleRing({ radius, count, color, speed }: { radius: number, count: number, color: string, speed: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      // Keep them mostly in a ring/band
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (radius * 0.3) * Math.cos(phi); // Flatten the y to make it a ring
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed;
      pointsRef.current.rotation.z += delta * (speed * 0.2);
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial transparent color={color} size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}

function TradeArc({ radius, angle, speed, color }: { radius: number, angle: number, speed: number, color: string }) {
  const arcRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * speed;
      orbitRef.current.rotation.x += delta * (speed * 0.5);
    }
  });

  return (
    <group ref={orbitRef} rotation={[angle, 0, angle]}>
      <mesh ref={arcRef} position={[0, 0, 0]}>
        <torusGeometry args={[radius, 0.015, 16, 100, Math.PI]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Moving glowing node on the arc */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function Hero3DGlobe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!globeRef.current) return;
    
    // Parallax effect based on mouse movement
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 15;
    
    globeRef.current.rotation.y += (targetX - globeRef.current.rotation.y) * 2 * delta;
    globeRef.current.rotation.x += (targetY - globeRef.current.rotation.x) * 2 * delta;
  });

  return (
    <>
      <fog attach="fog" args={["#121413", 8, 25]} />
      
      {/* Colourful Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#c0a969" />
      <directionalLight position={[-5, 5, -5]} intensity={2} color="#1A3B2B" />
      <spotLight position={[0, -5, 5]} intensity={4} color="#d4bd7f" angle={0.5} penumbra={1} />
      
      <Environment preset="city" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={globeRef} position={[3, 0, 0]} scale={1.2}>
          
          {/* Core Solid Globe */}
          <Sphere args={[2, 64, 64]}>
            <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.9} 
              roughness={0.1}
              envMapIntensity={2}
            />
          </Sphere>

          {/* Glowing Wireframe Atmosphere */}
          <Sphere args={[2.02, 32, 32]}>
            <meshBasicMaterial 
              color="#1A3B2B" 
              wireframe 
              transparent 
              opacity={0.15} 
              blending={THREE.AdditiveBlending}
            />
          </Sphere>

          {/* Trade Routes / Orbital Arcs */}
          <TradeArc radius={2.1} angle={0} speed={0.2} color="#c0a969" />
          <TradeArc radius={2.2} angle={Math.PI / 4} speed={-0.15} color="#1d5434" />
          <TradeArc radius={2.15} angle={Math.PI / 2} speed={0.25} color="#d4bd7f" />
          <TradeArc radius={2.3} angle={Math.PI / 3} speed={-0.2} color="#F5F3E9" />

          {/* Particle Rings */}
          <ParticleRing radius={2.8} count={800} color="#c0a969" speed={0.1} />
          <ParticleRing radius={3.2} count={600} color="#1A3B2B" speed={-0.08} />
          <ParticleRing radius={2.5} count={400} color="#F5F3E9" speed={0.15} />

          {/* Inner Core Glow */}
          <mesh>
            <sphereGeometry args={[1.9, 32, 32]} />
            <meshBasicMaterial color="#c0a969" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
          </mesh>
          
        </group>
      </Float>
    </>
  );
}
