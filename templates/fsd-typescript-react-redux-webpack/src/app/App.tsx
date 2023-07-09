import { FC, Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';


const App: FC = () => {
  return (
    <Suspense>
      <ConfigProvider theme={{ token: { colorPrimary: '#1890FF' } }}>
        <Routes>
        </Routes>
        HELLO WORLD
      </ConfigProvider>
    </Suspense>
  );
};
export default App;
