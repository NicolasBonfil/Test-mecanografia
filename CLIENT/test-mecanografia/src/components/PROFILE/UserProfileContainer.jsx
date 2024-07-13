import { useEffect, useState } from 'react'
import Axios from "axios"
import { UserProfileDetail } from './UserProfileDetail.jsx'
import { useParams } from 'react-router-dom'
import { Loading } from '../Loading.jsx'
import { HeaderContainer } from '../HEADER/HeaderContainer.jsx'

export const UserProfileContainer = () => {
    const [profileUser, setPorfileUser] = useState({
        texts: [],
        completed_tests: [],
        favourite_tests: [],
        favourite_users: []
    })

    const [loading, setLoading] = useState(true)

    const {uid} = useParams()

    useEffect(() => {
        Axios.get(`http://localhost:8080/api/users/${uid}`)
            .then(res => {
                return res.data
            })
            .then(user => {
                let user_texts = []
                user.texts.forEach(t => {
                    user_texts.push(t.test)
                })

                if (user.username != user.username) {
                    user_texts = user_texts.filter(text => text.state != "Private")
                }

                let favourite_tests = []
                let favourite_users = []

                user.favourite_tests.forEach(t => {
                    favourite_tests.push(t.test)
                })

                user.favourite_users.forEach(u => {
                    favourite_users.push(u.user)
                })

                setPorfileUser({
                    ...user,
                    texts: user_texts,
                    favourite_tests: favourite_tests,
                    favourite_users: favourite_users
                })
            })
            .finally(() => setLoading(false))
    }, [uid])

    return (
        <>
            {   
                loading?
                    <Loading/>
                :
                    <div id='user-profile-container'>
                        <div id='user-profile-detail'>
                            <UserProfileDetail profileUser={profileUser}/>
                        </div>
                    </div>
            }
        </>
    )
}
