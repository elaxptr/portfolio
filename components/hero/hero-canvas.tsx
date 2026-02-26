"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

function FloatingMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotionSafe();
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (!reduced) {
      // Subtle transform-only updates keep the scene premium without adding heavy post-processing.
      pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.06);
      pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.06);
      mesh.rotation.y += delta * 0.25;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, pointer.current.y * 0.25, 0.06);
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -pointer.current.x * 0.2, 0.06);
      mesh.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.15, 1]} />
      <meshStandardMaterial color="#8ad8ff" metalness={0.55} roughness={0.25} emissive="#0b2842" emissiveIntensity={0.4} flatShading />
    </mesh>
  );
}

export function HeroCanvas() {
  const reduced = useReducedMotionSafe();

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={reduced ? 1 : [1, 1.25]}
        frameloop={reduced ? "demand" : "always"}
        performance={{ min: 0.7 }}
        camera={{ position: [0, 0, 3.5], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 2]} intensity={1.3} color="#d3eeff" />
        <pointLight position={[-3, -1, 2]} intensity={1} color="#5fd0ff" />
        <FloatingMesh />
      </Canvas>
    </div>
  );
}
