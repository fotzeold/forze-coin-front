const URL = "https://forze-coin.space"

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

export { authUser }


