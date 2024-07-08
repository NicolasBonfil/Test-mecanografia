import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'

export const UserItem = ({user, favouriteUsers, handleFavourite}) => {
    return (
        <>
            <Link to={`/user/${user._id}`} key={user.username} className="user-item-link"> 
                <p>{user.username}</p>
                <p>{user.joined}</p>
                <p>{user.last_connection || user.joined}</p>
            </Link>
            {   
                favouriteUsers && (
                    (favouriteUsers.some(id => id == user._id))?
                    (<FontAwesomeIcon icon={solidHeart} className='solid-heart-icon' onClick={() => handleFavourite("remove", user._id)}/>)
                    :
                    (<FontAwesomeIcon icon={regularHeart} className='regular-heart-icon' onClick={() => handleFavourite("add", user._id)}/>)
                )
            }
        </>
    )
}
