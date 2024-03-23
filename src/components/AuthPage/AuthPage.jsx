import "./auth.scss"
import { authUser } from "../../services/service"
import { spinnerWhite } from "../../services/image"
import { useState } from "react"

const AuthPage = ({ controllAuth }) => {

	const { setUser, authPage, setAuthPage } = controllAuth
	const [message, setMessage] = useState({ color: "", text: "" })
	const [isLoading, setIsLoading] = useState(false)
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

	const changeMessage = (value, clr) => {
		setMessage({ color: clr, text: value })

		setTimeout(() => {
			setMessage({ color: "", text: "" })
		}, 2000)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (isLoading) return

		setIsLoading(true)

		authUser({ userId: formData.userId, login: formData.login })
			.then((data) => {
				if (data.login) {
					setUser(data)
					localStorage.setItem("forze-coin.space", JSON.stringify(data))
					setAuthPage(false)
				} else {
					changeMessage("Не вірний логін або пароль", "red")
				}
			})
			.catch(() => changeMessage("Щось пішло не так...", "red"))
			.finally(() => setIsLoading(false))

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
							required
						/>
						<label htmlFor="userId">Введи свій пароль</label>
						<input
							type="text"
							id="userId"
							onChange={handleInputChange}
							placeholder="65465464"
							required
						/>
						<label style={{ color: message.color }}>{message.text}</label>
						<button className="btn">{isLoading ? <img src={spinnerWhite} alt="spinnerWhite" /> : "Увійти"} </button>
					</form>
					<p>Не знаєш свій пароль?<br />Його можна отримати у нашому телеграм чаті <a href="https://t.me/terraria_forze">Terroristy</a> написавши команду /my_password</p>
				</div>
			</div>
		</div>
	)
}

export default AuthPage