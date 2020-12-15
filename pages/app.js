import React, { useEffect } from 'react'
import auth0 from '../lib/auth0'
import router from "next/router"
import { checkExists, findChecksNearbyCheckin } from '../model/markers'

const App = props => {
    useEffect(() => {
        if (!props.isAuth) {
            router.push('/')

        } else if (props.forceCreate) {
            router.push('/create-status')
        }
    })
    if (!props.isAuth || props.forceCreate) {
        return null
    }

    return (
        <div>
            <h1>Amigos próximos a você:</h1>
            <table>
                {props.checkins.map(checkin => {
                    return (
                        <tr key={checkin.id}>
                            <td>{checkin.id === props.user.sub && 'Seu dia começou: '}</td>
                            <td>{checkin.status}</td>
                            <td>{JSON.stringify(checkin.coords)}</td>
                            <td>{checkin.distance}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default App

// Até 1:00 de videos tudo ok.. depois só tomei porrada e mais  porrada... vai se fuder pqp 
// TNC consegui porra.

export async function getServerSideProps({ req, res }) {
    let user = {}
    let isAuth = false
    let forceCreate = false
    let checkins = []

    const session = await auth0.getSession(req)
    if (session) {
        isAuth = true
        user = session.user

        const todaysData = await checkExists(session.user.sub)

        if (!todaysData) {
            forceCreate = true
        } else {
            checkins = await findChecksNearbyCheckin(todaysData)
        }

    }
    return {
        props: {
            isAuth,
            user,
            forceCreate,
            checkins
        }
    }

}
