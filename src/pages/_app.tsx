import Layout from '@/components/Layout'
import { StateContext as State} from '@/hooks/State'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'


export default function App({ Component, pageProps }: AppProps) {
  return <State>
  <SessionProvider session={pageProps.session}>
  <Layout>
<Toaster />
  <Component {...pageProps} /> 
  </Layout>
  </SessionProvider>
  </State>
}
