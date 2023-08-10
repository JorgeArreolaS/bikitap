import { atomWithReducer } from 'jotai/utils';
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

interface IBinaryKeyboard {
  presses: boolean[];
  value: number;
  label: string | number | null;
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
  action: TBinaryKeyboardAction
) => {
  const keyboard = Object.assign({}, _keyboard);
  switch (action.type) {
    case 'updateAll':
      keyboard.presses = action.payload.presses;
      break;
    case 'updatePress':
      keyboard.presses[action.payload.index] = action.payload.value;
      break;
    case 'clear':
      keyboard.presses = ArrayOf(false, 5);
      break;
  }
  keyboard.value = tapsToValue(keyboard.presses);
  keyboard.isPressed = keyboard.presses.some((v) => v);
  keyboard.label = keyboard.layout[keyboard.value - 1] ?? '';
  return keyboard;
};

const DEFAULT_KEYBOARD_STATE = {
  presses: ArrayOf(false, 5),
  value: 0,
  label: '',
  isPressed: false,
  map: DEFAULTS.map,
  layout: DEFAULTS.layout,
};

export const createKeyboardAtom = (initial: Partial<IBinaryKeyboard>) =>
  atomWithReducer(
    {
      ...DEFAULT_KEYBOARD_STATE,
      ...initial,
    },
    BinaryKeyboardReducer
  );
