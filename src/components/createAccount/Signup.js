import "../log/Login.css";
import "./Signup.css";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [color, setColor] = useState("#ccc");
	const [info, setInfo] = useState({
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		userName: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!(info.email || info.firstName || info.lastName || info.userName)) {
			setColor("red");
			return;
		}
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_base_url}/api/users`,
				info
			);
			navigate("/login");
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
	};
	return (
		<div className="login__wrapper">
			<div className="login__container">
				<div className="login__center">
					<div className="login__title">
						<h3>Join the network</h3>
						Already have an account?
						<span>
							<Link to="/login">Sign in</Link>
						</span>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="login__input signup ">
							<input
								style={{ borderColor: color }}
								value={info.email}
								onChange={handleChange}
								type="text"
								name="email"
								placeholder="Email"
								autoComplete="email"
							/>
							<div className="name">
								<input
									style={{ borderColor: color }}
									value={info.firstName}
									onChange={handleChange}
									type="text"
									name="firstName"
									placeholder="First Name"
								/>
								<input
									style={{ borderColor: color }}
									value={info.lastName}
									onChange={handleChange}
									type="text"
									name="lastName"
									placeholder="Last Name"
								/>
							</div>
							<input
								style={{ borderColor: color }}
								value={info.userName}
								onChange={handleChange}
								type="text"
								name="userName"
								placeholder="User Name"
							/>

							<input
								style={{ borderColor: color }}
								value={info.password}
								onChange={handleChange}
								type="password"
								name="password"
								autoComplete="current-password"
								placeholder="Password"
							/>
							<p className="signup__privacy">
								I agree
								<Link
									to="https://www.evangadi.com/legal/privacy/"
									target="blank"
								>
									to the privacy policy
								</Link>
								and
								<Link to="https://www.evangadi.com/legal/terms/" target="blank">
									terms of service.
								</Link>
							</p>
							<button className="login__submit">Agree and Join</button>
							<p className="have__account">
								<Link to="/login">Already have an account?</Link>
							</p>
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

export default Signup;
