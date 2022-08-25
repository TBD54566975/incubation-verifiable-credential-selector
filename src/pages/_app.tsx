import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Main } from '@/templates/Main';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Main>
    <Component {...pageProps} />
  </Main>
);

export default MyApp;
