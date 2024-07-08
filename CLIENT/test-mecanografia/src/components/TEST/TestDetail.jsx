import { TextContainer } from './TextContainer.jsx'
import { TestResults } from './TestResults.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { TestInfo } from './TestInfo.jsx'
export const TestDetail = ({setNext, restart, words, tid, test, text, handleOnChange, userInput, inputRef, extraChars, wordIndex, className, results, isFinished, minutes, seconds}) => {
    return (
        <>
            {
                tid &&
                <div className='info'>
                    <TestInfo test={test} text={text} />
                </div>
            }


            {
                !isFinished && words &&
                <div id='time-and-words'>
                    <p id='word-counter'>{wordIndex}/{words}</p>
                    <div id='timer'>
                        <p>{minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}</p>
                    </div>
                </div>
            }

            {
                !isFinished && !words &&
                <div id='timer'>
                    <p>{minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}</p>
                </div>
            }


            <div id="text-container">
                <TextContainer handleOnChange={handleOnChange} userInput={userInput} inputRef={inputRef} text={text} extraChars={extraChars} wordIndex={wordIndex} className={className} />
            </div>

            {
                isFinished &&
                <TestResults results={results} />
            }

            <div id='test-btns'>
                <FontAwesomeIcon icon={faArrowsRotate} onClick={restart} id='restart-btn'/>
                {!tid && <FontAwesomeIcon icon={faAngleRight} onClick={() => setNext(prev => !prev)} id='next-btn'/>}
            </div>
        </>
    )
}
