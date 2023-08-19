import React from 'react';
import { Line, Text } from '@react-three/drei';
import { AppComponent } from 'types';
import { COLORS } from 'core/threejs/consts';

const KeyFragment: AppComponent<{
  pressed: boolean;
  label: string;
  angle: number;
}> = ({ pressed, label, angle }) => {
  return (
    <group position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 2 + angle]}>
      <group scale={pressed ? 1.05 : 1}>
        <mesh>
          <meshBasicMaterial
            color={pressed ? [0, 1, 0] : [1, 1, 1]}
            opacity={1}
            // transparent={true}
            toneMapped={false}
          />
          <torusGeometry args={[1, 0.04, 16, 100]} />
        </mesh>
        <Text scale={[1, 1, 1]} anchorX={'center'} anchorY={'middle'}>
          {label}
        </Text>
      </group>
      <Line
        points={[
          [0, 0, -60],
          [0, 0, 7]
        ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
        color={COLORS.GREEN} // Default
        lineWidth={3} // In pixels (default)
        // segments // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
      />
    </group>
  );
};

export default KeyFragment;
