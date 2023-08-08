import React from 'react';
import { cn } from 'utils';

const VStack: React.FC<React.JSX.IntrinsicElements['div']> = (props) => {
  return (
    <div {...props} className={cn(['flex flex-col', props.className])}></div>
  );
};

export default VStack;
