import { UserListDetail } from "../LIST/USERS/UserListDetail.jsx"
export const UserFavouriteUsers = ({profileUser}) => {
    return (
        <>
            <h1>Favourite users</h1>
            <div id="user-favourite-users-detail">
                {
                    profileUser.favourite_users.length > 0 ?
                        <UserListDetail users={profileUser.favourite_users}/>
                        : <h2>El usuario aún no tiene usuarios favoritos</h2>
                }
            </div>
        </>
    )
}
