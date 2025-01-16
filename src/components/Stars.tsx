import { useMemo, useRef } from 'react';

import * as THREE from 'three';
import { MousePosition } from '~/hooks/useMousePosition';

import { useFrame } from '@react-three/fiber';

interface StarsProps {
  count?: number;
  mousePosition: MousePosition;
  scrollPosition: number;
}

export function Stars({ count = 5000, mousePosition, scrollPosition }: StarsProps) {
  const points = useRef<THREE.Points>(null);
  const time = useRef(0);
  const opacities = useRef(new Float32Array(count));
  const alphas = useRef(new Float32Array(count));
  const frequencies = useRef(new Float32Array(count));
  const starTexture = useMemo(() => new THREE.TextureLoader().load('/images/3d/star.png'), []);
  const twinkleOffsets = useRef(new Float32Array(count));

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 200; // Stars between 20 and 220 units away
      opacities.current[i] = Math.random() * 0.5 + 0.5; // Random base opacity
      twinkleOffsets.current[i] = Math.random() * Math.PI * 2; // Random phase offset
      frequencies.current[i] = Math.random() * 2 + 0.1; // Random frequency between 0.1 and 2.1
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Set initial alpha values
      alphas.current[i] = opacities.current[i];
      sizes[i] = Math.random() * 0.3 + 0.05; // Random base size between 0.05 and 0.35
      colors[i * 3] = 1; // R
      colors[i * 3 + 1] = 1; // G
      colors[i * 3 + 2] = 1; // B
    }
    return { positions, sizes, colors };
  }, [count]);

  const baseRotation = useRef(0);

  useFrame(() => {
    if (points.current) {
      baseRotation.current += 0.0005;
      // Rotate stars in opposition to Mars to create parallax effect
      points.current.rotation.y = scrollPosition * 0.001 - baseRotation.current;
      points.current.rotation.y += (mousePosition.x * 0.02 - points.current.rotation.y) * 0.2;
      points.current.rotation.x += (-mousePosition.y * 0.03 - points.current.rotation.x) * 0.3;
    }

    // Update star twinkling
    time.current += 0.02;

    if (points.current?.material) {
      const sizes = points.current.geometry.attributes.size as THREE.BufferAttribute;
      const colors = points.current.geometry.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        const frequency = frequencies.current[i];
        // Oscillate between 0.1 and 1.0
        const alpha = Math.sin(time.current * frequency + twinkleOffsets.current[i]) * 0.45 + 0.55;
        colors.array[i * 3 + 0] = alpha; // R
        colors.array[i * 3 + 1] = alpha; // G
        colors.array[i * 3 + 2] = alpha; // B
        const twinkle = Math.sin(time.current * frequency + twinkleOffsets.current[i]) * 0.5 + 0.5;
        sizes.array[i] = particlesPosition.sizes[i] * twinkle;
      }
      colors.needsUpdate = true;
      sizes.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particlesPosition.sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        transparent={true}
        alphaTest={0.001}
        sizeAttenuation={true}
        depthWrite={false}
        color="#ffffff"
        vertexColors={true}
        opacity={1.0}
      />
    </points>
  );
}
