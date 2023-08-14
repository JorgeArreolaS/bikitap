import { NextUIProvider } from '@nextui-org/react';

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
