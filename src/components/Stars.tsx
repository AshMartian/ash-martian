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

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 200; // Stars between 20 and 220 units away
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (points.current) {
      // Rotate stars in opposition to Mars to create parallax effect
      points.current.rotation.x = scrollPosition * 0.001;
      points.current.rotation.y += (mousePosition.x * 0.02 - points.current.rotation.y) * 0.2;
      points.current.rotation.x += (-mousePosition.y * 0.03 - points.current.rotation.x) * 0.3;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.2} sizeAttenuation={true} color="white" transparent opacity={0.9} />
    </points>
  );
}
