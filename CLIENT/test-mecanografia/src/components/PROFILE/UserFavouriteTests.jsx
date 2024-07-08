import { TestListDetail } from "../LIST/TESTLIST/TestListDetail.jsx"
export const UserFavouriteTests = ({ profileUser }) => {
    return (
        <>
            <h1>Favourite tests</h1>
            <div id="user-favourite-tests-detail">
                {
                    profileUser.favourite_tests.length > 0 ?
                        <TestListDetail tests={profileUser.favourite_tests} />

                        : <h2>El usuario aún no tiene textos favoritos</h2>
                }
            </div>
        </>
    )
}
