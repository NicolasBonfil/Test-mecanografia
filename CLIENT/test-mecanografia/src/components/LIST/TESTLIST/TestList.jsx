import { TestItem } from './TestItem.jsx'

export const TestList = ({tests, favouriteTests, handleFavourite}) => {
    return (
        <>
            {
                tests.map(test => {
                    const words = test.text.split(" ")
                    const shortText = words.slice(0, 10).join(" ")
                    return(
                        <div className="test-item" key={test._id}>
                            <TestItem words={words} test={test} favouriteTests={favouriteTests} handleFavourite={handleFavourite} shortText={shortText}/>
                        </div>
                    )
                })
            }
        </>
    )
}
