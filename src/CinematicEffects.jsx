import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 pos = position;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uTransition;

  varying vec2 vUv;

  float random(vec2 p) {
    return fract(
      sin(dot(p, vec2(12.9898, 78.233))) *
      43758.5453
    );
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(random(i), random(i + vec2(1.0, 0.0)), f.x),
      mix(random(i + vec2(0.0, 1.0)),
          random(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;

    /*
      LIQUID GLASS DISTORTION
    */
    float wave =
      sin(uv.y * 18.0 + uTime * 1.4) *
      0.0025;

    float wave2 =
      sin(uv.x * 13.0 - uTime * 1.1) *
      0.002;

    uv.x += wave * uTransition;
    uv.y += wave2 * uTransition;

    /*
      RADIAL TRANSITION ENERGY
    */
    vec2 center = vec2(0.5);
    float dist = distance(uv, center);

    float pulse =
      smoothstep(
        0.65,
        0.0,
        dist
      ) *
      uTransition;

    /*
      CINEMATIC VIGNETTE
    */
    float vignette =
      smoothstep(
        0.9,
        0.25,
        distance(uv, center)
      );

    /*
      FILM GRAIN
    */
    float grain =
      random(
        uv * (uTime + 10.0)
      ) * 0.055;

    /*
      LIGHT SWEEP
    */
    float sweep =
      smoothstep(
        0.02,
        0.0,
        abs(
          uv.x -
          fract(uProgress * 0.8)
        )
      );

    /*
      ATMOSPHERIC NOISE
    */
    float atmospheric =
      noise(
        uv * 5.0 +
        uTime * 0.08
      ) * 0.025;

    /*
      RGB SPLIT
    */
    float red =
      pulse * 0.035;

    float blue =
      pulse * -0.035;

    vec3 color = vec3(0.0);

    color.r += red;
    color.g += sweep * 0.025;
    color.b += blue;

    color += atmospheric;
    color += grain;

    /*
      VIGNETTE
    */
    color *= vignette;

    /*
      SUBTLE WHITE ENERGY
    */
    color += pulse * 0.08;

    gl_FragColor =
      vec4(color, 0.38);
  }
`;

export default function CinematicEffects({
  progress,
  transition
}) {
  const material = useRef();

  useFrame((state) => {
    if (!material.current) return;

    material.current.uniforms.uTime.value =
      state.clock.elapsedTime;

    material.current.uniforms.uProgress.value =
      progress.current;

    material.current.uniforms.uTransition.value =
      transition.current;
  });

  return (
    <mesh
      position={[0, 0, -0.1]}
      renderOrder={50}
    >
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        uniforms={{
          uTime: {
            value: 0
          },
          uProgress: {
            value: 0
          },
          uTransition: {
            value: 0
          }
        }}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
