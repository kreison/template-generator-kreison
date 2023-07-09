import ReactDom from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from 'app/App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDom.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <StoreProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StoreProvider>,
);
