import React from 'react'
import NavBar from './NavBar'
import { useAuth } from '../lib/AuthContext'

const Header = () => {
    const auth = useAuth ()
 
    return (
         <div className='bg-gray-200 '>
                    <h1>
                        <img className='h-48 mx-auto py-1' 
                        src='logo.jpg' 
                        alt='AutismoMeu...' 
                        height='60'
                        />
                    </h1>
                <NavBar />
             
                  
          </div>
    )
}
export default Header

// <pre>{JSON.stringify(Auth)}</pre> posso colocar essa string para pegar novas variáveis no futuro. Colocar abaixo de <Navbar />
// posso pegar com ele nick_name picture e outras informações do usuário para uma tela de login melhor com CSS.