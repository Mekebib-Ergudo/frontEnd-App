require("dotenv").config();
import "./Home.css";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GrFormNextLink } from "react-icons/gr";
const Home = () => {
	const [question, setQuestion] = useState([]);
	const navigate = useNavigate();
	const [userData] = useGlobalContext();
	useEffect(() => {
		if (!userData.token) navigate("/login");
	}, [userData]);

	const fetchQuestions = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_base_url}/api/users/questionanduser`
			);
			// console.log(response);
			const reversedData = response.data.data.reverse();
			setQuestion(reversedData);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchQuestions();
	}, []);

	return (
		<div className="home">
			<div className="home__title">
				<Link to="/ask" className="home__askQuestion">
					Ask Question
				</Link>

				<h3 className="home__userName">
					Welcome: {userData && userData.user.display_name} !
				</h3>
			</div>
			<h2 className="home__questionTitle">Questions</h2>
			<div className="home__questions">
				{question?.map((item) => {
					let id = item.question_id;
					return (
						<React.Fragment key={item.question_id}>
							<div className="home__UserandQusetion">
								<div className="home__img-user">
									<img
										className="img"
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrIfBonwutkrU7BETKihJm8Ld5EBUUgrsIOw&usqp=CAU"
										alt="image"
									/>
									<p>{item.first_name}</p>
								</div>
								<div className="home__Q">
									<Link to={`/ans?id=${id}`} className="home__Qtn">
										{item.question}
									</Link>
									<GrFormNextLink />
								</div>
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
