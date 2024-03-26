import "./top-bar.scss"

const GameTopbar = ({ gameInfo }) => {

	const { logo, gameTitle } = gameInfo

	return (
		<div className="game-page__top">
			<div className="row">
				<img src={logo} alt={"logo-" + gameTitle} />
				<h2>{gameTitle}</h2>
			</div>
		</div>
	)
}

export default GameTopbar

