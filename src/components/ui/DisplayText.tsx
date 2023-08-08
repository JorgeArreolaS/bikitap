import VStack from 'components/VStack';
import { isPressedAtom, isSelectedAtom, valueAtom } from 'hooks/useTap';
import { useAtomValue } from 'jotai';
import { cn } from 'utils';

const DisplayText = () => {
  const value = useAtomValue(valueAtom);
  const selected = useAtomValue(isSelectedAtom);
  const isPressed = useAtomValue(isPressedAtom);

  return (
    <VStack className={cn(['items-center gap-5'])}>
      <span className={cn(['text-9xl font-bold', selected && 'text-blue-500'])}>
        {value.numeric}
      </span>
      <span
        className={cn(['h-8 text-5xl font-bold', selected && 'text-blue-500'])}
      >
        {value.parsed || ''}
      </span>
      <span
        className={cn([
          'h-8 text-2xl font-bold',
          isPressed && 'text-green-500',
        ])}
      >
        {isPressed ? 'pressed' : 'not pressed'}
      </span>
    </VStack>
  );
};

export default DisplayText;
