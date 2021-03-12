import { AppProps } from 'next/app'
import '../styles/index.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width, minimum-scale=1' />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
