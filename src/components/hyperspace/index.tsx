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
import { Color, Euler, MeshBasicMaterial } from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const Hyperspace = () => {
  // const [items] = useState(Array(5).fill(0));
  const realtime = useAtomValue(realtimeKeyboardAtom);
  const delayed = useAtomValue(delayedKeyboardAtom);
  const globalRotation = new Euler(-Math.PI / 2, 0, 0);

  const options = useMemo(() => {
    const { presses, map } = realtime;
    return map.map((key, index) => ({
      key,
      pressed: presses[index],
      hasBeenPressed: delayed.presses[index]
    }));
  }, [realtime, delayed]);

  const green = useMemo(() => new Color(0, 1.5, 0), []);
  const white = useMemo(() => new Color(0xffffff), []);
  const TextMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: realtime.label === delayed.label ? green : white,
        transparent: true,
        opacity: 0.5
      }),
    [realtime.label, delayed.label]
  );

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 15, 0]} />
        <CameraControls makeDefault />
        {/* <Grid cellSize={10} args={[20, 20]} /> */}

        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 0]} />
        <group position={[0, 0, 0]} rotation={globalRotation}>
          <Text scale={[2, 2, 2]} material={TextMaterial}>
            {realtime.label}
          </Text>
          {options.map(({ pressed, key }, i, array) => (
            <group
              rotation={[
                0,
                0,
                -((Math.PI * 2) / array.length) * i +
                  Math.PI / 2 +
                  ((Math.PI * 2) / array.length) * 2
              ]}
            >
              <group
                scale={pressed ? 1.05 : 1}
                position={[3, 0, 0]}
                rotation={[
                  0,
                  0,
                  ((Math.PI * 2) / array.length) * i -
                    ((Math.PI * 2) / array.length) * 2 -
                    Math.PI / 2
                ]}
              >
                <mesh key={i}>
                  <meshBasicMaterial
                    color={pressed ? [0, 1, 0] : [1, 1, 1]}
                    opacity={1}
                    // transparent={true}
                    toneMapped={false}
                  />
                  <torusGeometry args={[1, 0.04, 16, 100]} />
                </mesh>
                <Text
                  scale={[1, 1, 1]}
                  color={[0, 2, 0]}
                  // color={pressed ? [0, 0.5, 0] : [1, 1, 1]}
                  anchorX={'center'}
                  anchorY={'middle'}
                >
                  {key}
                </Text>
              </group>
            </group>
          ))}
        </group>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            mipmapBlur
            luminanceSmoothing={0.4}
            radius={0.6}
            height={300}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Hyperspace;
