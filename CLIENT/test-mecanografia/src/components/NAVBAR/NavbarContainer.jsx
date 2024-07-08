import { faA, faCircleCheck, faCirclePlus, faClock, faKeyboard, faMagnifyingGlass, faShuffle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useRandomContext } from "../../Context/RandomContext.jsx"
import { useMenuContext } from "../../Context/MenuContext.jsx"

export const NavbarContainer = () => {
    const {setWords, setTime, words, time} = useRandomContext()
    const {setUsername, setTab, tab, setFilter, filter} = useMenuContext()
    const inputRef = useRef(null)

    const handleOnChange = (e) => {
        setUsername(e.target.value)
    }
    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [tab])

    return (
        <div id='navbar'>
            <div id="nav-tab">
                {
                    tab != "random" &&
                    <ul>
                        <li className={filter == "create"? "nav-active": null} onClick={() => (setFilter("create"))}>
                            <Link to="/create-test">
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <p>create</p>
                            </Link>
                        </li>
                    </ul>
                }
                <ul>
                    <li className={tab == "tests"? "nav-active":null} onClick={() => (setTab("tests"), setFilter(""))}>
                        <Link to="/">
                            <FontAwesomeIcon icon={faKeyboard} />
                            <p>tests</p>
                        </Link>
                    </li>
                    <li className={tab == "random"? "nav-active":null} onClick={() => (setTab("random"), setFilter("words"))}>
                        <Link to="/test/random/words">
                            <FontAwesomeIcon icon={faShuffle} />
                            <p>random</p>
                        </Link>
                    </li>
                </ul>
                {
                    tab == "random" &&
                    <ul>
                        <li className={filter == "words"? "nav-active":null} onClick={() => (setFilter("words"))}>
                            <Link to="/test/random/words">
                                <FontAwesomeIcon icon={faA} />
                                <p>words</p>
                            </Link>
                        </li>
                        <li className={filter == "time"? "nav-active":null} onClick={() => (setFilter("time"))}>
                            <Link to="/test/random/time">
                                <FontAwesomeIcon icon={faClock} />
                                <p>time</p>
                            </Link>
                        </li>
                    </ul>
                }
                {
                    (tab == "random" && filter == "words")?
                    <ul>
                        <li className={words == 10? "nav-active" : ""} onClick={(() => setWords(10))}>10</li>
                        <li className={words == 25? "nav-active" : ""} onClick={(() => setWords(25))}>25</li>
                        <li className={words == 50? "nav-active" : ""} onClick={(() => setWords(50))}>50</li>
                        <li className={words == 75? "nav-active" : ""} onClick={(() => setWords(75))}>75</li>
                    </ul>
                    :
                    null
                }
                {
                    (tab == "random" && filter == "time")?
                    <ul>
                        <li className={time == 15? "nav-active" : ""} onClick={() => setTime(15)}>15</li>
                        <li className={time == 30? "nav-active" : ""} onClick={() => setTime(30)}>30</li>
                        <li className={time == 60? "nav-active" : ""} onClick={() => setTime(60)}>60</li>
                        <li className={time == 120? "nav-active" : ""} onClick={() => setTime(120)}>120</li>
                    </ul>
                    :
                    null
                }
                <ul>
                    <li className={tab == "search"? "nav-active":null} onClick={() => (setTab("search"), setFilter(""))}>
                        <Link to="/users">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <p>search user</p>
                        </Link>
                    </li>
                </ul>
                {
                    tab == "search"?
                    <input id="search" type="text" placeholder="username..." autoComplete="off" ref={inputRef} onChange={handleOnChange}/>
                    :
                    null
                }
            </div>
        </div>
    )
}
