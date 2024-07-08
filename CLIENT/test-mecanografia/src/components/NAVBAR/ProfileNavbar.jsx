import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export const ProfileNavbar = ({user, logout}) => {
    return (
        <>
            <ul id='profile-nav-tab'>
                <li>
                    <Link to={`/user/${user._id}`}>
                        Profile
                    </Link>
                </li>
                <li onClick={() => logout()}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> 
                    <p>Logout</p>
                </li>
            </ul>
        </>
    )
}
