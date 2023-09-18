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
			const response = await axios.post(
				`${process.env.REACT_APP_base_url}/api/users/ask`,
				{
					question: question,
					question_description: description,
					user_id: userData.user.id,
				}
			);
			if (response.statusText === "OK") navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="Question">
			<div className="question_instr">
				<h4>
					Define Your Purpose: Start by clearly defining the purpose of your
					question.
				</h4>
				<li>
					Choose the Question Type: Questions can vary in type, such as
					open-ended, closed-ended, multiple-choice, or opinion-based
				</li>
				<li>
					Consider Context: Provide context or background information if
					necessary.
				</li>
				<li>
					Keep it Relevant: Ensure that your question directly relates to your
					overall goal or research.
				</li>
				<li>
					Ask One Thing at a Time: Each question should focus on a single aspect
					or topic.
				</li>
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
