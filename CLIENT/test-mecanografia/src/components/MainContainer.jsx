import { useEffect, useRef, useState } from 'react'
import { NavbarContainer } from './NAVBAR/NavbarContainer.jsx'
import { CreateTestContainer } from './CREATE/CreateTestContainer.jsx'
import { TestListContainer } from './LIST/TESTLIST/TestListContainer.jsx'
import { HeaderContainer } from './HEADER/HeaderContainer.jsx'
import { TestContainer } from './TEST/TestContainer.jsx'
import { UserListContainer } from './LIST/USERS/UserListContainer.jsx'
import { Loading } from "./Loading.jsx"
import { UserProfileContainer } from "./PROFILE/UserProfileContainer.jsx"
import Axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { HamburgerNavbar } from './NAVBAR/HamburgerNavbar.jsx'
import { useMenuContext } from '../Context/MenuContext.jsx'

export const MainContainer = () => {
    const [tab, setTab] = useState("tests")
    const [filter, setFilter] = useState("")
    const [testId, setTestId] = useState("")
    const [username, setUsername] = useState("")

    const inputRef = useRef(null)
    useEffect(() => {
        tab == "search" && inputRef.current.focus()
    }, [tab])

    const {id} = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [allTests, setAllTests] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const [loggedUserResponse, usersResponse, testsResponse] = await Promise.all([
                    Axios.get("https://test-mecanografia-1.onrender.com/api/users/logged-user"),
                    Axios.get("https://test-mecanografia-1.onrender.com/api/users"),
                    Axios.get("https://test-mecanografia-1.onrender.com/api/tests")
                ]);
                console.log(loggedUserResponse.data.favourite_tests);
                setUser(loggedUserResponse.data);
                setAllUsers(usersResponse.data);
                setAllTests(testsResponse.data);
            } catch (error) {
                error.response.status === 401 && navigate("/login")
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [tab, filter, id])

    const [words, setWords] = useState(10)
    const [time, setTime] = useState(15)

    const {openMenu} = useMenuContext()

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        {openMenu && 
                            <div id='overlay'>
                                <HamburgerNavbar setTime={setTime} setWords={setWords} tab={tab} setTab={setTab} filter={filter} setFilter={setFilter} inputRef={inputRef} testId={testId} setTestId={setTestId} setUsername={setUsername} />
                            </div>
                        }
                        <div style={{display:"flex", flexDirection: "column", flexGrow: 1}} className={openMenu? "blur" : ""}>
                            <HeaderContainer user={user} setTestId={setTestId} setFilter={setFilter} setTab={setTab}/>

                            {
                                id?
                                    // <UserProfileContainer id={id} user={user}/>
                                    hola
                                    :
                                    <>
                                        <div id='main-container'>
                                            {/* <NavbarContainer setTime={setTime} setWords={setWords} tab={tab} setTab={setTab} filter={filter} setFilter={setFilter} inputRef={inputRef} testId={testId} setTestId={setTestId} setUsername={setUsername} /> */}
                                            {/* {tab == "random" && (filter == "words" || !filter) && <TestContainer random={true} words={words} setWords={setWords}/>} */}
                                            {/* {tab == "random" && filter == "time" && <TestContainer random={true} time={time} setTime={setTime}/>} */}
                                            {/* {tab == "search" && <UserListContainer username={username} user={user} allUsers={allUsers} setUsername={setUsername}/>} */}
                                            {/* {filter == "create" && <CreateTestContainer setTab={setTab} setFilter={setFilter} />} */}
                                            {filter == "completed" && <TestListContainer id={"completed"} setTab={setTab} setTestId={setTestId} setFilter={setFilter} user={user} allTests={allTests}/>}
                                            {/* {tab == "tests" && !filter && <TestListContainer setTab={setTab} setTestId={setTestId} setFilter={setFilter} user={user} allTests={allTests}/>} */}
                                            {/* {testId && !tab && !filter && <TestContainer user={user} testId={testId} />} */}
                                        </div>
                                    </>
                            }
                        </div>
                    </>
            }
        </>
    )
}
