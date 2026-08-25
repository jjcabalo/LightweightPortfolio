"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

import { useTheme } from "@/components/ThemeProvider";

function Particles({ isLight }: { isLight: boolean }) {
  const count = 3000; // Increased particle count
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    // Spin slowly over time
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    // Direct DOM read avoids React re-renders
    pointsRef.current.position.y = window.scrollY * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={isLight ? "#a3a3a3" : "#555555"} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function FloatingGeometry({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    // Direct DOM read for parallax avoids React re-renders
    groupRef.current.position.y = window.scrollY * 0.005;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  const c1 = isLight ? "#d4d4d4" : "#222";
  const c2 = isLight ? "#e5e5e5" : "#1a1a1a";
  const c3 = isLight ? "#cccccc" : "#333";

  return (
    <group ref={groupRef}>
       <mesh position={[-4, -2, -5]}>
         <octahedronGeometry args={[2, 0]} />
         <meshBasicMaterial color={c1} wireframe />
       </mesh>
       <mesh position={[6, 5, -8]}>
         <tetrahedronGeometry args={[3, 0]} />
         <meshBasicMaterial color={c2} wireframe />
       </mesh>
       <mesh position={[3, -12, -6]}>
         <dodecahedronGeometry args={[2.5, 0]} />
         <meshBasicMaterial color={c3} wireframe />
       </mesh>
       <mesh position={[-6, -20, -8]}>
         <boxGeometry args={[3, 3, 3]} />
         <meshBasicMaterial color={c1} wireframe />
       </mesh>
       <mesh position={[5, -30, -5]}>
         <octahedronGeometry args={[3, 0]} />
         <meshBasicMaterial color={c2} wireframe />
       </mesh>
       <mesh position={[-3, -40, -10]}>
         <tetrahedronGeometry args={[4, 0]} />
         <meshBasicMaterial color={c1} wireframe />
       </mesh>
    </group>
  );
}

export default function Scene() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className={`fixed inset-0 z-[-1] pointer-events-none transition-colors duration-700 ${isLight ? "bg-[#f9f9f9]" : "bg-black"}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }} 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", alpha: true, antialias: false }}
        frameloop="always"
      >
        <Particles isLight={isLight} />
        <FloatingGeometry isLight={isLight} />
        <fog attach="fog" args={[isLight ? "#f9f9f9" : "#000", 3, 20]} />
      </Canvas>
      {/* Subtle Noise Texture Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-700 mix-blend-overlay ${isLight ? "opacity-[0.03]" : "opacity-[0.06]"}`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
}
