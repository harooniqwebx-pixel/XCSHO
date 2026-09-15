import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const group = useRef();
  const particles = useRef();

  React.useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ".real-walkthrough",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (!group.current) return;

        const p = self.progress;

        group.current.rotation.y = p * Math.PI * 0.35;
        group.current.rotation.x = Math.sin(p * Math.PI) * 0.08;
        group.current.position.x = Math.sin(p * Math.PI * 2) * 0.35;
        group.current.position.z = Math.sin(p * Math.PI) * 0.7;
      },
    });

    return () => trigger.kill();
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (particles.current) {
      particles.current.rotation.y = t * 0.012;
      particles.current.rotation.x = Math.sin(t * 0.15) * 0.015;
    }

    state.camera.position.x +=
      (state.pointer.x * 0.35 - state.camera.position.x) * 0.025;

    state.camera.position.y +=
      (state.pointer.y * 0.2 - state.camera.position.y) * 0.025;
  });

  const points = React.useMemo(() => {
    const data = [];

    for (let i = 0; i < 650; i++) {
      data.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10
      );
    }

    return new Float32Array(data);
  }, []);

  return (
    <>
      <group ref={group}>
        <mesh position={[0, 0, -4]}>
          <planeGeometry args={[18, 11]} />
          <meshBasicMaterial
            transparent
            opacity={0.08}
          />
        </mesh>

        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[13, 8]} />
          <meshBasicMaterial
            transparent
            opacity={0.045}
          />
        </mesh>
      </group>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.035}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>

      <Environment preset="city" />
    </>
  );
}

export default function CinematicWebGL() {
  return (
    <div className="cinematic-webgl">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45
        }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
