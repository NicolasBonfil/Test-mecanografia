import "./estilos.css"
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate} from 'react-router-dom'
import { LoginContainer } from "./components/SESSION/LoginContainer.jsx"
import { SignupContainer } from "./components/SESSION/SignupContainer.jsx"
import { NavbarContainer } from "./components/NAVBAR/NavbarContainer.jsx"
import { TestListContainer } from "./components/LIST/TESTLIST/TestListContainer.jsx"
import { TestContainer } from "./components/TEST/TestContainer.jsx"
import { UserProfileContainer } from "./components/PROFILE/UserProfileContainer.jsx"
import { UserListContainer } from "./components/LIST/USERS/UserListContainer.jsx"
import { CreateTestContainer } from "./components/CREATE/CreateTestContainer.jsx"
import { HeaderContainer } from "./components/HEADER/HeaderContainer.jsx"
import { RandomContextProvider } from "./Context/RandomContext.jsx"
import { MenuContextProvider } from "./Context/MenuContext.jsx"
import { AppDetail } from "./AppDetail.jsx"
import Axios from "axios"
Axios.defaults.withCredentials = true

function App() {
	return (
		<>
		<MenuContextProvider>
		<RandomContextProvider>
			<Router>
				<AppDetail/>
			</Router>
		</RandomContextProvider>
		</MenuContextProvider>
		</>
	)
}

export default App
