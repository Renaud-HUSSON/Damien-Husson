import { AppProps } from 'next/app'
import '../styles/index.scss'
import Head from 'next/head'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
