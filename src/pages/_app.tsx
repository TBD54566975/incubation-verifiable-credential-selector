import '../styles/global.css';

import { ConnectedRouter } from 'connected-next-router';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '@/client/app/store';
import { Main } from '@/templates/Main';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Main>
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </Main>
  </Provider>
);

export default MyApp;
