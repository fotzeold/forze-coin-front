import "./app.scss"
import AuthPage from "../AuthPage/AuthPage"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import HomePage from "../HomePage/HomePage"
import FreePage from "../FreePage/FreePage"
import RouletteGame from "../RouletteGame/RouletteGame"
import TransferPage from "../TransferPage/TransferPage"
import ProfilePage from "../ProfilePage/ProfilePage"
import AllGamesPage from "../AllGamesPage/AllGamesPage"
import Coingame from "../CoinGame/CoinGame"

import { Routes, Route } from "react-router-dom";

import { authUser } from "../../services/service"
import { useState, useEffect } from "react"

const App = () => {

	const [user, setUser] = useState({})
	const [lcInfo, setlcInfo] = useState({})
	const [authPage, setAuthPage] = useState(false)
	const [labelPage, setLabelPage] = useState("Головна")

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
		const lcUserInfo = JSON.parse(localStorage.getItem("forze-coin.space"))

		if (lcUserInfo && lcUserInfo.userId) {
			setlcInfo(lcUserInfo)
		} else {
			setAuthPage(true)
		}
	}

	return (
		<>
			<Header user={user} labelPage={labelPage} />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/free" element={<FreePage userControll={{ user, setUser }} />} />
					<Route path="/games/roulette" element={<RouletteGame userControll={{ user, setUser }} />} />
					<Route path="/games/coin-flip" element={<Coingame userControll={{ user, setUser }} />} />
					<Route path="/games" element={<AllGamesPage setLabelPage={setLabelPage} />} />
					<Route path="/transfer" element={<TransferPage userControll={{ user, setUser }} />} />
					<Route path="/profile" element={<ProfilePage userControll={{ user }} />} />
				</Routes>
			</main>
			<Footer setLabelPage={setLabelPage} />
			<AuthPage controllAuth={{ setUser, authPage, setAuthPage }} />
		</>
	)
}

export default App
