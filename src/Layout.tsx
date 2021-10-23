import React, { useContext, useRef, useEffect, useState } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { GameConfigContext } from './GameConfiguration';
import ConfigForm from './ConfigForm';
import Game from './Game';

const Main = styled.main`
  max-width: 800px;
  margin: auto;
  padding: 10px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
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
    <Main ref={ref}>
      <div style={{ flex: '1 0 auto' }}>
        {!state.config && width ? <Game width={width} /> : <ConfigForm />}
      </div>
      <div style={{ margin: '20px 0', textAlign: 'right', flex: '0 0 auto' }}>
        <a href="https://github.com/lzear/spotipiano">
          <GithubOutlined />
        </a>
      </div>
    </Main>
  );
};

export default Layout;
