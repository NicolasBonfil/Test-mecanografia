import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export const TestItem = ({words, test, favouriteTests, handleFavourite, shortText}) => {
    return (
        <>
            <Link className="test-item-link" to={`/test/${test._id}`}>
                <div>
                    <p>{test.title}</p>
                    <p className='test-text'>{shortText} {words.length > 10 && " ..."}</p>
                </div>
                <div>
                    <p>{words.length} words</p>
                    <p>{test.text.length} characters</p>
                </div>
                <p>{test.owner.username}</p>
            </Link>
            {   
                favouriteTests && (
                    favouriteTests.some(id => id == test._id)?
                    (<FontAwesomeIcon icon={solidHeart} className='solid-heart-icon' onClick={() => handleFavourite("remove", test._id)}/>)
                    :
                    (<FontAwesomeIcon icon={regularHeart} className='regular-heart-icon' onClick={() => handleFavourite("add", test._id)}/>)
                )
            }

        </>
    )
}
