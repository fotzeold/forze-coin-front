import './game.scss';

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

import { updateUserCoin } from '../../services/service';

const GamePage = ({ userControll }) => {

	const { user, setUser } = userControll

	const ceils = 50
	const rewards = [
		{ rew: 5, value: "Ставка х5", chance: 1, img: rouletteX5 },
		{ rew: 0, value: "Тобі ще пощастить", chance: 13, img: rouletteX0 },
		{ rew: 2, value: "Ставка х2", chance: 23, img: rouletteX2 },
		{ rew: 0.25, value: "Краще ніж нічого", chance: 38, img: rouletteX0_25 },
		{ rew: 3, value: "Тепер їх троє", chance: 40, img: rouletteX3 },
		{ rew: 0.5, value: "Половина ставки", chance: 60, img: rouletteX0_5 },
		{ rew: 1.5, value: " +50% ставки", chance: 70, img: rouletteX1_5 },
		{ rew: 0.75, value: "Підкріпись", chance: 80, img: rouletteX0_75 },
		{ rew: 1.25, value: "Тримай четвертак", chance: 85, img: rouletteX1_25 },
		{ rew: 1, value: "Спробуй ще", chance: 90, img: rouletteX1 },
		{ rew: 0.35, value: "Третина ставки", chance: 100, img: rouletteX0_35 }
	]

	const getItem = () => {
		let reward

		while (!reward) {
			const chance = Math.floor(Math.random() * 100)

			rewards.forEach(el => {
				if (chance <= el.chance && !reward) {
					reward = el
				}
			})
		}

		return reward
	}

	const generateList = () => {
		let list = []

		for (let i = 0; i <= ceils; i++) {
			list.push(getItem())
		}

		return list
	}

	const [currentList, setCurrentList] = useState(generateList())
	const [possList, setPossList] = useState(0)
	const [rate, setRate] = useState("")

	const [rouletteWidth, setRouletteWidth] = useState(0);
	const rouletteRef = useRef(null);

	useEffect(() => {
		if (rouletteRef.current) {
			const width = rouletteRef.current.offsetWidth;
			setRouletteWidth(width);
		}
	}, []);

	const rollRoulete = () => {
		if (rate === "" || +rate < 0.1) {
			alert("Зробіть ставку")
			return
		}

		setPossList(3825 - rouletteWidth / 2)
		const newReward = +(currentList[25].rew * +rate).toFixed(3);
		const updatedPoints = user.point - +rate + newReward;
		setUser({ ...user, point: user.point - +rate });
		let updatedUser

		updateUserCoin({ ...user, point: updatedPoints })
			.then(data => {
				if (data.userInfo) {
					updatedUser = data.userInfo
				}
			})

		setTimeout(() => {
			setPossList(0)
			setCurrentList(generateList())
			setUser(updatedUser)
		}, 4700)
	}

	return (
		<section className="game-page">
			<div className="container">
				<div className="game-page__top row">
					<img src={logoSpinner} alt="logoSpinner" />
					<h2>Рулетка</h2>
				</div>

				<div className="game-page__roulete" ref={rouletteRef}>
					<ul className="roulete__list row" style={{ left: -possList + "px", transition: possList ? "left 4s" : "left 1s" }}>
						{
							currentList ? currentList.map((el, i) => {
								if (i === 25) {
									return (<li key={i} style={{ background: "red" }}> <img src={el.img} alt={el.value} /> <p>{el.value}</p></li>)
								}
								return (<li key={i}> <img src={el.img} alt={el.value} /> <p>{el.value}</p></li>)
							}) : ""
						}
					</ul>
				</div>
				<input type="number" step={0.1} value={rate} onChange={(event) => setRate(event.target.value)} />
				<button className='btn' onClick={rollRoulete} disabled={possList ? true : false}>Крутити</button>
				<img className='cat' src={imageCat} alt="imageCat" />
			</div>
		</section>
	);
};

export default GamePage;