import './roulette.scss';
import GameTopbar from '../GameTopbar/GameTopbar';

import {
	logoSpinner,
	imageCat,
	rouletteX0,
	rouletteX0_5,
	rouletteX0_25,
	rouletteX0_35,
	rouletteX0_75,
	rouletteX1_5,
	rouletteX1_25,
	rouletteX1,
	rouletteX2,
	rouletteX3,
	rouletteX5
} from '../../services/image';

import { useState, useEffect, useRef } from 'react';

import { startRoulette } from '../../services/service';

const RouletteGame = ({ userControll }) => {

	const rewardVariants = [
		{ rew: 5, value: "Ставка х5", chance: 1, img: rouletteX5 },
		{ rew: 2, value: "Ставка х2", chance: 23, img: rouletteX2 },
		{ rew: 0.5, value: "Половина ставки", chance: 60, img: rouletteX0_5 },
		{ rew: 3, value: "Тепер їх троє", chance: 40, img: rouletteX3 },
		{ rew: 1.5, value: " +50% ставки", chance: 70, img: rouletteX1_5 },
		{ rew: 0.75, value: "Підкріпись", chance: 80, img: rouletteX0_75 },
		{ rew: 1.25, value: "Тримай четвертак", chance: 85, img: rouletteX1_25 },
		{ rew: 1, value: "Спробуй ще", chance: 90, img: rouletteX1 },
	]

	const { user, setUser } = userControll

	const [currentList, setCurrentList] = useState([])
	const [rate, setRate] = useState("")
	const [possList, setPossList] = useState(0)
	const [rouletteWidth, setRouletteWidth] = useState(0);
	const rouletteRef = useRef(null);

	useEffect(() => {
		if (rouletteRef.current) {
			const width = rouletteRef.current.offsetWidth;
			setRouletteWidth(width);
			setCurrentList(rewardVariants.sort(() => Math.random() - 0.5))
		}
	}, [rouletteRef]);

	const rollRoulete = () => {
		if (+rate > user.point) {
			alert("У вас недостатньо FRZC на балансі")
			return
		}

		if (rate === "" || +rate < 0.1) {
			alert("Зробіть ставку")
			return
		}

		setUser(prevUser => ({ ...prevUser, point: user.point - +rate }));

		startRoulette(user, rate)
			.then(data => {
				if (data.rewards) {
					data.rewards.forEach(el => {
						switch (el.rew) {
							case 0:
								return el.img = rouletteX0
							case 0.25:
								return el.img = rouletteX0_25
							case 0.35:
								return el.img = rouletteX0_35
							case 0.5:
								return el.img = rouletteX0_5
							case 0.75:
								return el.img = rouletteX0_75
							case 1:
								return el.img = rouletteX1
							case 1.25:
								return el.img = rouletteX1_25
							case 1.5:
								return el.img = rouletteX1_25
							case 2:
								return el.img = rouletteX2
							case 3:
								return el.img = rouletteX3
							case 5:
								return el.img = rouletteX5
						}
					})

					setCurrentList((prevList) => [...prevList, ...data.rewards])
					setPossList((data.prizeNumber + 8) * 150 - rouletteWidth / 2 + 75)
					setTimeout(() => {
						setPossList(0)
						setUser(data.userInfo)
						setTimeout(() => {
							setCurrentList(rewardVariants.sort(() => Math.random() - 0.5))
						}, 500)
					}, 4700)
				}
			})
	}

	return (
		<section className="game-roulete">
			<div className="container">
				<GameTopbar gameInfo={{ logo: logoSpinner, gameTitle: "Рулетка" }} />

				<div className="game-page__roulete" ref={rouletteRef}>
					<ul className="roulete__list row"
						style={{ left: -possList + "px", transition: possList ? "left 4s" : "left 1s" }}
					>
						{
							currentList ? currentList.map((el, i) => {
								return (<li key={i}> <img src={el.img} alt={el.value} /> <p>{el.value}</p></li>)
							}) : ""
						}
					</ul>
				</div>
				<input type="number" step={0.1} value={rate} onChange={(event) => setRate(event.target.value)} />
				<button
					className='btn'
					onClick={rollRoulete}
					disabled={currentList.length === 8 ? false : true}
				>Крутити</button>
				<img className='cat' src={imageCat} alt="imageCat" />
			</div>
		</section>
	);
};

export default RouletteGame;