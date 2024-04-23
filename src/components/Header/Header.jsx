import "./header.scss"
import { logoCoin } from "../../services/image"

const Header = ({ user, labelPage }) => {
	return (
		<header>
			<div className="container">
				<div className="row">
					<div className="header__label">{labelPage}</div>
					<div className="header-coin row" ><p>{user.point ? user.point.toFixed(3) : ""}</p> <img src={logoCoin} alt="logoCoin" /></div>
				</div>
			</div>
		</header>
	)
}

export default Header