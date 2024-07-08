import React, { useState } from 'react'
import { useMenuContext } from '../../Context/MenuContext.jsx'
import { Link } from 'react-router-dom'

export const HamburgerNavbar = () => {
    const { handleClickOutside, menuRef, setOpenMenu, tab, setTab, setFilter, filter } = useMenuContext()

    return (
        <div id='hamburger-menu' ref={menuRef} onClick={handleClickOutside}>
            <div id='hamburger-navbar'>
                <div id="hamburger-nav-tab">
                    <ul>
                        <li className={filter == "create" ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setTab("tests"), setFilter("create"), setOpenMenu(false))}>
                            <Link to="/create-test">
                                <p>create</p>
                            </Link>
                        </li>
                        <li className={tab == "tests"? "nav-btn btn-active" : "nav-btn"} onClick={() => (setTab("tests"), setFilter(""), setOpenMenu(false))}>
                            <Link to="/">
                                <p>tests</p>
                            </Link>
                        </li>
                        <li className={tab == "random" ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setTab("random"), setFilter("words"), setOpenMenu(false))}>
                            <Link to="/test/random/words">
                                <p>random</p>
                            </Link>
                        </li>

                        <li className={filter == "words" ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setTab("random"), setFilter("words"), setOpenMenu(false))}>
                            <Link to="/test/random/words">
                                <p>words</p>
                            </Link>
                        </li>
                        <li className={filter == "time" ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setTab("random"), setFilter("time"), setOpenMenu(false))}>
                            <Link to="/test/random/time">
                                <p>time</p>
                            </Link>
                        </li>

                        <li className={tab == "search" ? "nav-btn btn-active" : "nav-btn"} onClick={() => (setTab("search"), setFilter(""), setOpenMenu(false))}>
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
