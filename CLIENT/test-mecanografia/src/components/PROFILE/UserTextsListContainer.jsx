import { TestListDetail } from "../LIST/TESTLIST/TestListDetail.jsx"
export const UserTextsListContainer = ({ profileUser }) => {
    return (
        <>
            <h1>Texts</h1>
            <div id="user-texts-detail">

                {
                    profileUser.texts.length > 0 ?
                        <TestListDetail tests={profileUser.texts}/>
                        : <h2>El usuario aún no tiene textos</h2>
                }
            </div>
        </>
    )
}
