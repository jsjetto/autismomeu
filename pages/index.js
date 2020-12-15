import React from 'react'


const Index = () => {
    return (
        <div className='bg-grey-500'>

            <div className='bg-center mx-auto text-center py-2'>Home</div>

            <a href='/api/login' className=
                'py-4 px-4 rounded bg-pink-800 font-bold hover:shadown shadown-xl block w-1/4 text-center mx-auto text-white'>
                Começe por aqui
            </a>
            <div>
                <h1>
                    <img className='h-screen mx-auto py-1'
                        src='Kaio2.jpg'
                        alt='AutismoMeu...' />
                </h1>
            </div>
        </div>
    )
}

export default Index