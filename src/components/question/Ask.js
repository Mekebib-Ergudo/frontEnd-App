import "./Ask.css";
import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { Link, useNavigate } from "react-router-dom";

const Ask = () => {
	const navigate = useNavigate();
	const [userData] = useGlobalContext();
	const [question, setQuestion] = useState("");
	const [description, setDescription] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "question") setQuestion(value);
		if (name === "description") setDescription(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/api/users/ask", {
				question: question,
				question_description: description,
				user_id: userData.user.id,
			});
			if (response.statusText === "OK") navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="Question">
			<div className="question_instr">
				<h4>Steps to write what's on your mind !</h4>
				<li> Lorem ipsum consectetur, adipisicing elit. Nisi, ullam!</li>
				<li>Lorem ipsum consectetur, adipisicing elit. Nisi, ullam!</li>
				<li>Lorem ipsum consectetur, adipisicing elit. Nisi, ullam!</li>
				<li>Lorem ipsum consectetur, adipisic</li>
			</div>
			<div className="question__form">
				<div className="question__title">
					<h3>Ask a public question.</h3>

					<Link to="/" className="question__link">
						Go to Home Page
					</Link>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="input-container">
						<input
							className="inpt"
							value={question}
							onChange={handleChange}
							type="text"
							name="question"
							placeholder="Question..."
						/>
						<input
							className=" inpt description"
							value={description}
							onChange={handleChange}
							type="text"
							name="description"
							placeholder="Question-Description..."
						/>
						<button className="submit">Submit Your Question</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Ask;
