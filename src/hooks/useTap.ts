import { createKeyboardAtom } from 'core/KeyboardAtom';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';

export const realtimeKeyboardAtom = createKeyboardAtom({});
export const delayedKeyboardAtom = createKeyboardAtom({});

interface useTapProps {
  onNewValue?: (value: string | number | null) => void;
}

export const useTap = ({ onNewValue }: useTapProps) => {
  const [realtimeKeyboard, dispatchRealtimeKeyboard] =
    useAtom(realtimeKeyboardAtom);
  const [delayedKeyboard, dispatchDelayedKeyboard] =
    useAtom(delayedKeyboardAtom);

  useEffect(() => {
    if (!realtimeKeyboard.isPressed) {
      onNewValue?.(delayedKeyboard.label);
      dispatchDelayedKeyboard({
        type: 'clear'
      });
    }
  }, [realtimeKeyboard]);

  useEffect(() => {
    if (realtimeKeyboard.layout.id !== delayedKeyboard.layout.id)
      dispatchDelayedKeyboard({
        type: 'setLayout',
        payload: {
          id: realtimeKeyboard.layout.id
        }
      });
  }, [realtimeKeyboard.layout, delayedKeyboard.layout]);

  const keys = useMemo(() => realtimeKeyboard.map, [realtimeKeyboard]);

  const keysMap = useMemo(() => {
    return Object.fromEntries(keys.map((key, i) => [key, i]));
  }, [keys]);

  const handleKey = useCallback((index: number, value: boolean) => {
    dispatchDelayedKeyboard({
      type: 'updatePress',
      payload: {
        index,
        value: true
      }
    });
    dispatchRealtimeKeyboard({
      type: 'updatePress',
      payload: {
        index,
        value
      }
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
    handlePress
  };
};
