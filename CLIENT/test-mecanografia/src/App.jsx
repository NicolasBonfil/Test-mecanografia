import "./estilos.css"
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom'
import { LoginContainer } from "./components/SESSION/LoginContainer.jsx"
import { SignupContainer } from "./components/SESSION/SignupContainer.jsx"
import Axios from "axios"
import { MenuContextProvider } from "./Context/MenuContext.jsx"
import { NavbarContainer } from "./components/NAVBAR/NavbarContainer.jsx"
import { TestListContainer } from "./components/LIST/TESTLIST/TestListContainer.jsx"
import { TestContainer } from "./components/TEST/TestContainer.jsx"
import { UserProfileContainer } from "./components/PROFILE/UserProfileContainer.jsx"
import { UserListContainer } from "./components/LIST/USERS/UserListContainer.jsx"
import { CreateTestContainer } from "./components/CREATE/CreateTestContainer.jsx"
import { RandomContextProvider } from "./Context/RandomContext.jsx"
import { HeaderContainer } from "./components/HEADER/HeaderContainer.jsx"
import { AppDetail } from "./AppDetail.jsx"
Axios.defaults.withCredentials = true

function App() {
	return (
		<>
		<MenuContextProvider>
		<RandomContextProvider>
			<Router>
				<AppDetail/>
				{/* <HeaderContainer/>
				<NavbarContainer/>
				<Routes>
					<Route path='*' element = {<Navigate to="/login"/>} />
					<Route  path='/login' element={<LoginContainer/>} />
					<Route  path='/signup' element={<SignupContainer/>} />

					<Route path="/" element={<TestListContainer />}/>
					<Route path="/users" element={<UserListContainer/>} />
					<Route path="/user/:uid" element={<UserProfileContainer/>} />
					<Route path="/test/:tid" element={<TestContainer/>} />
					<Route path="/test/random/:cid" element={<TestContainer/>} />
					<Route path="/create-test" element={<CreateTestContainer/>} />
				</Routes> */}
			</Router>
		</RandomContextProvider>
		</MenuContextProvider>
		</>
	)
}

export default App
