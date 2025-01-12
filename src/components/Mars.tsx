'use client';

import {
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';
import { TextureLoader } from 'three';

import { Sphere } from '@react-three/drei';
import {
  Canvas,
  useFrame,
  useLoader,
} from '@react-three/fiber';

export function Mars({ scrollPosition }: { scrollPosition: number }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Canvas>
        <fog attach="fog" args={['white', 50, 190]} />

        {/* <ambientLight intensity={0.01} /> */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />

        <pointLight position={[-20, 10, 10]} />
        <MarsRenderer scrollPosition={scrollPosition} />
      </Canvas>
    </div>
  );
}

function MarsRenderer({ scrollPosition }: { scrollPosition: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const marsTexture = useLoader(TextureLoader, '/mars_2k_color.jpg');
  const marsHeightmap = useLoader(TextureLoader, '/mars_2k_topo.jpg');

  const displacementScale = 0.15;

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        colorMap: { value: marsTexture },
        displacementMap: { value: marsHeightmap },
        displacementScale: { value: displacementScale },
      },
      vertexShader: `
        uniform sampler2D displacementMap;
        uniform float displacementScale;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 displacement = texture2D(displacementMap, uv);
          vec3 newPosition = position + normal * displacement.r * displacementScale;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D colorMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(colorMap, vUv);
          gl_FragColor = color;
        }
      `,
    }),
    [marsTexture, marsHeightmap, displacementScale]
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = scrollPosition * 0.001;
    }
  });

  return (
    <Sphere args={[2, 256, 256]} ref={meshRef}>
      <shaderMaterial attach="material" args={[shaderArgs]} />
    </Sphere>
  );
}
