import '@/styles/globals.css'
import store from '@/store/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
        <Provider store={store}>
            <ThemeProvider attribute="class">
                <Navbar/>
                <Component {...pageProps} />
                <Footer/>
            </ThemeProvider>
        </Provider>
    </SessionProvider>
  )
}
