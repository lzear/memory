import React, { useState } from 'react';

export enum CardTypes {
  Color = 'COLOR',
  Image = 'IMAGE',
  Dog = 'DOG',
}

type Config = {
  size: number;
  cardType: CardTypes;
  config: boolean;
};
const init = { size: 4, cardType: CardTypes.Image, config: true };

export const GameConfigContext = React.createContext<
  [Config, (prev: Config) => void]
>([init, () => null]);

export const GameConfigProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [contextState, setContextState] = useState(init);
  return (
    <GameConfigContext.Provider value={[contextState, setContextState]}>
      {children}
    </GameConfigContext.Provider>
  );
};
