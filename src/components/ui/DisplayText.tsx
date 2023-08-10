import VStack from 'components/VStack';
import {
  realtimeKeyboardAtom, isSelectedAtom
} from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import { cn } from 'utils';

const DisplayText = () => {
  const realtimeKeyboard = useAtomValue(realtimeKeyboardAtom);
  const selected = useAtomValue(isSelectedAtom);

  return (
    <VStack className={cn(['items-center gap-5'])}>
      <span className={cn(['text-9xl font-bold', selected && 'text-blue-500'])}>
        {realtimeKeyboard.label || ''}
      </span>
    </VStack>
  );
};

export default DisplayText;
