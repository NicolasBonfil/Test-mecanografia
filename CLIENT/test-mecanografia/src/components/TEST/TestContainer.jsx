import { useEffect, useRef, useState } from 'react'
import Axios from "axios"
import { TestDetail } from './TestDetail.jsx'
import { faker } from '@faker-js/faker';
import { useParams } from 'react-router-dom';
import { useRandomContext } from "../../Context/RandomContext.jsx"
import { Loading } from '../Loading.jsx';

export const TestContainer = () => {
    const { tid, cid } = useParams()

    const [loading, setLoading] = useState(false)

    const { time, setTime, words, setWords } = useRandomContext()

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const [isStarted, setIsStarted] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const [text, setText] = useState([])

    const [wordIndex, setWordIndex] = useState(0)
    const [userInput, setUserInput] = useState("")

    const [correctChars, setCorrectChars] = useState([])
    const [incorrectChars, setIncorrectChars] = useState([])
    const [extraChars, setExtraChars] = useState([])
    const [missedChars, setMissedChars] = useState([])

    const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0)
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0)

    const [correctWords, setCorrectWords] = useState([])
    const [incorrectWords, setIncorrectWords] = useState([])

    const [results, setResults] = useState({
        wpm: 0,
        accuracy: 0,
        time: {
            minutes: 0,
            seconds: 0
        }
    })

    const [test, setTest] = useState({
        title: "",
        text_length: 0,
        owner: "",
        date: ""
    })

    const [next, setNext] = useState(false)
    const restart = () => {
        cid == "time" ? time > 59 ? (setMinutes(time / 60), setSeconds(0)) : (setSeconds(time), setMinutes(0)) : (setMinutes(0), setSeconds(0))


        setIsStarted(false)
        setIsFinished(false)
        setWordIndex(0)
        setUserInput("")
        setCorrectChars([])
        setIncorrectChars([])
        setExtraChars([])
        setMissedChars([])
        setIncorrectKeystrokes(0)
        setCorrectKeystrokes(0)
        setCorrectWords([])
        setIncorrectWords([])
        setResults({
            wpm: 0,
            accuracy: 0,
            time: 0
        })
        inputRef.current.focus()
    }

    useEffect(() => {
        setIsStarted(false)
        setIsFinished(false)
        setWordIndex(0)
        setUserInput("")
        setCorrectChars([])
        setIncorrectChars([])
        setExtraChars([])
        setMissedChars([])
        setIncorrectKeystrokes(0)
        setCorrectKeystrokes(0)
        setCorrectWords([])
        setIncorrectWords([])
        setResults({
            wpm: 0,
            accuracy: 0,
            time: 0
        })

    }, [cid, next, words, time])

    useEffect(() => {
        if (cid == "time") {
            while (isStarted) {
                const intervalo = setInterval(() => {
                    setSeconds(seconds => seconds - 1);

                    if (seconds === 0) {
                        setSeconds(59);
                        setMinutes(minutes => minutes - 1);
                    }

                    if (seconds === 0 && minutes === 0) {
                        setIsStarted(false)
                        setIsFinished(true)
                        time > 59 ? (setMinutes(time / 60), setSeconds(0)) : (setSeconds(time), setMinutes(0))
                    }
                }, 1000);

                return () => clearInterval(intervalo);
            }
        } else {

            while (isStarted) {
                const intervalo = setInterval(() => {
                    setSeconds(seconds => seconds + 1);

                    if (seconds === 59) {
                        setSeconds(0);
                        setMinutes(minutes => minutes + 1);
                    }
                }, 1000);

                return () => clearInterval(intervalo);
            }
        }
    }, [seconds, minutes, isStarted, time]);

    useEffect(() => {
        if (tid) {
            setLoading(true)
            Axios.get(`http://localhost:8080/api/tests/${tid}`)
                .then(res => {
                    setTest({
                        ...res.data,
                        text_length: res.data.text.length
                    })
                    setText(res.data.text.split(" "))
                })
                .finally(() => setLoading(false))
        } else if (cid == "words") {
            const text = []
            for (let i = 0; i < words; i++) {
                let word;
                do {
                    word = faker.word.noun();;
                } while (text.includes(word));

                text.push(word)
            }
            setText(text)
            setMinutes(0)
            setSeconds(0)
        } else if (cid == "time") {
            time > 59 ? (setMinutes(time / 60), setSeconds(0)) : (setSeconds(time), setMinutes(0))
            const text = []
            for (let i = 0; i < (time * 1.5); i++) {
                let word;
                do {
                    word = faker.word.noun();
                } while (text.includes(word));

                text.push(word)
            }
            setText(text)
        }
    }, [tid, cid, next, time, words])

    const className = (word_index, charIndex) => {
        const isCorrect = correctChars.find(k => k.char_index == charIndex && k.wordIndex == word_index)
        const isIncorrect = incorrectChars.find(k => k.char_index == charIndex && k.wordIndex == word_index)
        const isMissed = missedChars.find(k => k.char_index == charIndex && k.wordIndex == word_index)

        if (isCorrect) {
            if (userInput.length == text[word_index].length && charIndex == userInput.length - 1 && word_index == wordIndex && !isFinished) return "correct active-end"
            return "correct"
        } else if (isIncorrect) {
            if (userInput.length == text[word_index].length && charIndex == userInput.length - 1 && word_index == wordIndex && !isFinished) return "incorrect active-end"
            return "incorrect"
        } else if (word_index == wordIndex && charIndex == userInput.length && !isFinished) {
            return "active"
        } else if (isMissed) {
            return "missed"
        }
    }
    const handleOnChange = (e) => {
        !isStarted && setIsStarted(true)
        let user_input = e.target.value
        user_input.length >= 10 ? setUserInput(user_input.slice(0, text[wordIndex].length + 10)) : setUserInput(user_input)

        const char_index = user_input.length - 1
        const char = user_input[char_index]
        if (user_input == " ") return setUserInput("")
        user_input[char_index] === " " ? changeWord() : user_input.length < userInput.length ? removeCharacter(user_input.length) : compareCharacters(char, char_index)
        wordIndex + 1 == text.length && (user_input.length == text[wordIndex].length || user_input[char_index] === " ") && (compareWords(user_input), setIsStarted(false), setIsFinished(true))
    }
    const compareCharacters = (char, char_index) => {
        char_index >= text[wordIndex].length && handleExtraChars(char, char_index)
        text[wordIndex][char_index] === char ? (setCorrectChars([...correctChars, { char, wordIndex, char_index }]), setCorrectKeystrokes(correctKeystrokes + 1)) : (setIncorrectChars([...incorrectChars, { char, wordIndex, char_index }]), setIncorrectKeystrokes(incorrectKeystrokes + 1))
    }

    const handleExtraChars = (char) => {
        let extra_chars = extraChars
        const word_extra_chars = extra_chars.find(word => word.wordIndex == wordIndex)

        if (word_extra_chars && word_extra_chars.chars.length > 9) return

        if (word_extra_chars) {
            extra_chars = extra_chars.filter(word => word.wordIndex != wordIndex)
            let chars = word_extra_chars.chars + char
            extra_chars.push({ chars, wordIndex })
        } else {
            extra_chars.push({ chars: char, wordIndex })
        }

        setExtraChars(extra_chars)
    }

    const handleMissedChars = () => {
        const missed_chars = missedChars
        const word = text[wordIndex]
        for (let char_index = userInput.length; char_index < word.length; char_index++) {
            const char = word[char_index]
            missed_chars.push({ char, wordIndex, char_index })
        }
        setMissedChars(missed_chars)
    }

    const removeCharacter = (char_index) => {
        let correct_chars = correctChars
        correct_chars = correct_chars.filter(char => (char.wordIndex !== wordIndex) || (char.char_index !== char_index))
        setCorrectChars(correct_chars)

        let incorrect_chars = incorrectChars
        incorrect_chars = incorrect_chars.filter(char => char.wordIndex !== wordIndex || char.char_index !== char_index)
        setIncorrectChars(incorrect_chars)

        let extra_chars = extraChars
        let word_extra_chars = extra_chars.find(char => char.wordIndex == wordIndex)
        if (word_extra_chars) word_extra_chars = word_extra_chars.chars.slice(0, -1)

        extra_chars = extra_chars.filter(char => char.wordIndex !== wordIndex)
        word_extra_chars && extra_chars.push({ chars: word_extra_chars, wordIndex })
        setExtraChars(extra_chars)
    }

    const changeWord = () => {
        compareWords(userInput)
        userInput.length < text[wordIndex].length && handleMissedChars()
        wordIndex + 1 === text.length && setIsStarted(false) && setIsFinished(true)
        setUserInput("")
        setWordIndex(wordIndex + 1)
    }

    const compareWords = (user_input) => {
        const word = text[wordIndex]
        user_input == word ? (setCorrectWords([...correctWords, { wordIndex, word }]), wordIndex !== text.length - 1 && setCorrectKeystrokes(correctKeystrokes + 1)) : (setIncorrectWords([...incorrectWords, { wordIndex, word }]), wordIndex !== text.length - 1 && setIncorrectKeystrokes(incorrectKeystrokes + 1))
    }

    useEffect(() => {
        !isStarted && endTest()
    }, [isStarted])

    useEffect(() => {
        if ((results.time.minutes > 0 || results.time.seconds > 0) && tid) {
            const completed_test = test
            completed_test.results = results
            Axios.get("http://localhost:8080/api/users/logged-user")
            .then(res => {
                return res.data
            })
            .then(user => {
                user.username != test.owner.username && Axios.put("http://localhost:8080/api/users/completed-test", completed_test)
            })
        }
    }, [results])

    const endTest = () => {
        const accuracy = (correctKeystrokes * 100) / (correctKeystrokes + incorrectKeystrokes)

        let correct_chars = 0;

        correctWords.forEach(w => {
            w.wordIndex != text.length - 1 && correct_chars++;
            correct_chars += w.word.length
        })

        const minutes_totales = cid != time ? minutes + (seconds / 60) : time / 60
        const wpm = (correct_chars / 5) / minutes_totales

        setResults({
            accuracy: accuracy,
            wpm: wpm,
            time: {
                minutes: minutes,
                seconds: seconds
            }
        })
    }

    const inputRef = useRef(null)

    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div id='test-container'>
                            <div id='test-detail'>
                                {
                                    cid &&
                                    <div className='test-filter'>
                                        {
                                            cid == "words" && !isFinished &&
                                            <>
                                                <p>Words</p>
                                                <select value={words} onChange={(e) => setWords(e.target.value)}>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="75">75</option>
                                                </select>
                                            </>
                                        }
                                        {
                                            cid == "time" && !isFinished &&
                                            <>
                                                <p>TIme</p>
                                                <select value={time} onChange={(e) => setTime(e.target.value)}>
                                                    <option value="15">15''</option>
                                                    <option value="30">30''</option>
                                                    <option value="60">60''</option>
                                                    <option value="120">120''</option>
                                                </select>
                                            </>
                                        }
                                    </div>
                                }
                                <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} onClick={() => {
                                    inputRef.current && inputRef.current.focus()
                                }}>
                                    <TestDetail setNext={setNext} restart={restart} words={words} tid={tid} cid={cid} test={test} text={text} handleOnChange={handleOnChange} userInput={userInput} inputRef={inputRef} extraChars={extraChars} wordIndex={wordIndex} className={className} results={results} isFinished={isFinished} minutes={minutes} seconds={seconds}/>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}
