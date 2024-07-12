import { faA, faCircleCheck, faCirclePlus, faClock, faKeyboard, faMagnifyingGlass, faShuffle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useRandomContext } from "../../Context/RandomContext.jsx"
import { useMenuContext } from "../../Context/MenuContext.jsx"

export const NavbarContainer = () => {
    const {setWords, setTime, words, time} = useRandomContext()
    const {setUsername} = useMenuContext()
    const inputRef = useRef(null)

    const handleOnChange = (e) => {
        setUsername(e.target.value)
    }
    
    const location = useLocation()
    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [location.pathname])

    return (
        <div id='navbar'>
            <div id="nav-tab">
                {
                    !location.pathname.includes("/test/random") &&
                    <ul>
                        <li className={location.pathname.includes("/create-test")? "nav-active": null}>
                            <Link to="/create-test">
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <p>create</p>
                            </Link>
                        </li>
                    </ul>
                }
                <ul>
                    <li className={!["/test/random", "/test/random/words", "/test/random/time", "/users"].some(path => location.pathname.includes(path))? "nav-active":null}>
                        <Link to="/">
                            <FontAwesomeIcon icon={faKeyboard} />
                            <p>tests</p>
                        </Link>
                    </li>
                    <li className={location.pathname.includes("/test/random")? "nav-active":null}>
                        <Link to="/test/random/words">
                            <FontAwesomeIcon icon={faShuffle} />
                            <p>random</p>
                        </Link>
                    </li>
                </ul>
                {
                    location.pathname.includes("/test/random") &&
                    <ul>
                        <li className={location.pathname.includes("/test/random/words")? "nav-active":null}>
                            <Link to="/test/random/words">
                                <FontAwesomeIcon icon={faA} />
                                <p>words</p>
                            </Link>
                        </li>
                        <li className={location.pathname.includes("/test/random/time")? "nav-active":null}>
                            <Link to="/test/random/time">
                                <FontAwesomeIcon icon={faClock} />
                                <p>time</p>
                            </Link>
                        </li>
                    </ul>
                }
                {
                    (location.pathname.includes("/test/random/words"))?
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
                    (location.pathname.includes("/test/random/time"))?
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
                    <li className={location.pathname.includes("/users")? "nav-active":null}>
                        <Link to="/users">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <p>search user</p>
                        </Link>
                    </li>
                </ul>
                {
                    location.pathname.includes("/users")?
                    <input id="search" type="text" placeholder="username..." autoComplete="off" ref={inputRef} onChange={handleOnChange}/>
                    :
                    null
                }
            </div>
        </div>
    )
}
