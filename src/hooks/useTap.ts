import { atom, useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface IValue {
  numeric: number;
  parsed: string | number | null;
}

export const pressedAtom = atom<boolean[]>(Array(5).fill(false));
export const valueAtom = atom<IValue>((get) => {
  const numeric = get(pressedAtom).reduce((acc, tap, index) => {
    return acc + (tap ? 2 ** index : 0);
  }, 0);
  const values = get(valuesAtom);

  const parsed = values[numeric - 1] ?? null;

  return {
    numeric,
    parsed
  }
});

export const keysAtom = atom<string[]>([' ', 'j', 'i', 'o', ';']);
export const valuesAtom = atom<(string | number)[]>([
  ...Array(26)
    .fill(0)
    .map((_, i) => String.fromCharCode(i + 65)),
  27,
  28,
  29,
  30,
  31,
]);

interface ICache {
  value: number;
  time: number;
}
export const isPressedAtom = atom<boolean>((get) => {
  const value = get(valueAtom);
  return value.numeric > 0;
});
export const cacheAtom = atom<ICache[]>([]);
export const isSelectedAtom = atom<boolean>(false);
export const readingAtom = atom<boolean>(false);

export const useTap = () => {
  const keys = useAtomValue(keysAtom);
  const [pressed, setPressed] = useAtom(pressedAtom);

  useEffect(() => {}, [pressed]);

  const keysMap = useMemo(() => {
    return Object.fromEntries(keys.map((key, i) => [key, i]));
  }, [keys]);

  const handleKey = useCallback(
    (index: number, value: boolean) => {
      setPressed((taps) => {
        const newTaps = [...taps];
        newTaps[index] = value;
        return newTaps;
      });
    },
    [setPressed]
  );

  const handlePress = useCallback(
    (index: string, value: boolean) => {
      const keyIndex = keysMap[index];
      if (keyIndex !== undefined) {
        handleKey(keyIndex, value);
      }
    },
    [keysMap, handleKey]
  );

  return {
    handlePress,
  };
};
