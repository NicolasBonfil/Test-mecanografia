import { Link } from 'react-router-dom'
export const TestInfo = ({test, text}) => {
    return (
        <>
            <div id='test-data'>
                <h1>{test.title}</h1>
                <p>Creted {test.date}, by <Link to={`/user/${test.owner._id}`}>{test.owner.username}</Link></p>
            </div>
            <div id='text-data'>
                <p><b>{text.length}</b> Words</p>
                <p><b>{test.text_length}</b> Characters</p>
            </div>
        </>
    )
}
