import React, { useState } from 'react'
import { useMenuContext } from '../../Context/MenuContext.jsx'
import { Link } from 'react-router-dom'

export const HamburgerNavbar = () => {
    const { handleClickOutside, menuRef, setOpenMenu } = useMenuContext()

    return (
        <div id='hamburger-menu' ref={menuRef} onClick={handleClickOutside}>
            <div id='hamburger-navbar'>
                <div id="hamburger-nav-tab">
                    <ul>
                        <li className={location.pathname.includes("/create-test") ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setOpenMenu(false))}>
                            <Link to="/create-test">
                                <p>create</p>
                            </Link>
                        </li>
                        <li className={!["/test/random", "/test/random/words", "/test/random/time", "/users"].some(path => location.pathname.includes(path))? "nav-btn btn-active" : "nav-btn"} onClick={() => (setOpenMenu(false))}>
                            <Link to="/">
                                <p>tests</p>
                            </Link>
                        </li>
                        <li className={location.pathname.includes("/test/random") ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setOpenMenu(false))}>
                            <Link to="/test/random/words">
                                <p>random</p>
                            </Link>
                        </li>

                        <li className={location.pathname.includes("/test/random/words") ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setOpenMenu(false))}>
                            <Link to="/test/random/words">
                                <p>words</p>
                            </Link>
                        </li>
                        <li className={location.pathname.includes("/test/random/time") ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setOpenMenu(false))}>
                            <Link to="/test/random/time">
                                <p>time</p>
                            </Link>
                        </li>

                        <li className={location.pathname.includes("/users") ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setOpenMenu(false))}>
                            <Link to="/users">
                                <p>search user</p>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}
