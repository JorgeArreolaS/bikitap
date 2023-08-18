import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  Grid,
  PerspectiveCamera,
  Text
} from '@react-three/drei';
import { delayedKeyboardAtom, realtimeKeyboardAtom } from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import { Euler, MeshBasicMaterial } from 'three';

const Hyperspace = () => {
  // const [items] = useState(Array(5).fill(0));
  const realtime = useAtomValue(realtimeKeyboardAtom);
  const delayed = useAtomValue(delayedKeyboardAtom);
  const presses = realtime.presses;

  const total = presses.length;
  const globalRotation = new Euler(
    -Math.PI / 2,
    0,
    Math.PI / 2 + ((Math.PI * 2) / total) * 2
  );

  const options = useMemo(() => {
    const { presses, map } = realtime;
    return map.map((key, index) => ({
      key,
      pressed: presses[index],
      hasBeenPressed: delayed.presses[index]
    }));
  }, [realtime, delayed]);

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 15, 0]} />
        <CameraControls makeDefault />
        <Grid cellSize={10} args={[20, 20]} />

        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 0]} />
        <group position={[0, 0, 0]} rotation={globalRotation}>
          {options.map(({ pressed, key }, i, array) => (
            <group rotation={[0, 0, -((Math.PI * 2) / array.length) * i * 1]}>
              <group
                scale={pressed ? 1.1 : 1}
                position={[3, 0, 0]}
                rotation={[
                  0,
                  0,
                  (Math.PI * 2 * i) / array.length +
                    Math.PI / 2 -
                    ((Math.PI * 2) / total) * 2 +
                    Math.PI
                ]}
              >
                <mesh
                  key={i}
                  material={
                    new MeshBasicMaterial({
                      color: '#fff',
                      opacity: 0.2,
                      transparent: true
                    })
                  }
                >
                  <circleGeometry args={[1]} />
                </mesh>
                <Text
                  scale={[1, 1, 1]}
                  color={pressed ? '' : 'white'}
                  anchorX={'center'}
                  anchorY={'middle'}
                >
                  {key}
                </Text>
              </group>
            </group>
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default Hyperspace;
