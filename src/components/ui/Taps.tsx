import { keysAtom, pressedAtom } from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import boxStyle from 'styles/boxStyle';
import { cn } from 'utils';

const Box: React.FC<{
  value: boolean;
  label: string;
}> = ({ value, label: _label }) => {
  const label = _label === ' ' ? '[ ]' : _label;

  return (
    <div
      className={cn([
        boxStyle,
        'flex aspect-square w-16 items-center justify-center whitespace-nowrap  rounded-md border-4 border-opacity-70 font-mono font-bold leading-none p-0 ',
        {
          'bg-slate-400 dark:bg-slate-500': value,
        },
      ])}
    >
      <span className="text-sm leading-none">{label}</span>
    </div>
  );
};

const Taps = () => {
  const keys = useAtomValue(keysAtom);
  const taps = useAtomValue(pressedAtom);

  const options = useMemo(() => {
    return keys.map((key, index) => ({
      key,
      value: taps[index],
    }));
  }, [keys, taps]);

  return (
    <div className="flex w-full items-center justify-center gap-1 md:gap-3 ">
      {options.map((item, i) => (
        <Box key={i} value={item.value} label={item.key} />
      ))}
    </div>
  );
};

export default Taps;
