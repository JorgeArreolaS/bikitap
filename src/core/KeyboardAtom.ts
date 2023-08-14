import { atomWithReducer } from 'jotai/utils';
import { Action, ArrayOf, tapsToValue } from 'utils';

const DEFAULTS: {
  map: string[];
  layouts: KeyboardLayout[];
} = {
  map: [' ', 'j', 'i', 'o', ';'],
  layouts: [
    {
      id: 'querty',
      label: 'abc',
      values: [
        ...Array(26)
          .fill(0)
          .map((_, i) => String.fromCharCode(i + 65)),
        27,
        28,
        29,
        30,
        31
      ]
    },
    {
      id: 'numeric',
      label: 'numeric',
      values: [
        ...Array(31)
          .fill(0)
          .map((_, i) => i + 1)
      ]
    }
  ]
};

interface KeyboardLayout {
  id: string;
  label: string;
  values: (string | number)[];
}

interface IBinaryKeyboard {
  presses: boolean[];
  value: number;
  label: string | number | null;
  isPressed: boolean;
  map: string[];
  layout: KeyboardLayout;
  layouts: KeyboardLayout[];
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
  | Action<'clear'>
  | Action<'setLayout', { id: string }>;

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
    case 'setLayout':
      // eslint-disable-next-line no-case-declarations
      const layout = keyboard.layouts.find((l) => l.id === action.payload.id);
      if (layout) keyboard.layout = layout;
      break;
  }
  keyboard.value = tapsToValue(keyboard.presses);
  keyboard.isPressed = keyboard.presses.some((v) => v);
  keyboard.label = keyboard.layout.values[keyboard.value - 1] ?? '';
  return keyboard;
};

const DEFAULT_KEYBOARD_STATE: IBinaryKeyboard = {
  presses: ArrayOf(false, 5),
  value: 0,
  label: '',
  isPressed: false,
  map: DEFAULTS.map,
  layout: DEFAULTS.layouts[0],
  layouts: DEFAULTS.layouts
};

export const createKeyboardAtom = (initial: Partial<IBinaryKeyboard>) =>
  atomWithReducer(
    {
      ...DEFAULT_KEYBOARD_STATE,
      ...initial
    },
    BinaryKeyboardReducer
  );
