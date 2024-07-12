import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { LoginContainer } from "./components/SESSION/LoginContainer.jsx"
import { SignupContainer } from "./components/SESSION/SignupContainer.jsx"
import { useMenuContext } from "./Context/MenuContext.jsx"
import { NavbarContainer } from "./components/NAVBAR/NavbarContainer.jsx"
import { TestListContainer } from "./components/LIST/TESTLIST/TestListContainer.jsx"
import { TestContainer } from "./components/TEST/TestContainer.jsx"
import { UserProfileContainer } from "./components/PROFILE/UserProfileContainer.jsx"
import { UserListContainer } from "./components/LIST/USERS/UserListContainer.jsx"
import { CreateTestContainer } from "./components/CREATE/CreateTestContainer.jsx"
import { HeaderContainer } from "./components/HEADER/HeaderContainer.jsx"
import { HamburgerNavbar } from "./components/NAVBAR/HamburgerNavbar.jsx"
import { useEffect, useState } from 'react'
import Axios from 'axios'
export const AppDetail = () => {
    const { openMenu } = useMenuContext()
    const location = useLocation();
    const showHeader = !['/login', '/signup'].includes(location.pathname)
    const showNavbar = !['/login', '/signup'].includes(location.pathname) && !location.pathname.includes('/user/')
    
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
            Axios.get("https://test-mecanografia-1.onrender.com/api/users/logged-user")
                .then(res => {
                    setUser(res.data)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        navigate("/login");
                    }
                })
                .finally(() => setLoading(false))
        }else{
            Axios.get("http://localhost:8080/api/users/logged-user")
            .then(res => {
                if(res.status === 200){
                    setUser(res.data)
                    setLoading(false) 
                    navigate("/")
                }
            })
            .catch((error) => error.response.status === 401 && setLoading(true))
        }
    }, [location.pathname]);


    return (
        <>
            {
                openMenu &&
                <div id="overlay">
                    <HamburgerNavbar />
                </div>
            }
            <div id="app-detail" className={openMenu ? "blur" : ""}>
                {showHeader && !loading && <HeaderContainer user={user}/>}
                {showNavbar && !loading && <NavbarContainer />}
                <Routes>
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path='/login' element={<LoginContainer />} />
                    <Route path='/signup' element={<SignupContainer />} />
                    <Route path="/" element={<TestListContainer />} />
                    <Route path="/users" element={<UserListContainer />} />
                    <Route path="/user/:uid" element={<UserProfileContainer />} />
                    <Route path="/test/:tid" element={<TestContainer />} />
                    <Route path="/test/random/:cid" element={<TestContainer />} />
                    <Route path="/create-test" element={<CreateTestContainer />} />
                </Routes>
            </div>
        </>
    )
}
