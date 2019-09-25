import React from 'react';
import 'antd/dist/antd.css';
import { GameConfigProvider } from './GameConfiguration';
import Layout from './Layout';

const App: React.FC = () => (
  <GameConfigProvider>
    <Layout />
  </GameConfigProvider>
);

export default App;
