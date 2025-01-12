'use client';

import {
  useMemo,
  useRef,
} from 'react';

import * as THREE from 'three';
import { TextureLoader } from 'three';
import {
  useMousePosition,
  useScrollPosition,
} from '~/hooks';

import { Sphere } from '@react-three/drei';
import {
  Canvas,
  useFrame,
  useLoader,
} from '@react-three/fiber';

export function Mars() {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <Canvas>
        <fog attach="fog" args={['white', 50, 190]} />

        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} decay={0} intensity={2.0} />
        <pointLight position={[-10, -10, -10]} intensity={1.0} />
        <MarsRenderer />
      </Canvas>
    </div>
  );
}

function MarsRenderer() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useMousePosition();
  const scrollPosition = useScrollPosition();
  const marsTexture = useLoader(TextureLoader, '/mars_2k_color.jpg');
  const marsHeightmap = useLoader(TextureLoader, '/mars_2k_topo.jpg');
  const marsNormalMap = useLoader(TextureLoader, '/mars_2k_normal.jpg');

  const displacementScale = 0.15;

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        colorMap: { value: marsTexture },
        displacementMap: { value: marsHeightmap },
        normalMap: { value: marsNormalMap },
        displacementScale: { value: displacementScale },
        lightPosition: { value: new THREE.Vector3(5, 5, 5) },
      },
      vertexShader: `
        uniform sampler2D displacementMap;
        uniform float displacementScale;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vTangent;
        varying vec3 vBitangent;

        void main() {
          vUv = uv;

          // Calculate tangent space
          vec3 tangent = normalize(vec3(1.0, 0.0, 0.0));
          vec3 bitangent = normalize(cross(normal, tangent));

          vNormal = normalize(normal);
          vTangent = normalize(tangent);
          vBitangent = normalize(bitangent);

          vec4 displacement = texture2D(displacementMap, uv);
          vec3 newPosition = position + normal * displacement.r * displacementScale;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D colorMap;
        uniform sampler2D normalMap;
        uniform vec3 lightPosition;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vTangent;
        varying vec3 vBitangent;

        void main() {
          // Get the surface normal from the normal map
          vec3 normalColor = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
          mat3 TBN = mat3(vTangent, vBitangent, vNormal);
          vec3 worldNormal = normalize(TBN * normalColor);

          // Calculate lighting
          vec3 lightDir = normalize(lightPosition);
          float diffuse = max(dot(worldNormal, lightDir), 0.0);

          // Ambient light
          float ambient = 0.3;

          // Specular highlights
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 reflectDir = reflect(-lightDir, worldNormal);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
          float specular = 0.5 * spec;

          // Combine lighting with texture
          vec4 color = texture2D(colorMap, vUv);
          vec3 lighting = vec3(ambient + diffuse + specular);
          gl_FragColor = vec4(color.rgb * lighting, 1.0);
        }
      `,
    }),
    [marsTexture, marsHeightmap, marsNormalMap, displacementScale]
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = scrollPosition * 0.001;
      // Add subtle mouse-based rotation
      meshRef.current.rotation.y += (mousePosition.x * 0.02 - meshRef.current.rotation.y) * 0.2;
      meshRef.current.rotation.x += (-mousePosition.y * 0.03 - meshRef.current.rotation.x) * 0.3;
    }
  });

  return (
    <Sphere args={[2, 256, 256]} ref={meshRef}>
      <shaderMaterial attach="material" args={[shaderArgs]} />
    </Sphere>
  );
}