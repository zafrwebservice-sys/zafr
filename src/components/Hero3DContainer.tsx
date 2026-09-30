"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Environment, Float, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";

// A reusable wheel component
function Wheel({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the wheel to simulate driving
      ref.current.rotation.z -= delta * 2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.9} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.25, 0.25, 0.52, 16]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Hero3DContainer() {
  const truckRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const logoTexture = useTexture("/logo-exact.png");

  // Procedural corrugated bump map texture for container
  const bumpMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#808080';
      context.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 512; i += 32) {
        const grad = context.createLinearGradient(i, 0, i + 32, 0);
        grad.addColorStop(0, '#404040');
        grad.addColorStop(0.5, '#ffffff');
        grad.addColorStop(1, '#404040');
        context.fillStyle = grad;
        context.fillRect(i, 0, 32, 512);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 1);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!truckRef.current) return;
    
    // Smooth idle driving animation (slight bobbing and moving)
    const time = state.clock.getElapsedTime();
    const bobbing = Math.sin(time * 5) * 0.02;
    
    // Parallax effect based on mouse movement
    const targetX = (state.pointer.x * Math.PI) / 12;
    const targetY = (state.pointer.y * Math.PI) / 20;
    
    truckRef.current.rotation.y += (targetX - truckRef.current.rotation.y) * 2 * delta;
    truckRef.current.rotation.x += (-targetY - truckRef.current.rotation.x) * 2 * delta;
    
    // Apply suspension bobbing
    truckRef.current.position.y = bobbing;

    // Scroll effect (move truck closer/rotate)
    if (scroll) {
      const scrollOffset = scroll.offset;
      truckRef.current.position.z = scrollOffset * 8;
      truckRef.current.position.x = -scrollOffset * 4;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#121413", 15, 40]} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        color="#c0a969"
      />
      <spotLight
        position={[-10, 10, 10]}
        angle={0.4}
        penumbra={1}
        intensity={2.5}
        color="#ffffff"
        castShadow
      />
      {/* Headlights simulation */}
      <spotLight position={[-6, 1, 2]} angle={0.3} penumbra={0.5} intensity={5} color="#fff" target-position={[-15, 0, 5]} />
      <spotLight position={[-6, 1, -2]} angle={0.3} penumbra={0.5} intensity={5} color="#fff" target-position={[-15, 0, -5]} />
      
      {/* Environment for realistic reflections */}
      <Environment preset="city" />

      {/* The entire Truck Group */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={truckRef} position={[2, -0.5, 0]} castShadow>
          
          {/* --- THE TRUCK CABIN --- */}
          <group position={[-4.5, 0.8, 0]}>
            {/* Lower Cab Body */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
              <boxGeometry args={[2.5, 1.8, 2.4]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.7} />
            </mesh>
            
            {/* Front Grille */}
            <mesh position={[-1.26, -0.2, 0]}>
              <boxGeometry args={[0.1, 1, 1.8]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.9} />
            </mesh>

            {/* Upper Cab (Windows) */}
            <mesh castShadow receiveShadow position={[0.2, 1.4, 0]}>
              <boxGeometry args={[1.8, 1, 2.3]} />
              <meshStandardMaterial color="#020202" roughness={0.1} metalness={0.9} />
            </mesh>
            
            {/* Windshield */}
            <mesh position={[-0.71, 1.4, 0]} rotation={[0, 0, 0.1]}>
              <planeGeometry args={[1, 2.2]} rotation={[0, Math.PI/2, 0]} />
              <meshStandardMaterial color="#000" roughness={0} metalness={1} envMapIntensity={2} />
            </mesh>
          </group>

          {/* --- THE CHASSIS --- */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[7, 0.2, 2.4]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>

          {/* --- THE SHIPPING CONTAINER --- */}
          <group position={[0.5, 1.45, 0]}>
            {/* Container Base Box (Inner) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[5.9, 2.4, 2.4]} />
              <meshStandardMaterial color="#0f261a" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Container Top and Bottom Rims */}
            <mesh position={[0, 1.25, 0]} castShadow>
              <boxGeometry args={[6.1, 0.1, 2.55]} />
              <meshStandardMaterial color="#1a422a" roughness={0.6} metalness={0.3} />
            </mesh>
            <mesh position={[0, -1.25, 0]} castShadow>
              <boxGeometry args={[6.1, 0.1, 2.55]} />
              <meshStandardMaterial color="#1a422a" roughness={0.8} metalness={0.1} />
            </mesh>
            
            {/* Forklift pockets */}
            <mesh position={[-1, -1.25, 1.28]}>
              <boxGeometry args={[0.4, 0.1, 0.05]} />
              <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[1, -1.25, 1.28]}>
              <boxGeometry args={[0.4, 0.1, 0.05]} />
              <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[-1, -1.25, -1.28]}>
              <boxGeometry args={[0.4, 0.1, 0.05]} />
              <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[1, -1.25, -1.28]}>
              <boxGeometry args={[0.4, 0.1, 0.05]} />
              <meshStandardMaterial color="#000" />
            </mesh>

            {/* 4 Corner Posts */}
            <mesh position={[2.95, 0, 1.2]} castShadow>
              <boxGeometry args={[0.2, 2.5, 0.15]} />
              <meshStandardMaterial color="#1a422a" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[-2.95, 0, 1.2]} castShadow>
              <boxGeometry args={[0.2, 2.5, 0.15]} />
              <meshStandardMaterial color="#1a422a" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[2.95, 0, -1.2]} castShadow>
              <boxGeometry args={[0.2, 2.5, 0.15]} />
              <meshStandardMaterial color="#1a422a" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[-2.95, 0, -1.2]} castShadow>
              <boxGeometry args={[0.2, 2.5, 0.15]} />
              <meshStandardMaterial color="#1a422a" roughness={0.5} metalness={0.4} />
            </mesh>

            {/* Side Corrugations (using bump map for performance, but enhanced color) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[5.95, 2.38, 2.45]} />
              <meshStandardMaterial 
                color="#1d5434" 
                metalness={0.4}
                roughness={0.6}
                bumpMap={bumpMap}
                bumpScale={0.15}
              />
            </mesh>
            
            {/* Container Doors (Rear) */}
            {/* Left Door */}
            <group position={[3.01, 0, 0.6]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.02, 2.3, 1.15]} />
                <meshStandardMaterial color="#18472d" metalness={0.5} roughness={0.5} bumpMap={bumpMap} bumpScale={0.1} />
              </mesh>
              {/* Locking bars */}
              <mesh position={[0.02, 0, 0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
                <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} />
              </mesh>
              <mesh position={[0.02, 0, -0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
                <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} />
              </mesh>
            </group>
            
            {/* Right Door */}
            <group position={[3.01, 0, -0.6]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.02, 2.3, 1.15]} />
                <meshStandardMaterial color="#18472d" metalness={0.5} roughness={0.5} bumpMap={bumpMap} bumpScale={0.1} />
              </mesh>
              {/* Locking bars */}
              <mesh position={[0.02, 0, 0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
                <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} />
              </mesh>
              <mesh position={[0.02, 0, -0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
                <meshStandardMaterial color="#888" metalness={0.9} roughness={0.3} />
              </mesh>
            </group>

            {/* Door seam */}
            <mesh position={[3.02, 0, 0]} castShadow>
               <boxGeometry args={[0.03, 2.3, 0.02]} />
               <meshStandardMaterial color="#0a120c" />
            </mesh>

            {/* Safety Stickers / Decals */}
            <mesh position={[3.03, 0.8, -0.9]} rotation={[0, Math.PI/2, 0]}>
               <planeGeometry args={[0.2, 0.3]} />
               <meshStandardMaterial color="#d9a036" />
            </mesh>
            <mesh position={[3.03, -0.8, 0.9]} rotation={[0, Math.PI/2, 0]}>
               <planeGeometry args={[0.15, 0.15]} />
               <meshStandardMaterial color="#cc3333" />
            </mesh>

            {/* Main Logo Decal on Container Side */}
            <mesh position={[0, 0, 1.23]} rotation={[0, 0, 0]}>
              <planeGeometry args={[3.8, 1.3]} />
              <meshStandardMaterial 
                map={logoTexture}
                transparent={true}
                blending={THREE.MultiplyBlending}
                roughness={0.4}
                metalness={0.3}
              />
            </mesh>
          </group>

          {/* --- THE WHEELS --- */}
          {/* Cab Wheels */}
          <Wheel position={[-4.5, -0.3, 1.2]} />
          <Wheel position={[-4.5, -0.3, -1.2]} />
          {/* Trailer Wheels */}
          <Wheel position={[-0.5, -0.3, 1.2]} />
          <Wheel position={[-0.5, -0.3, -1.2]} />
          <Wheel position={[1.5, -0.3, 1.2]} />
          <Wheel position={[1.5, -0.3, -1.2]} />
          <Wheel position={[3.5, -0.3, 1.2]} />
          <Wheel position={[3.5, -0.3, -1.2]} />
          
        </group>
      </Float>

      {/* Cinematic Ground Shadow */}
      <ContactShadows position={[0, -1, 0]} opacity={0.7} scale={30} blur={2.5} far={5} color="#000000" />
      
      {/* Moving road lines to enhance driving illusion */}
      <mesh position={[0, -0.99, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 0.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </>
  );
}
