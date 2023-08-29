import "./Nav.css";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
	const [userData, setUserData] = useGlobalContext();

	// Logout button Funcationality...
	const logout = () => {
		setUserData({
			user: "",
			token: "",
		});
	};
	return (
		<div className="nav">
			<div className="nav__center">
				<div className="nav__img">
					<Link to="/">
						<img
							src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"
							alt=""
						/>
					</Link>
				</div>
				<div className="nav__list">
					<Link to="/">Home</Link>
					<Link className="link">How it Works</Link>
					<button className="nav__btn" onClick={logout}>
						{userData.token ? "SIGN OUT" : " SIGN IN"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Nav;
