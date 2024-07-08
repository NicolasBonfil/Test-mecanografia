import { UserFavouriteTests } from "./UserFavouriteTests.jsx"
import { UserFavouriteUsers } from "./UserFavouriteUsers.jsx"

export const UserFavouritesContainer = ({profileUser}) => {
    return (
        <>
            <div className='tests'>
                <UserFavouriteTests profileUser={profileUser}/>
            </div>

            <div className='users'>
                <UserFavouriteUsers profileUser={profileUser}/>
            </div>
        </>
    )
}
