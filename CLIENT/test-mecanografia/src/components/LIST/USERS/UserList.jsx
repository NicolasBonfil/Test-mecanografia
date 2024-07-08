import { UserItem } from "./UserItem.jsx"

export const UserList = ({users, favouriteUsers, handleFavourite}) => {
    return (
        <>
            {
                users &&
                users.map(user => {
                    return(
                        <div className='user-item' key={user.username}>
                            <UserItem user={user} favouriteUsers={favouriteUsers} handleFavourite={handleFavourite}/>
                        </div>
                    )
                })
            }
        </>
    )
}
