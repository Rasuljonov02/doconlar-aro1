import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Containers } from 'modules/auth';
import Routes from 'routes';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import 'assets/styles/tailwind.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <Containers.Auth>
        <Routes />
      </Containers.Auth>
    </QueryParamProvider>
  </BrowserRouter>
);

/**
 *  ------HOMEWORKS------
 * ✅ Custom useMemo -> with React.useRef and React.useEffect
 * ✅ Seller.Delete
 * ✅ Purchase.List && Purchase.Create
 * 🌀 Custom useState -> with React.useReducer
 *
 * ------------
 * Jonatma.Online
 * ✅ Shop.Info()
 * ✅ Seller.Add && Seller.Delete
 *
 * 
 */
