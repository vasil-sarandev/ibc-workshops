import '../assets/globals.css'
import type { AppProps } from 'next/app'
import { Auth0Provider } from '../feature/auth'
import { SnackbarContextProvider } from '../components'
import { ConfirmProvider } from 'material-ui-confirm'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider>
      <SnackbarContextProvider>
        <ConfirmProvider>
          <Component {...pageProps} />
        </ConfirmProvider>
      </SnackbarContextProvider>
    </Auth0Provider>
  )
}

export default MyApp
