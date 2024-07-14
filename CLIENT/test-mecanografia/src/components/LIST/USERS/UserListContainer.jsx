import { useEffect, useState } from 'react'
import Axios from "axios"
import { UserListDetail } from './UserListDetail.jsx'
import { useMenuContext } from '../../../Context/MenuContext.jsx'
import { Loading } from '../../Loading.jsx'

export const UserListContainer = () => {
    const [users, setUsers] = useState([])
    const [favouriteUsers, setFavouriteUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const {username, setUsername} = useMenuContext()

    useEffect(() => {
        Axios.get("https://test-mecanografia-1.onrender.com/api/users")
            .then(res => {
                return res.data
            })
            .then(allUsers => {
                Axios.get("https://test-mecanografia-1.onrender.com/api/users/logged-user")
                    .then(res => {
                        const user = res.data

                        let favourite_users = []
                        user.favourite_users.forEach(u => {
                            favourite_users.push(u.user._id)
                        })
                        setFavouriteUsers(favourite_users)

                        allUsers = allUsers.filter(u => u.username != user.username)
                        setUsers(allUsers);

                        if (username) {
                            allUsers = allUsers.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))
                            setUsers(allUsers)
                        }
                    })
                    .finally(() => setLoading(false))
            })
    }, [username])


    const handleFavourite = (action, id) => {
        let favourite_users = [...favouriteUsers]
        action == "remove" ? favourite_users = favourite_users.filter(t => t != id) : favourite_users.push(id)

        setFavouriteUsers(favourite_users)

        action == "add" ? Axios.put("https://test-mecanografia-1.onrender.com/api/users/add-favourite/users", { id }) : Axios.put("https://test-mecanografia-1.onrender.com/api/users/remove-favourite/users", { id })
    }

    return (
        <>
        <div id='users-list-container'>
            <div className='username-filter'>
                <p>Search:</p>
                <input type="text" placeholder='username...' onChange={(e) => setUsername(e.target.value)} />
            </div>
            {
                loading?
                    <Loading/>
                :
                    <div id='users-list-detail'>
                        <UserListDetail users={users} favouriteUsers={favouriteUsers} handleFavourite={handleFavourite} />
                    </div>
            }
        </div>
        </>
    )
}
