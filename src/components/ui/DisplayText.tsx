import VStack from 'components/VStack';
import { realtimeKeyboardAtom } from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import { cn } from 'utils';

const DisplayText = () => {
  const realtimeKeyboard = useAtomValue(realtimeKeyboardAtom);

  return (
    <VStack className={cn(['items-center gap-5'])}>
      <span className={cn(['text-9xl font-bold'])}>
        {realtimeKeyboard.label || ''}
      </span>
    </VStack>
  );
};

export default DisplayText;
