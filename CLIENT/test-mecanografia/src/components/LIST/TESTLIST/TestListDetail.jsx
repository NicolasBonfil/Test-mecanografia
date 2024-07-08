import { TestList } from './TestList.jsx'

export const TestListDetail = ({tests, favouriteTests, handleFavourite}) => {
    return (
        <>
            <ul id="test-info">
                <li>Title</li>
                <li>Length</li>
                <li>Owner</li>
            </ul>

            <div id="tests-list">
                <TestList tests={tests} favouriteTests={favouriteTests} handleFavourite={handleFavourite}/>
            </div>
        </>
    )
}
