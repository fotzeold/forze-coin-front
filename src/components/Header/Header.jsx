import "./header.scss"
import { logoCoin } from "../../services/image"

const Header = ({ user }) => {
	return (
		<header>
			<div className="container">
				<div className="row">
					<div className="header__label">Головна</div>
					<div className="header-coin row" ><p>{user.point ? user.point : "loading..."}</p> <img src={logoCoin} alt="logoCoin" /></div>
				</div>
			</div>
		</header>
	)
}

export default Header