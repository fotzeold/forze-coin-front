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

async function transferCoin(userLogin, transferUserLogin, totalCoin) {
	try {
		console.log({ userLogin, transferUserLogin, totalCoin })
		let res = await fetch(`${URL}/transfer`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userLogin, transferUserLogin, totalCoin })
		})
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

async function updateUserCoin(userParam) {
	try {
		let res = await fetch(`${URL}/user_coin`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userParam)
		})
		let data = await res.json()

		return data
	} catch (error) {
		return error
	}
}

export { authUser, getFreeBonus, transferCoin, updateUserCoin }


