import "./coin.scss"
import GameTopbar from "../GameTopbar/GameTopbar"

import { logoGameCoin } from "../../services/image"

const Coingame = () => {
	return (
		<section className="game-coin">
			<div className="container">
				<GameTopbar gameInfo={{ logo: logoGameCoin, gameTitle: "Монетка" }} />
				<p>Гра ще у розробці...</p>
			</div>
		</section>
	)
}

export default Coingame