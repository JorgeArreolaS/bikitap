import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithReducer } from 'jotai/utils';
import { useCallback, useEffect, useMemo } from 'react';
import { Action, ArrayOf, tapsToValue } from 'utils';

const DEFAULTS = {
  map: [' ', 'j', 'i', 'o', ';'],
  layout: [
    ...Array(26)
      .fill(0)
      .map((_, i) => String.fromCharCode(i + 65)),
    27,
    28,
    29,
    30,
    31,
  ],
};

interface IValue {
  numeric: number;
  parsed: string | number | null;
}

interface IBinaryKeyboard {
  presses: boolean[];
  value: number;
  label: string;
  isPressed: boolean;
  layout: (string | number)[];
  map: string[];
}
type TBinaryKeyboardAction =
  | Action<
      'updateAll',
      {
        presses: boolean[];
      }
    >
  | Action<
      'updatePress',
      {
        index: number;
        value: boolean;
      }
    >
  | Action<'clear'>;

const BinaryKeyboardReducer = (
  _keyboard: IBinaryKeyboard,
  _action: TBinaryKeyboardAction
) => {
  const action = Object.assign({}, _action);
  const keyboard = Object.assign({}, _keyboard);
  // const keyboard = _keyboard;
  if (!action) return keyboard;
  switch (action.type) {
    case 'updateAll':
      keyboard.presses = action.payload.presses;
      break;
    case 'updatePress':
      keyboard.presses[action.payload.index] = action.payload.value;
      break;
    case 'clear':
      console.log('clear');
      keyboard.presses = ArrayOf(false, 5);
      break;
  }
  keyboard.value = tapsToValue(keyboard.presses);
  keyboard.isPressed = keyboard.presses.some((v) => v);
  keyboard.label = String(keyboard.layout[keyboard.value - 1] ?? '');
  // console.log(":", keyboard.presses)
  return keyboard;
};

export const realtimeKeyboardAtom = atomWithReducer(
  {
    presses: ArrayOf(false, 5),
    value: 0,
    label: '',
    isPressed: false,
    map: DEFAULTS.map,
    layout: DEFAULTS.layout,
  },
  BinaryKeyboardReducer
);

export const delayedKeyboardAtom = atomWithReducer(
  {
    presses: ArrayOf(false, 5),
    value: 0,
    label: '',
    isPressed: false,
    map: DEFAULTS.map,
    layout: DEFAULTS.layout,
  },
  BinaryKeyboardReducer
);

export const pressedAtom = atom<boolean[]>((get) => {
  const keyboard = get(realtimeKeyboardAtom);
  return keyboard.presses;
});
export const valueAtom = atom<{
  numeric: number;
  parsed: string | number | null;
}>((get) => {
  const keyboard = get(realtimeKeyboardAtom);
  const values = get(valuesAtom);
  // console.log(keyboard.value);
  return {
    numeric: keyboard.value,
    parsed: values[keyboard.value] ?? null,
  };
});

export const keysAtom = atom<string[]>([' ', 'j', 'i', 'o', ';']);
export const isSelectedAtom = atom<boolean>(false);
export const readingAtom = atom<boolean>(false);
export const finalValueAtom = atom<IValue | null>(null);

export const useTap = () => {
  const keys = useAtomValue(keysAtom);
  const [finalValue, setFinalValue] = useAtom(finalValueAtom);

  const [realtimeKeyboard, dispatchRealtimeKeyboard] =
    useAtom(realtimeKeyboardAtom);

  const [delayedKeyboard, dispatchDelayedKeyboard] =
    useAtom(delayedKeyboardAtom);

  //  console.log(">",realtimeKeyboard);

  useEffect(() => {
    console.log('Change', realtimeKeyboard.value, realtimeKeyboard.isPressed);
    if (!realtimeKeyboard.isPressed) {
      setFinalValue({
        numeric: delayedKeyboard.value,
        parsed: delayedKeyboard.layout[delayedKeyboard.value - 1] ?? null,
      });
      dispatchDelayedKeyboard({
        type: 'clear',
      });
    }
  }, [realtimeKeyboard, dispatchDelayedKeyboard]);

  const keysMap = useMemo(() => {
    return Object.fromEntries(keys.map((key, i) => [key, i]));
  }, [keys]);

  const handleKey = useCallback((index: number, value: boolean) => {
    dispatchDelayedKeyboard({
      type: 'updatePress',
      payload: {
        index,
        value: true,
      },
    });
    dispatchRealtimeKeyboard({
      type: 'updatePress',
      payload: {
        index,
        value,
      },
    });
  }, []);

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
    value: finalValue,
  };
};

export const valuesAtom = atom<(string | number)[]>(DEFAULTS.layout);
