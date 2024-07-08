import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faKeyboard, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import Axios from "axios"
import { ProfileNavbar } from '../NAVBAR/ProfileNavbar.jsx'
import { useMenuContext } from '../../Context/MenuContext.jsx'

export const HeaderContainer = () => {
    const [user, setUser] = useState({})
	const navigate = useNavigate()
	useEffect(() => {
		Axios.get("https://test-mecanografia-1.onrender.com/api/users/logged-user")
		.then(res => setUser(res.data))
		.catch(error => {
			error.response.status === 401 && navigate("/login")
		})
	}, [])

    const logout = () => {
        Axios.post("https://test-mecanografia-1.onrender.com/api/sessions/logout")
        .then(res => {
            res.status == 200 && navigate("/login")
        })
    }

    const [showNav, setShowNav] = useState(false)

    const {handleMenuClick} = useMenuContext()

    return (
        <header>
            <div id='hamburger-menu-icon'>
                <FontAwesomeIcon icon={faBars} onClick={handleMenuClick}/>
            </div>
            
            <div id='logo-container'>
                <Link to="/">
                    <FontAwesomeIcon id="logo" icon={faKeyboard}/>
                    <p>keySpeed</p>
                </Link>
            </div>

            <div id='user-button' onMouseEnter={() => setShowNav(true)} onMouseLeave={() => setShowNav(false)}>
                <div id='username' onClick={() => navigate(`/user/${user._id}`)}>
                    <FontAwesomeIcon icon={faUser} />
                    <p>{user.username}</p>
                </div>
                <FontAwesomeIcon icon={faRightFromBracket} onClick={logout} className='logout-btn'/>
                <div className={`profile-navbar ${showNav ? "show-nav" : ""}`}>
                    <ProfileNavbar user={user} logout={logout}/>
                </div>
            </div>
        </header>
    )
}
