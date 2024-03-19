import "./app.scss"
import AuthPage from "../AuthPage/AuthPage"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import HomePage from "../HomePage/HomePage"
import FreePage from "../FreePage/FreePage"
import GamePage from "../GamePage/GamePage"
import TransferPage from "../TransferPage/TransferPage"
import ProfilePage from "../ProfilePage/ProfilePage"

import { Routes, Route } from "react-router-dom";

import { authUser } from "../../services/service"
import { useState, useEffect } from "react"

const App = () => {

	const [user, setUser] = useState({})
	const [lcInfo, setlcInfo] = useState({})
	const [authPage, setAuthPage] = useState(false)

	useEffect(() => {
		if (lcInfo.userId) {
			authUser({ userId: lcInfo.userId, login: lcInfo.login })
				.then((data) => {
					setUser(data)
					localStorage.setItem("forze-coin.space", JSON.stringify(data))
				})
				.catch((error) => console.error("Не вірний логін або пароль", error));
		} else {
			getUserInfoFromLC()
		}
	}, [lcInfo])

	const getUserInfoFromLC = () => {
		const lcUserInfo = localStorage.getItem("forze-coin.space")

		if (lcUserInfo) {
			setlcInfo(JSON.parse(lcUserInfo))
		} else {
			setAuthPage(true)
		}
	}

	return (
		<>
			<Header user={user} />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/free" element={<FreePage userControll={{ user, setUser }} />} />
					<Route path="/games" element={<GamePage />} />
					<Route path="/transfer" element={<TransferPage />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Routes>
			</main>
			<Footer />
			<AuthPage controllAuth={{ setUser, authPage, setAuthPage }} />
		</>
	)
}

export default App
