import "./auth.scss"
import { authUser } from "../../services/service"

import { useEffect, useState } from "react"

const AuthPage = ({ controllAuth }) => {

	const { setUser, authPage, setAuthPage } = controllAuth

	const [formData, setFormData] = useState({
		login: "",
		userId: ""
	})

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setFormData((prevInfo) => ({
			...prevInfo,
			[id]: value
		}))
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		authUser({ userId: formData.userId, login: formData.login })
			.then((data) => {
				setUser(data)
				localStorage.setItem("forze-coin.space", JSON.stringify(data))
				setAuthPage(false)
			})
			.catch((error) => console.error("Не вірний логін або пароль", error));

		setFormData({ login: "", password: "" });
	};

	return (
		<div className={authPage ? "auth" : "auth hide"}>
			<div className="container">
				<div className="row">
					<h2>Вхід Forze Coin</h2>
					<form onSubmit={handleSubmit}>
						<label htmlFor="login">Введи свій логін телеграм</label>
						<input
							type="text"
							id="login"
							onChange={handleInputChange}
							placeholder="forzeoldgg"
						/>
						<label htmlFor="userId">Введи свій пароль</label>
						<input
							type="text"
							id="userId"
							onChange={handleInputChange}
							placeholder="65465464"
						/>
						<button className="btn">Увійти</button>
					</form>
					<p>Не знаєш свій пароль?<br />Його можна отримати у нашому телеграм чаті <a href="https://t.me/terraria_forze">Terroristy</a> написавши команду /my_password</p>
				</div>
			</div>
		</div>
	)
}

export default AuthPage