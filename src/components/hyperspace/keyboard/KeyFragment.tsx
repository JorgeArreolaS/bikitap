import React from 'react';
import { Line, QuadraticBezierLine, Text } from '@react-three/drei';
import { AppComponent } from 'types';
import { COLORS } from 'core/threejs/consts';

const KeyFragment: AppComponent<{
  pressed: boolean;
  label: string;
  angle: number;
}> = ({ pressed, label, angle }) => {
  return (
    <group>
      <group position={[0, 3, 0]} rotation={[0, 0, -Math.PI / 2 + angle]}>
        <mesh scale={pressed ? 1.05 : 1}>
          <meshBasicMaterial
            color={pressed ? [0, 1, 0] : [1, 1, 1]}
            opacity={1}
            // transparent={true}
            toneMapped={false}
          />
          {/* <torusGeometry args={[1, 0.04, 8, 50]} /> */}
          <ringGeometry args={[1, 1.05, 40]} />
        </mesh>
        <Text scale={[1, 1, 1]} anchorX={'center'} anchorY={'middle'}>
          {label}
        </Text>
      </group>
      <group rotation={[0, 0, 0]}>
        <Line
          points={[
            [0, 5],
            [0, 6]
          ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
          color={COLORS.GREEN} // Default
          lineWidth={3} // In pixels (default)
          // segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
        />
        <mesh position={[0, 3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <meshBasicMaterial
            opacity={1}
            color={COLORS.GREEN}
            // transparent={true}
            toneMapped={false}
          />
          {/* <torusGeometry args={[1.5, 0.02, 16, 100, (Math.PI * 2) / 4]} /> */}
          <ringGeometry args={[1.5, 1.57, 40, 1, 0, Math.PI*2/4]} />
        </mesh>
      </group>
    </group>
  );
};

export default KeyFragment;
