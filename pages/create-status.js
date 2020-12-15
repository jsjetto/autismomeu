import react, { useState } from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'
import { useAuth } from '../lib/AuthContext'
import router from "next/router"

const CreateStatus = () => {
    const auth = useAuth()
    const [dados, setDados] = useState({
        status: 'Calmo',
        coords: {
            lat: null,
            long: null
        }
    })
    if (auth.isAuthReady && !auth.isAuth) {
        router.push('/')
    }
    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setDados(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }

                    }
                })
            })
        }
    }
    const onStatusChange = evt => {
        const value = evt.target.value
        setDados(old => {
            return {
                ...old,
                status: value
            }
        })
        //console.log(evt.target)
    }
    const save = async () => {
        await axios.post('/api/save-status', dados)
    }
    return (
        <div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <h1> Status Diário </h1>
            </div>
            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <label className='block'>
                    <input
                        type='radio'
                        name='status'
                        value='Calmo'
                        onClick={onStatusChange}
                    />{''}
            Acordou calmo e normal.
        </label>
            </div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <label className='block'>
                    <input
                        type='radio'
                        name='status'
                        value='Calmo/Feliz'
                        onClick={onStatusChange}
                    />{''}
            Acordou calmo e muito feliz, palhacito.
        </label>
            </div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <label className='block'>
                    <input
                        type='radio'
                        name='status'
                        value='Agito'
                        onClick={onStatusChange}
                    />{''}
            Acordou agitado, porém esta bem.
        </label>
            </div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <label className='block'>
                    <input
                        type='radio'
                        name='status'
                        value='Calmo/Irritado'
                        onClick={onStatusChange}
                    />{''}
            Acordou irritado e não quer conversa.
        </label>
            </div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <label className='block'>
                    <input
                        type='radio'
                        name='status'
                        value='Triste'
                        onClick={onStatusChange}
                    />{''}
             Acordou triste e sentimental, chorando por tudo.
        </label>
            </div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <label className='block'>
                    <input
                        type='radio'
                        name='status'
                        value='Pirracento'
                        onClick={onStatusChange}
                    />{''}
             Acordou pirracento e brigão, hoje é o dia.
            </label>
            </div>

            <div className='hover:underline text-teal-900 font-bold hover:shadow-xl shadown-xl rounded px-4'>
                <h1>Sua posição atual: {JSON.stringify(dados)}</h1>
                <button className='rounded px-4 bg-teal-800 font-bold hover:shadown shadown-xl text-justify text-white' onClick={getMyLocation}> Pergar minha localização </button>
                <a></a>
                <button className='rounded px-4 bg-teal-800 font-bold hover:shadown shadown-xl text-justify text-white' onClick={save}> Salvar meu status </button>
            </div>
        </div>

    )
}
export default CreateStatus

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)

    if (session) {
        return {
            props: {
                isAuth: true,
                user: session.user
                //forceCreate
            }
        }
    }
    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}