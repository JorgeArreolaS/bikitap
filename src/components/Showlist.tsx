import React, { FC, useMemo } from 'react';
import boxStyle from 'styles/boxStyle';
import { cn } from 'utils';
import HStack from './HStack';
import VStack from './VStack';
import { useAtomValue } from 'jotai';
import { realtimeKeyboardAtom, valuesAtom } from 'hooks/useTap';

const Showlist = () => {
  const { layout: list } = useAtomValue(realtimeKeyboardAtom);

  return (
    <VStack
      className={cn([
        boxStyle,
        'flex flex-col border-opacity-40 bg-opacity-40 p-2',
      ])}
    >
      <VStack className="grid w-full grid-flow-col grid-rows-8 gap-y-1 lg:grid-rows-4">
        <Item value={0} label="0" />
        {list.map((item, i) => (
          <Item key={i} value={i + 1} label={item.toString()} />
        ))}
      </VStack>
    </VStack>
  );
};

export default Showlist;

const ItemHighlight: FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn([
      'absolute z-50 h-full w-full scale-x-[1.08] scale-y-[1.5] rounded-sm border-2 bg-opacity-10',
      className,
    ])}
  ></div>
);

const ItemBox: FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn([
      ' aspect-square w-4 rounded-sm border-2 border-slate-500 bg-slate-500 dark:border-slate-500 dark:border-opacity-30 dark:bg-slate-300 ',
      className,
    ])}
  ></div>
);

const asBinary = (value: number, length = 5) => {
  const array = value
    .toString(2)
    .split('')
    .map((value) => parseInt(value));
  while (array.length < length) {
    array.unshift(0);
  }
  return array.reverse();
};

const Item: React.FC<{
  value: number;
  label?: string;
}> = ({ value, label }) => {
  const realtime = useAtomValue(realtimeKeyboardAtom);
  const currentValue = useMemo(() => realtime.value, [realtime]);
  const current = useMemo(() => currentValue == value, [currentValue, value]);

  const colors = useMemo(() => {
    if (currentValue == 0) return '';
    if (current) {
      return 'bg-sky-400 border-sky-500 text-sky-900 dark:bg-blue-400 dark:border-blue-400 dark:text-blue-400 ';
    }
    return '';
  }, [value, currentValue]);

  return (
    <HStack className={cn(['relative mx-auto w-min gap-2'])}>
      <ItemHighlight
        className={cn([
          'bg-opacity-5 dark:bg-opacity-5',
          colors,
          (!current || currentValue === 0) && 'hidden',
        ])}
      />
      <HStack className="gap-1">
        {asBinary(value).map((value, i) => (
          <ItemBox
            key={i}
            className={cn([
              'bg-red-400',
              colors,
              value == 0 && 'bg-opacity-0 dark:bg-opacity-0',
            ])}
          />
        ))}
      </HStack>
      <span
        className={cn([
          'w-5 font-mono leading-none text-slate-700 dark:text-slate-200',
          colors,
          'bg-opacity-0 dark:bg-opacity-0',
        ])}
      >
        {label}
      </span>
    </HStack>
  );
};
