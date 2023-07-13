import { createContext } from "react";

export type TContextType = {
  isDesktop: boolean;
  changeIsDesktop: (isDesktop: boolean) => void;
};

const initialContext: TContextType = {
  isDesktop: false,
  changeIsDesktop: (): void => {
    throw new Error("setContext function must be overridden");
  },
};

export const DeviceContext = createContext<TContextType>(initialContext);