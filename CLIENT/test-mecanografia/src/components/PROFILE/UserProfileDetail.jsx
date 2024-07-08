import { ProfileDetails } from "./ProfileDetails.jsx"
import { UserFavouritesContainer } from "./UserFavouritesContainer.jsx"
import { UserTextsListContainer } from "./UserTextsListContainer.jsx"

export const UserProfileDetail = ({profileUser}) => {
    return (
        <>
            <div id='profile-details'>
                <ProfileDetails profileUser={profileUser}/>
            </div>

            <div id='user-data'>
                <div id='user-texts-container'>
                    <UserTextsListContainer profileUser={profileUser}/>
                </div>
                <div id='user-favourites'>
                    <UserFavouritesContainer profileUser={profileUser}/>
                </div>
            </div>
        </>
    )
}
