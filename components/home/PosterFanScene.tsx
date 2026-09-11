'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// The only file in the app that touches three/@react-three/fiber -
// if the 3D approach ever changes, this is the one file that moves.
export function PosterFanScene({ urls }: { urls: string[] }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <PosterFan urls={urls} />
      </Suspense>
    </Canvas>
  );
}

function PosterFan({ urls }: { urls: string[] }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const textures = useTexture(urls);

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // slow idle drift, plus a gentle lerp toward the cursor - never a snap
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.05;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.15, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.current.x * -0.08, 0.05);
  });

  const mid = (textures.length - 1) / 2;

  return (
    <group ref={group}>
      {textures.map((texture, i) => (
        <mesh
          key={i}
          position={[(i - mid) * 0.55, Math.abs(i - mid) * -0.15, i * 0.05]}
          rotation={[0, 0, (i - mid) * 0.12]}
        >
          <planeGeometry args={[1.8, 2.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
