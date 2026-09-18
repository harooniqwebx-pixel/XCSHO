import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei";
import * as THREE from "three";

const rooms = [
  {
    step: "01",
    name: "STREET",
    title: "THE ARRIVAL",
    text: "A quiet Toronto street introduces the residence.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "02",
    name: "FRONT DOOR",
    title: "THE THRESHOLD",
    text: "A considered entrance creates the first sense of arrival.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "03",
    name: "ENTRANCE",
    title: "FIRST LIGHT",
    text: "Natural light pulls you deeper into the residence.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "04",
    name: "HALLWAY",
    title: "A QUIET CONNECTION",
    text: "The circulation spaces connect each room with a sense of rhythm.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "05",
    name: "LIVING ROOM",
    title: "SPACE WITH PRESENCE",
    text: "A generous living room opens toward the city.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "06",
    name: "KITCHEN",
    title: "THE HEART OF HOME",
    text: "Clean lines and generous surfaces create a kitchen made for living.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "07",
    name: "STAIRS",
    title: "UPWARD",
    text: "A sculptural transition leads toward the private level.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "08",
    name: "BEDROOM",
    title: "THE PRIVATE SUITE",
    text: "A quieter space designed for retreat above the city.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "09",
    name: "BATH",
    title: "A PRIVATE RETREAT",
    text: "Stone, glass and soft light create a calm final interior.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=75"
  },
  {
    step: "10",
    name: "TERRACE",
    title: "YOUR NEXT ADDRESS",
    text: "The city becomes the final room.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=75"
  }
];

function PropertyPhoto({ room, index, progress }) {
  const texture = useTexture(room.image);
  const group = useRef();

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  useFrame(() => {
    if (!group.current) return;

    const p = progress.current;
    const distance = p - index;

    const targetX = distance * 4.6;
    const targetY = Math.sin(distance * 1.4) * 0.22;
    const targetZ = -Math.abs(distance) * 2.4;

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetX,
      0.08
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetY,
      0.08
    );

    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      targetZ,
      0.08
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      -distance * 0.16,
      0.08
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(distance) * 0.025,
      0.08
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(distance * 2) * 0.018,
      0.08
    );
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[12.8, 8.0, 32, 20]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[13.15, 8.35]} />
        <meshBasicMaterial
          color="#090909"
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  );
}

function CameraRig({ progress }) {
  const { camera } = useThree();

  useFrame((state) => {
    const p = progress.current;
    const section = p * 0.65;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      Math.sin(section * 1.7) * 0.24,
      0.035
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      Math.cos(section * 1.3) * 0.12,
      0.035
    );

    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      6.2,
      0.04
    );

    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      Math.sin(state.clock.elapsedTime * 0.3) * 0.004,
      0.03
    );
  });

  return null;
}

function Atmosphere({ progress }) {
  const points = useRef();

  const positions = React.useMemo(() => {
    const array = new Float32Array(900);

    for (let i = 0; i < array.length; i += 3) {
      array[i] = (Math.random() - 0.5) * 18;
      array[i + 1] = (Math.random() - 0.5) * 10;
      array[i + 2] = -Math.random() * 14;
    }

    return array;
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime * 0.008 +
      progress.current * 0.035;

    points.current.position.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.025}
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ progress }) {
  return (
    <>
      <CameraRig progress={progress} />

      {rooms.map((room, index) => (
        <PropertyPhoto
          key={room.step}
          room={room}
          index={index}
          progress={progress}
        />
      ))}

      <Atmosphere progress={progress} />

      <fog attach="fog" args={["#090909", 10, 28]} />
    </>
  );
}

export default function Walkthrough() {
  const sectionRef = useRef();
  const progress = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const max = section.offsetHeight - window.innerHeight;

      if (max <= 0) return;

      const value = THREE.MathUtils.clamp(
        -rect.top / max,
        0,
        1
      );

      const mapped = value * (rooms.length - 1);

      progress.current = mapped;

      const next = Math.round(mapped);

      setActive((current) =>
        current === next ? current : next
      );
    };

    window.addEventListener("scroll", update, {
      passive: true
    });

    update();

    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="real-walkthrough"
      style={{
        height: "1000vh",
        position: "relative"
      }}
    >
      <div
        className="real-walkthrough-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#090909"
        }}
      >
        <Canvas
          camera={{
            position: [0, 0, 6.2],
            fov: 52
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={["#090909"]} />
          <Scene progress={progress} />
        </Canvas>

        <div
          className="real-walkthrough-copy"
          style={{
            position: "absolute",
            left: "7vw",
            bottom: "12vh",
            maxWidth: "560px",
            color: "white",
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: ".28em",
              opacity: .65,
              marginBottom: "14px"
            }}
          >
            {rooms[active].step} / 10 — {rooms[active].name}
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "clamp(42px, 7vw, 92px)",
              lineHeight: .9,
              letterSpacing: "-.045em"
            }}
          >
            {rooms[active].title}
          </h2>

          <p
            style={{
              maxWidth: "420px",
              fontSize: "14px",
              lineHeight: 1.7,
              opacity: .72,
              marginTop: "22px"
            }}
          >
            {rooms[active].text}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            right: "7vw",
            bottom: "12vh",
            color: "white",
            fontSize: "10px",
            letterSpacing: ".18em",
            opacity: .55
          }}
        >
          SCROLL TO WALK
        </div>

        <div
          style={{
            position: "absolute",
            left: "7vw",
            right: "7vw",
            bottom: "7vh",
            height: "1px",
            background: "rgba(255,255,255,.22)"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(active / (rooms.length - 1)) * 100}%`,
              background: "white",
              transition: "width .25s ease"
            }}
          />
        </div>
      </div>
    </section>
  );
}
