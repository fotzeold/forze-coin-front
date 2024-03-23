import "./all-games.scss"
import { Link, useLocation } from "react-router-dom"
import { logoSpinner } from "../../services/image";
import { useEffect } from "react";

const AllGamesPage = ({ setLabelPage }) => {

	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/games/roulette") {
			setLabelPage("Спінер");
		}
	}, [location.pathname, setLabelPage]);

	return (
		<section className="all-games">
			<div className="container">
				<div className="row">
					<Link to="/games/roulette" className="game-link">
						<img src={logoSpinner} alt="Spinner" />
						<p>Рулетка</p>
					</Link>
				</div>
			</div>
		</section>
	);
}

export default AllGamesPage