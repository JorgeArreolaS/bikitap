import VStack from 'components/VStack';
import { delayedKeyboardAtom, realtimeKeyboardAtom } from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import { cn } from 'utils';

const DisplayText = () => {
  const realtimeKeyboard = useAtomValue(realtimeKeyboardAtom);
  const delayedKeyboard = useAtomValue(delayedKeyboardAtom);

  return (
    <VStack className={cn(['items-center gap-5'])}>
      <span
        className={cn([
          'text-9xl font-bold',
          realtimeKeyboard.label == delayedKeyboard.label && 'text-green-400'
        ])}
      >
        {realtimeKeyboard.label || ''}
      </span>
      <canvas/>
    </VStack>
  );
};

export default DisplayText;
