import "./free.scss"

import { gifGoldBag } from "../../services/image"

import { useState, useEffect } from "react"

import { getFreeBonus } from "../../services/service"

const FreePage = ({ userControll }) => {

	const { user, setUser } = userControll
	const [timeLeft, setTimeLeft] = useState("");

	const calculateTimeLeft = () => {
		const currentTime = new Date();
		const nextFreeCoinTime = new Date(user.freeCoinTime.year, user.freeCoinTime.month, user.freeCoinTime.day, user.freeCoinTime.hour, user.freeCoinTime.minute, user.freeCoinTime.second);
		nextFreeCoinTime.setHours(nextFreeCoinTime.getHours() + 3);
		const difference = nextFreeCoinTime - currentTime;
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}

		return timeLeft;
	};

	const getFreeBonusHandleBtn = (event) => {
		getFreeBonus(user.userId, user.chatId)
			.then(data => {
				if (data.userInfo) {
					setUser(data.userInfo)
				} else {
					alert("Вам потрібно дочекатись коли вийде час")
				}
			})
	}

	useEffect(() => {
		if (user.freeCoinTime) {
			const timer = setTimeout(() => {
				setTimeLeft(calculateTimeLeft());
			}, 1000);

			return () => clearTimeout(timer);
		}
	})

	return (
		<section className="free-page row">
			<div className="container">
				<img src={gifGoldBag} alt="gold-bag" />
				<h2>Отримуй FRZC кожні 3 години безкоштовно!</h2>

				<div className="free-page__timer row">
					{timeLeft === "" ? <div className="free-page__timer-message">Отримуємо дані...</div> :
						timeLeft.hours >= 0 && timeLeft.minutes >= 0 && timeLeft.seconds >= 0 ?
							<>
								<div className="free-page__timer-box">
									<p>{timeLeft.hours}</p>
									<span>год</span>
								</div>
								<div className="free-page__timer-box">
									<p>{timeLeft.minutes}</p>
									<span>хв</span>
								</div>
								<div className="free-page__timer-box">
									<p>{timeLeft.seconds}</p>
									<span>сек</span>
								</div>
							</> :
							<div className="free-page__timer-message">Ви можете отримати нагороду</div>
					}
				</div>

				<button className="btn" onClick={getFreeBonusHandleBtn}>Отримати</button>

			</div>
		</section>
	)
}

export default FreePage