import React from 'react';
import { cn } from 'utils';

const VStack: React.FC<React.JSX.IntrinsicElements['div'] & {
  center?: boolean
}> = ({ center, ...props }) => {
  return (
    <div {...props} className={cn(['flex flex-col', center && "justify-center items-center", props.className])}></div>
  );
};

export default VStack;
