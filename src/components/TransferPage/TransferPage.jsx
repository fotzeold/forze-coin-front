import "./transfer.scss"

import { gifCoinWalk } from "../../services/image"
import { transferCoin } from "../../services/service"

import { spinnerWhite } from "../../services/image"

import { useState } from "react"

const TransferPage = ({ userControll }) => {
	const { user, setUser } = userControll

	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState({ color: "", text: "" })
	const [formData, setFormData] = useState({ transferLogin: "", transferCoin: "" })

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setFormData((prevInfo) => ({
			...prevInfo,
			[id]: value
		}))
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		if (isLoading) return
		setIsLoading(true)

		transferCoin(user.login, formData.transferLogin, formData.transferCoin)
			.then(data => {
				if (data.userInfo) {
					changeMessage(data.message, "green")
					setUser(data.userInfo)
				} else {
					changeMessage(data.message, "red")
				}
			})
			.catch(() => changeMessage("Щось пішло не так...", "red"))
			.finally(() => {
				setFormData(() => ({
					transferLogin: "",
					transferCoin: ""
				}))
				setIsLoading(false)
			})
	}

	const changeMessage = (value, clr) => {
		setMessage({ color: clr, text: value })

		setTimeout(() => {
			setMessage({ color: "", text: "" })
		}, 2000)
	}

	return (
		<section className="transfer-page">
			<div className="container">
				<div className="row">
					<h2>Переказуйте FRZC <br /> швидко та надійно</h2>

					<form onSubmit={handleFormSubmit}>
						<label htmlFor="transferLogin">Користувач</label>
						<input
							type="text"
							id="transferLogin"
							placeholder="forzeoldgg"
							onChange={handleInputChange}
							value={formData.transferLogin}
							required
						/>
						<label htmlFor="transferCoin">Сума</label>
						<input
							type="number"
							id="transferCoin"
							placeholder="1.7"
							step="0.1"
							min={0.5}
							max={5}
							onChange={handleInputChange}
							value={formData.transferCoin}
							required
						/>
						<label className="transfer-page__message" style={{ color: message.color }}>{message.text}</label>
						<button className="btn"> {isLoading ? <img src={spinnerWhite} alt="spinner" /> : "Відправити"}</button>
					</form>

					<img src={gifCoinWalk} alt="gifCoinWalk" />
				</div>
			</div>
		</section >
	)
}

export default TransferPage

