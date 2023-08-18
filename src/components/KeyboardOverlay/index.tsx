import HStack from 'components/HStack';
import Showlist from 'components/Showlist';
import VStack from 'components/VStack';
import DisplayText from 'components/ui/DisplayText';
import Taps from 'components/ui/Taps';
import { useTap } from 'hooks/useTap';
import { useEffect, useState } from 'react';

const KeyboardOverlay = () => {
  const [text, setText] = useState<string>('');

  const { handlePress } = useTap({
    onNewValue(value) {
      if (value === null) return;
      handleTrigger(value);
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    handlePress(e.key, true);
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    handlePress(e.key, false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function handleTrigger(value: string | number) {
    if (typeof value === 'string') return add(value);
    switch (value) {
      case 27:
        break;
      case 28:
        backspace();
        break;
      case 29:
        break;
      case 30:
        clear();
        break;
      case 31:
        add(' ');
        break;
    }
  }

  function add(value: string) {
    setText((text) => text + value);
  }
  function backspace() {
    setText((text) => text.slice(0, -1));
  }
  function clear() {
    setText('');
  }

  return (
    <VStack className="flex h-full w-full flex-col gap-5 p-10 absolute inset-0">
      <Showlist />
      <HStack className="h-full gap-3">
        <VStack className="w-full">
          <VStack className="relative">
            <h1 className="text-center font-mono text-6xl font-bold">{text}</h1>
            <div className="absolute left-0 top-0 rounded-md opacity-10 dark:text-white">
              <pre>
                <code>
                  {/* {cache.map((item, i) => `${item.value} - ${item.time.toISOString()}`).join('\n')} */}
                </code>
              </pre>
            </div>
          </VStack>

          <VStack className="h-full  items-center justify-center">
            <DisplayText />
          </VStack>
        </VStack>
      </HStack>
      <Taps />
    </VStack>
  );
};

export default KeyboardOverlay;
