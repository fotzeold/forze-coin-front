import "./footer.scss"

import { NavLink } from "react-router-dom";

const Footer = () => {

	return (
		<footer>
			<div className="container">
				<div className="row">
					<NavLink className={({ isActive }) => (isActive ? 'footer__nav row active' : 'footer__nav row inactive')} to="/">
						<figure className="footer__nav-home"></figure>
						<p>Головна</p>
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? 'footer__nav row active' : 'footer__nav row inactive')} to="/free">
						<figure className="footer__nav-free"></figure>
						<p>Бонус</p>
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? 'footer__nav row active' : 'footer__nav row inactive')} to="/games">
						<figure className="footer__nav-games"></figure>
						<p>Ігри</p>
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? 'footer__nav row active' : 'footer__nav row inactive')} to="/transfer">
						<figure className="footer__nav-transfer"></figure>
						<p>Переказ</p>
					</NavLink>
					<NavLink className={({ isActive }) => (isActive ? 'footer__nav row active' : 'footer__nav row inactive')} to="/profile">
						<figure className="footer__nav-profile"></figure>
						<p>Профіль</p>
					</NavLink>
				</div>
			</div>
		</footer>
	)
}

export default Footer;