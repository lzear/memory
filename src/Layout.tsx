import React, { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameConfigContext } from './GameConfiguration';
import ConfigForm from './ConfigForm';
import Game from './Game';

const L = styled.main`
  max-width: 800px;
  margin: auto;
  padding: 10px;
`;

const Layout: React.FC = () => {
  const [state] = useContext(GameConfigContext);
  const [width, setWidth] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = ref && ref.current ? ref.current.offsetWidth : 0;
    if (w) setWidth(w);
  }, []);
  return (
    <L ref={ref}>
      {!state.config && width ? <Game width={width} /> : <ConfigForm />}
    </L>
  );
};

export default Layout;
