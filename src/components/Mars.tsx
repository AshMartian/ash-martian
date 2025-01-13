'use client';

import { useMemo, useRef } from 'react';

import * as THREE from 'three';
import { TextureLoader } from 'three';
import { MousePosition, useMousePosition, useScrollPosition } from '~/hooks';

import { OrbitControls, Sphere } from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';

import { Stars } from './Stars';

export function Mars() {
  const mousePosition = useMousePosition();
  const scrollPosition = useScrollPosition();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#000000']} />

        <ambientLight intensity={0.1} />

        <MarsRenderer mousePosition={mousePosition} scrollPosition={scrollPosition} />
        <Stars mousePosition={mousePosition} scrollPosition={scrollPosition} />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

interface MarsRendererProps {
  mousePosition: MousePosition;
  scrollPosition: number;
}

function MarsRenderer({ mousePosition, scrollPosition }: MarsRendererProps) {
  const meshRef = useRef<THREE.Mesh>(null);
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
        lightPosition: { value: new THREE.Vector3() },
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
          float ambient = 0.15;

          // Specular highlights
          vec3 viewDir = vec3(0.0, 0.0, 1.0);
          vec3 reflectDir = reflect(-lightDir, worldNormal);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
          float specular = 0.2 * spec;

          // Combine lighting with texture
          vec4 color = texture2D(colorMap, vUv);
          vec3 lighting = vec3(ambient + diffuse + specular);
          gl_FragColor = vec4(color.rgb * lighting, 1.0);
        }
      `,
    }),
    [marsTexture, marsHeightmap, marsNormalMap]
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = scrollPosition * 0.001;
      // Add subtle mouse-based rotation
      meshRef.current.rotation.y += (mousePosition.x * 0.02 - meshRef.current.rotation.y) * 0.2;
      meshRef.current.rotation.x += (-mousePosition.y * 0.03 - meshRef.current.rotation.x) * 0.3;
    }

    // Update light position in shader
    if (meshRef.current?.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.lightPosition.value.set(
        -scrollPosition * 0.02 + mousePosition.x * 5,
        mousePosition.y * 5,
        8
      );
    }
  });

  return (
    <>
      {/* Atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <shaderMaterial
          transparent={true}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={{
            glowColor: { value: new THREE.Color('#3fe3ff') },
            viewVector: { value: new THREE.Vector3(0, 0, 1) },
          }}
          vertexShader={`
            varying float intensity;
            uniform vec3 viewVector;

            void main() {
              vec3 vNormal = normalize(normalMatrix * normal);
              vec3 vNormel = normalize(normalMatrix * viewVector);
              // Calculate fresnel effect based on view angle
              float fresnel = 1.0 - abs(dot(vNormal, vNormel));
              // Adjust the power and scale for a more even glow
              intensity = pow(fresnel, 4.0) * 0.6;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            varying float intensity;

            void main() {
              vec3 glow = glowColor * intensity;
              gl_FragColor = vec4(glow, intensity);
            }
          `}
        />
      </Sphere>
      <Sphere args={[2, 256, 256]} ref={meshRef}>
        <shaderMaterial attach="material" args={[shaderArgs]} />
      </Sphere>
    </>
  );
}
