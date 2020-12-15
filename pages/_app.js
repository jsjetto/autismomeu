import React from 'react'
import '../styles/styles.css'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'
import { AuthProvider } from '../lib/AuthContext'


const App = ({ Component, pageProps }) => {
    return (
      <AuthProvider>
            <div>
              <Header />
                <div className='min-h-screen container mx-auto'>
                <Component {...pageProps} />
              </div>
              <Footer />
            </div>
      </AuthProvider>
    )
}

export default App