import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export const ProfileDetails = ({profileUser}) => {
    return (
        <>
            <div id='user-profile-info'>
                <FontAwesomeIcon icon={faCircleUser} />
                <div>
                    <p>{profileUser.username}</p>
                    <p>joined {profileUser.joined}</p>
                </div>
            </div>
            <div id='user-stats'>
                <div className='completed'>
                    <p className='title'>tests completed</p>
                    <p className='value'>{profileUser.completed_tests.length}</p>
                </div>
                <div className='created'>
                    <p className='title'>created tests</p>
                    <p className='value'>{profileUser.texts.length}</p>
                </div>
            </div>
        </>
    )
}
