export const TextContainer = ({handleOnChange, userInput, inputRef, text, extraChars, wordIndex, className}) => {
    return (
        <>
            <input id="user-input" type="text" onChange={handleOnChange} value={userInput} autoComplete='off' ref={inputRef} />

            {
                text.map((word, word_index) => {
                    const chars = []
                    for (let char of word) {
                        chars.push(char)
                    }

                    return (
                        <div key={word_index} className='word'>
                            {
                                chars.map((char, char_index) => {
                                    return (
                                        <span key={char_index} className={className(word_index, char_index)}>{char}</span>
                                    )
                                })
                            }
                            {
                                extraChars.find(word => word.wordIndex === word_index) ?
                                    <div className={word_index === wordIndex ? 'active-end' : null}>
                                        {
                                            extraChars.map((word, key) => {
                                                let word_extra_chars
                                                word.wordIndex == word_index ? word_extra_chars = word.chars : null

                                                return (
                                                    word_extra_chars && <p key={key} className='incorrect'>{word_extra_chars}</p>
                                                )
                                            })
                                        }

                                    </div>
                                    :
                                    null
                            }
                        </div>
                    )
                })
            }
        </>
    )
}
