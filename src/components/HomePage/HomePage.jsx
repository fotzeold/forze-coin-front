import "./home.scss"

import { imageCoin, imageTelegram, imageBot } from "../../services/image"

const HomePage = () => {
	return (
		<section className="home-page">
			<div className="container">
				<div className="home-page__top row">
					<div className="home-page__top-wrapper">
						<img src={imageCoin} alt="image_coin" />
						<h1>FRZC на forze-coin.space</h1>
						<p>Твоя можливість весело провести час в інтернеті</p>
					</div>
					<div className="home-page__top-wrapper">
						<img src={imageTelegram} alt="terraria_forze" />
						<h2>Телеграм чат</h2>
						<p>Приєднуйся до нашого чату <a href="https://t.me/terraria_forze">Terroristy</a>, щоб заробляти FRZC разом з нами, та весело проводити час!</p>
					</div>
				</div>

				<div className="home-page__bot row">
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
							<li>change_photo - прикріпляємо як коментар до фото яке має стати авою групи</li>
						</ul>

						<p>Мій творець завжди відкритий до нових ідей, тому якщо у вас така зявилась то пишіть сюди - <a href="https://t.me/forzeoldgg">@forzeoldgg</a> </p>

					</div>
				</div>
			</div>
		</section >
	)
}

export default HomePage