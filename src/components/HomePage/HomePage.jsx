import "./home.scss"

import { imageCoin, imageTelegram, imageBot } from "../../services/image"
import { Link, animateScroll as scroll } from "react-scroll";
import { getNews, deleteNews } from "../../services/service"
import { useEffect, useState } from "react"

const HomePage = ({ user }) => {

	const [news, setNews] = useState([])

	useEffect(() => {
		getNews().then(data => {
			if (data && data.news) {
				setNews(data.news)
			}
		})
	})

	const deleteNewsFromHome = (title, date) => {
		let isDeleted = window.confirm("Новину буде видалено!")

		if (isDeleted) {
			deleteNews(title, date).then(data => {
				if (data.message != 'Новину видалено') {
					window.alert("Щось пышло не так... Спробуй пізніше!")
				}
			})
		}
	}

	return (
		<section className="home-page">
			<div className="container">
				<div className="home-page__submenu row">
					<Link to="news"
						className="link-to-section"
						spy={true}
						activeClass="active"
						smooth={true}
						offset={-125}
						duration={500}
					>Новини</Link>
					<Link to="telegram-info"
						className="link-to-section"
						spy={true}
						activeClass="active"
						smooth={true}
						offset={-120}
						duration={500}
					>Телеграм</Link>
					<Link to="all-info"
						className="link-to-section"
						spy={true}
						activeClass="active"
						smooth={true}
						offset={-70}
						duration={500}
					>Про бота</Link>
				</div>
				<div className="home-page__news" id="news">
					<h1>Новини</h1>
					<div className="home-page__news-wrapper row">
						{
							news.length > 0 ? news.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map((el, i) => {
								let date = new Date(el.date);
								let day = ("0" + date.getDate()).slice(-2);
								let month = ("0" + (date.getMonth() + 1)).slice(-2);
								let year = date.getFullYear();
								let formattedDate = `${day}.${month}.${year}`;
								return (
									<div className="news-wrapper__item" key={el._id + "-news" + i + "000"}>
										<h3>{el.title}<span> - {formattedDate}</span></h3>
										{user && (user.login === el.author || user.login === "forzeoldgg") && <button onClick={() => deleteNewsFromHome(el.title, el.date)} className="delete__news">x</button>}
										{
											el.text.map((txt, j) => <p key={el._id + "-txt-" + j}>{txt}</p>)
										}
										<h4>@{el.author}</h4>
									</div>
								)
							}) : "Новин поки немає..."
						}
					</div>
				</div>
				<div className="home-page__top row">
					{/* <div className="home-page__top-wrapper">
						<img src={imageCoin} alt="image_coin" />
						<h1>Новини</h1>
						<p>Твоя можливість весело провести час в інтернеті</p>
					</div> */}
					<div className="home-page__top-wrapper" id="telegram-info">
						<img src={imageTelegram} alt="terraria_forze" />
						<h2>Телеграм чат</h2>
						<p>Приєднуйся до нашого чату <a href="https://t.me/terraria_forze">Terroristy</a>, щоб заробляти FRZC разом з нами, та весело проводити час!</p>
					</div>
				</div>

				<div className="home-page__bot row" id="all-info">
					<img src={imageBot} alt="bot" />

					<div className="home-page__bot-descr">
						<h2>ForzeCoinBot</h2>

						<p>Привіт я ForzeCoinBot з моєю допомогою ти можеш заробляти FRZC, та купляти за неї наступні привілегії:</p>

						<ul>
							<li>Віп підписку - 1 FRZC (діє 30 днів та дає можливість надсилати гіфки та стікери у чат);</li>
							<li>Змінити фото групи - 10 FRZC (дає можливість за одноразову плату міняти фото групи);</li>
						</ul>

						<p>В майбутньому також плануєтся можливість конвертації FRZC в гривні!</p>

						<p>На даний момент доступні такі команди в нашому чаті, пишемо починаючи з "/":</p>

						<ul>
							<li>frzk_info - загальна інформація</li>
							<li>balance - перевірка балансу</li>
							<li>subscribe - статус підписки</li>
							<li>buy_subscribe - купити підписку</li>
							<li>play_game - гра на FRZC</li>
							<li>top_balances - топ балансів</li>
						</ul>

						<p>Мій творець завжди відкритий до нових ідей, тому якщо у вас така зявилась то пишіть сюди - <a href="https://t.me/forzeoldgg">@forzeoldgg</a> </p>

					</div>
				</div>
			</div>
		</section >
	)
}

export default HomePage