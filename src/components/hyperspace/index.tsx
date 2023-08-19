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
import KeyFragment from './keyboard/KeyFragment';
import { COLORS } from 'core/threejs/consts';

const globalRotation = new Euler(-Math.PI / 2, 0, 0);
const Hyperspace = () => {
  const realtime = useAtomValue(realtimeKeyboardAtom);
  const delayed = useAtomValue(delayedKeyboardAtom);

  const options = useMemo(() => {
    const { presses, map } = realtime;
    return map.map((key, index) => ({
      key,
      pressed: presses[index],
      hasBeenPressed: delayed.presses[index]
    }));
  }, [realtime, delayed]);

  const TextMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: realtime.label === delayed.label ? COLORS.GREEN : COLORS.WHITE,
        transparent: true,
        opacity: 1
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
          <group>
            <mesh>
              <meshBasicMaterial
                color={COLORS.GREEN}
                opacity={0.01}
                transparent={true}
                toneMapped={false}
              />
              <torusGeometry args={[3, 0.02, 8, 40]} />
            </mesh>
            {options.map(({ pressed, key }, i, array) => {
              const prev =
                Math.PI / 2 +
                ((Math.PI * 2) / array.length) * i -
                ((Math.PI * 2) / array.length) * 2;
              const angle = prev < 0 ? Math.PI * 2 + prev : prev;
              const angleText = Number(angle * (180 / Math.PI)).toFixed(0);
              return (
                <group key={key} rotation={[0, 0, -angle + Math.PI / 2]}>
                  <KeyFragment label={key} pressed={pressed} angle={angle} />
                </group>
              );
            })}
          </group>
        </group>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            mipmapBlur
            luminanceSmoothing={0.4}
            radius={0.6}
            height={10}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Hyperspace;
