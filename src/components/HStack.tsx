import React from 'react';
import { cn } from 'utils';

const HStack: React.FC<React.JSX.IntrinsicElements['div']> = (props) => {
  return <div {...props} className={cn([props.className, 'flex'])}></div>;
};

export default HStack;
