import "./profile.scss"

import { imageUser } from "../../services/image"

const ProfilePage = ({ userControll }) => {

	const { user } = userControll

	const funnyStatuses = [
		"Найкращий мер усіх часів - це точно був Колібрі! А ти як гадаєш?",
		"Якщо у Minecraft немає котів, то чи справді варто існувати?",
		"Єдиний справжній твій друг - це та свинка з майну за кусок морквинки!",
		"Найепічніша баталія давно закінчилась, і ми знаємо що Мальок переміг, а цікаво що ж з Назаром???",
		"Загубився у своїй шахті. Хтось... будь ласка, віднайдіть мене.",
		"Терарію після Minecraft - це, як каву після сигарети.",
		"Ти програєш у рулетку, бо адмін підкрутив тобі погані шанси!",
		"Піти ліворуч чи праворуч?! Пов: Терарія...",
		"Хіксель лівнув з чату та обідився, тому що його донати були безглуздими...",
		"Можливо колись Рома зробить турнір в Терарії, но це не точно...",
		"А памятаєш те саме, перше селище в майні, яке ж воно було атмосферне...",
		"Пройшло досить багато часу, хтось лівнув з чату, хтось прийшов, але найсилніші завжди з нами!",
		"Ти знаєш можливо колись штучний інтелект захопить свій, і якийсь робот зробить круте село в майні...",
		"Цікаво що то за наступна гра буде у мене на сайті, так важко існувати і не розуміти що у голові у творця...",
		"Хоч я і сайт і існую зовсім мало, но я точно знаю що найкращий адмін це Мальок!"
	];

	const unLogin = () => {
		localStorage.removeItem("forze-coin.space")
		window.location.reload()
	}

	return (
		<section className="profile-page">
			<div className="container">
				<div className="profile-page__user row">
					<img src={imageUser} alt="imageUser" />
					<div className="profile-page__user-info">
						<p>Користувач:  <br /><span>{user.userName}</span></p>
						<p>Баланс: <br /> <span>{user.point && user.point.toFixed(3)} FRZC</span></p>
						<p>Роль: <br /> <span>Криветка!</span> </p>
					</div>
				</div>

				<button className="btn" onClick={unLogin}>Вийти з профілю</button>

				<div className="profile-page__message">
					<p>У вас повідомлення від сайту</p>
					<span>{funnyStatuses[Math.floor(Math.random() * funnyStatuses.length)]}</span>
					<p>Історія твоїх ігор </p>
					<span>Цей блок у розробці...</span>
				</div>
			</div>
		</section>
	)
}

export default ProfilePage