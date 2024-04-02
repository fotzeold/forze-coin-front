import "./coin.scss"
import GameTopbar from "../GameTopbar/GameTopbar"

import { logoGameCoin, coinRoll, imageUser } from "../../services/image"
import { getActiveCoinGame, getAllCoinGames } from "../../services/service"

import { useState, useEffect } from "react"

import io from 'socket.io-client';

const Coingame = ({ userControll }) => {

	const socket = io('https://api.forze-coin.space');

	const { user, setUser } = userControll

	const [history, setHistory] = useState([])

	const [activeGame, setActiveGame] = useState(null)
	const [activeModal, setActiveModal] = useState(false)
	const [currUser, setCurrUser] = useState("")

	useEffect(() => {
		getActiveCoinGame()
			.then(data => data.game ? setActiveGame(data.game) : console.log(data.message))
			.catch(err => console.log(err))
	}, [])

	useEffect(() => {
		if (!activeGame) {
			getAllCoinGames()
				.then(data => data ? setHistory(data.games) : console.log(data.message))
				.catch(err => console.log(err))

			return
		}

		if (activeGame && activeGame.firstUser && activeGame.firstUser.userId === user.userId) {
			if (activeGame.winner) {
				setTimeout(() => {
					setUser(activeGame.firstUser)
					setActiveGame(null)
				}, 5200)
			} else {
				setUser(activeGame.firstUser)
			}
		}

		if (activeGame && activeGame.secondUser && activeGame.secondUser.userId === user.userId) {
			if (activeGame.winner) {
				setTimeout(() => {
					setUser(activeGame.secondUser)
					setActiveGame(null)
				}, 5200)
			} else {
				setUser(activeGame.secondUser)
			}
		}
	}, [activeGame])

	useEffect(() => {
		socket.on('buttonClicked', (data) => {
			if (data.bet) {
				setActiveGame(data)
			}
		});
	}, [socket]);

	const betHandler = (event) => {

		if (user.point < 0.2) return alert("Недостатньо FRZC на балансі!")

		const key = event.target.dataset.key

		if (!activeGame || key === "first-user" && !activeGame.firstUser) {
			setCurrUser(key)
			setActiveModal(true)
			return
		}

		if (!activeGame || key === "second-user" && !activeGame.secondUser) {
			setCurrUser(key)
			setActiveModal(true)
			return
		}
	}

	const makeBet = () => {
		setActiveModal(false)

		if (currUser === "first-user") return socket.emit("buttonClicked1", user)
		if (currUser === "second-user") return socket.emit("buttonClicked2", user)
	}

	const animOn = activeGame && activeGame.winner ? true : false
	const animName = animOn && { animationName: activeGame.winner.userName === activeGame.firstUser.userName ? "rotate-coin-first" : "rotate-coin-second" }

	return (
		<section className="game-coin">
			<div className="container">
				<GameTopbar gameInfo={{ logo: logoGameCoin, gameTitle: "Монетка" }} />
				<div
					className="game-coin__coin"
					style={animName ? animName : {}}
				>
					<img src={coinRoll} alt="" />
				</div>
				<div className="game-coin__wrapper row">
					<div onClick={betHandler} className="first-user game-coin__wrapper-element" data-key="first-user">
						{activeGame && activeGame.firstUser &&
							<><img src={activeGame.firstUser.img ? activeGame.firstUser.img : imageUser} alt="" /> <p>{activeGame.firstUser.userName}</p></>}

					</div>

					<div onClick={betHandler} className="second-user game-coin__wrapper-element" data-key="second-user">
						{activeGame && activeGame.secondUser &&
							<><img src={activeGame.secondUser.img ? activeGame.secondUser.img : imageUser} alt="" /> <p>{activeGame.secondUser.userName}</p></>}
					</div>
				</div>

				<div className="game-coin__history">
					<h2>Історія ігор</h2>
					<ul>
						{
							history.length > 0 ? [...history].reverse().map(element => {
								console.log(element)
								return (
									<li className="game-coin__history-el" key={element._id}>
										<div className={`history-user ${element.firstUser.userId == element.winner.userId ? "winner" : ""}`}>
											<img src={element.firstUser.img ? element.firstUser.img : imageUser} alt="firstuser" />
											<p>{element.firstUser.userName}</p>
										</div>
										<span>VS</span>
										<div className={`history-user ${element.secondUser.userId == element.winner.userId ? "winner" : ""}`}>
											<img src={element.secondUser.img ? element.secondUser.img : imageUser} alt="seconduser" />
											<p>{element.secondUser.userName}</p>
										</div>
									</li>
								)
							}) : "Історія ігор відсутня"
						}
					</ul>
				</div>

				<div className={activeModal ? "game-coin__modal active" : "game-coin__modal"}>
					<div className="game-coin__modal-window">
						<h3>Вартість 0.2 FRZC</h3>

						<div className="modal-window__nav row">
							<button onClick={() => setActiveModal(false)} className="btn cancel">Скасувати</button>
							<button onClick={makeBet} className="btn start">Грати</button>
						</div>
					</div>
				</div>
			</div>
		</section >
	)
}

export default Coingame