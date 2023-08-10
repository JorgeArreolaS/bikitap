import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ArrayOf<V>(value: V, length: number) {
  return Array(length).fill(value);
}

export const tapsToValue: (params: boolean[]) => number = (presses) => {
  const numeric = presses.reduce((acc, tap, index) => {
    return acc + (tap ? 2 ** index : 0);
  }, 0);

  return numeric;
};

export const areAllValue: <Value>(params: Value[], value: Value) => boolean = (
  values,
  value
) => {
  console.log(
    values,
    value,
    values.every((v) => v === value)
  );
  return values.every((v) => v === value);
};

export type Action<Type extends string, Payload = void> = Payload extends void
  ? {
      type: Type;
    }
  : {
      type: Type;
      payload: Payload;
    };
