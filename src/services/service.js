const URL = "https://api.forze-coin.space"

async function authUser(userInfo) {
	try {
		let res = await fetch(`${URL}/auth`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userInfo)
		})

		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function getFreeBonus(userId, chatId) {
	try {
		let res = await fetch(`${URL}/free-coin/${userId}/${chatId}`)
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function transferCoin(user, transferUserLogin, totalCoin) {
	try {
		let res = await fetch(`${URL}/transfer`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user, transferUserLogin, totalCoin })
		})
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function startRoulette(user, rate) {
	try {
		let res = await fetch(`${URL}/roulette`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user, rate })
		})
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function getActiveCoinGame() {
	try {
		let res = await fetch(`${URL}/coin-game`)
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function getAllCoinGames() {
	try {
		let res = await fetch(`${URL}/coin-games-history`)
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function getNews() {
	try {
		let res = await fetch(`${URL}/news`)
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function postNews(title, text, login) {
	try {
		let res = await fetch(`${URL}/news`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, text, login })
		})
		let data = await res.json()

		return data
	} catch (error) {

	}
}

async function deleteNews(title, date) {
	try {
		let res = await fetch(`${URL}/news`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, date })
		})
		let data = await res.json()

		return data
	} catch (error) {

	}
}

export { authUser, getFreeBonus, transferCoin, startRoulette, getActiveCoinGame, getAllCoinGames, getNews, postNews, deleteNews }


