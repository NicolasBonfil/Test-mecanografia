import { UserList } from "./UserList.jsx"

export const UserListDetail = ({users, favouriteUsers, handleFavourite}) => {
    return (
        <>  
            <ul id="user-info">
                <li>Username</li>
                <li>Joined</li>
                <li>Last Connection</li>
            </ul>
            <div id='users-list'>
                <UserList users={users} favouriteUsers={favouriteUsers} handleFavourite={handleFavourite}/>
            </div>
        </>
    )
}
