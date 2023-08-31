import "./Login.css";
import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useGlobalContext();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	// Change input backgroud color if it empaty
	const [errorColor, setErrorColor] = useState("#ccc");

	// submit data to the tables
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setErrorColor("red");
			return;
		}
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_base_url}/api/users/login`,
				{
					email: email,
					password: password,
				}
			);
			console.log(response);
			if (response.data.token) {
				setUserData({
					user: response.data.user,
					token: response.data.token,
				});
				navigate("/");
				console.log(userData);
			}
		} catch (error) {
			console.error(error);
			console.log(error.response.data.msg);
			setErrorMsg(error.response.data.msg);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	return (
		<div className="login__wrapper">
			<div className="login__container">
				<div className="login__center">
					<div className="login__title">
						<p style={{ color: "red" }}>{errorMsg && errorMsg}</p>
						<h3>Login to your account</h3>
						Don't have an account?
						<span>
							<Link to="/signup"> Create a new account</Link>
						</span>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="login__input">
							<input
								style={{ borderColor: errorColor }}
								value={email}
								onChange={handleChange}
								type="text"
								name="email"
								placeholder="Email"
								autoComplete="email"
							/>
							<input
								style={{ borderColor: errorColor }}
								value={password}
								onChange={handleChange}
								type="password"
								name="password"
								autoComplete="current-password"
								placeholder="Password"
							/>

							<Link to="" className="link">
								Forgot Password?
							</Link>

							<button type="submit" className="login__submit">
								Login
							</button>
						</div>
					</form>
				</div>

				<div className="login__about-Evan">
					<p className="about">About</p>
					<div>
						<h1>Evangadi Networks</h1>
						<p>
							No matter what stage of life you are in, whether you’re just
							starting elementary school or being promoted to CEO of a Fortune
							500 company, you have much to offer to those who are trying to
							follow in your footsteps.
						</p>
						<p>
							Wheather you are willing to share your knowledge or you are just
							looking to meet mentors of your own, please start by joining the
							network here.
						</p>
						<button type="button" className="login__btn">
							How IT WORKS
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
