import HStack from 'components/HStack';
import VStack from 'components/VStack';
import {
  realtimeKeyboardAtom, delayedKeyboardAtom
} from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import boxStyle from 'styles/boxStyle';
import { cn } from 'utils';

const Box: React.FC<{
  label: string;
  className?: string;
}> = ({ label: _label, className }) => {
  const label = _label === ' ' ? '[ ]' : _label;

  return (
    <div
      className={cn([
        boxStyle,
        'flex aspect-square w-16 items-center justify-center whitespace-nowrap  rounded-md border-4 border-opacity-70 p-0 font-mono font-bold leading-none ',
        className,
      ])}
    >
      <span className="text-sm leading-none">{label}</span>
    </div>
  );
};

const Taps = () => {
  const realtime = useAtomValue(realtimeKeyboardAtom);
  const delayed = useAtomValue(delayedKeyboardAtom)

  const options = useMemo(() => {
    const { presses, map } = realtime;
    return map.map((key, index) => ({
      key,
      pressed: presses[index],
      hasBeenPressed: delayed.presses[index],
    }));
  }, [realtime, delayed]);

  return (
    <VStack className="items-center justify-center gap-3 md:flex-row">
      <HStack className="w-20"></HStack>
      <HStack className=" gap-1 md:gap-3 ">
        {options.map((item, i) => (
          <Box
            key={i}
            label={item.key}
            className={cn([
              {
                'bg-slate-400 dark:bg-slate-700': item.pressed,
                'border-b-green-4o00 border-b-4 dark:border-b-green-400':
                  item.hasBeenPressed,
              },
            ])}
          />
        ))}
      </HStack>
      <HStack className="w-20">
        <VStack
          className="aspect-square w-full rounded-lg border-4 border-gray-200 border-opacity-5 p-2"
          center
        >
          {delayed.label && (
            <span className="font-mono text-5xl font-bold leading-none text-green-400">
              {delayed.label}
            </span>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Taps;
