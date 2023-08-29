import "./Answer.css";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";

const Answer = () => {
	const [userData] = useGlobalContext();
	const [questions, setQuestions] = useState([]);
	const [addAnswer, setAddAnswer] = useState("");
	const [getAnswer, setGetAnswer] = useState([]);
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	// FetchQusetion from user and question tables
	const fetchQuestions = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3001/api/users/questionanduser"
			);
			setQuestions(response.data.data);
			// console.log(questions);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};
	useEffect(() => {
		fetchQuestions();
	}, []);

	//  Filtering single qusetion and question_description
	const singleQuestion = questions.filter((item) => item.question_id == id);
	// console.log(singleQuestion);

	//  Submit an Answer...
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3001/api/users/answer",
				{ answer: addAnswer, question_id: id, user_id: userData.user.id }
			);
		} catch (error) {
			console.error(error);
		}
		setAddAnswer(""); // Clear Answer input form
	};

	// Handling input....
	const handleChange = (e) => {
		const newValue = e.target.value; // Extract the new value from the input element
		setAddAnswer(newValue); // Update the state with the new value
	};

	//  Fetch Submited Answer
	const fetchAnswer = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3001/api/users/allAnswer"
			);
			// console.log(response.data.data);
			setGetAnswer(response.data.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchAnswer();
	}, []);

	// Filter Single Answer....
	// using webworker..
	const singleAnswer = getAnswer.filter((item) => item.question_id == id);
	// console.log(singleAnswer);
	// console.log(getAnswer);
	return (
		<div className="answer">
			<div className="answer__container">
				<div className="answer__question">
					<h3>Question</h3>
					{singleQuestion.map((item) => (
						<React.Fragment key={item.question_id}>
							<h5>{item.question}</h5>
							<p>{item.question_description}</p>
						</React.Fragment>
					))}
				</div>
				{singleAnswer.length > 0 && (
					<h4 className="answer__comm">Answer from the community</h4>
				)}

				<div className="answer__top">
					<div className="answer__nameAndAns">
						{singleAnswer.map((item) => (
							<React.Fragment key={item.answer_id}>
								<div className="answer__img-user">
									<img
										className="img"
										src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
										alt="image"
									/>
									<h3>{item.first_name} </h3>
								</div>
								<p>{item.answer}</p>
							</React.Fragment>
						))}
					</div>
					<div className="answer__input__title">
						<h2>Answer The Top Question</h2>
						<p>
							<Link to="/ask">Go to Question Page</Link>
						</p>
						<div className="answer__input">
							<form onSubmit={onSubmit}>
								<input
									className="answer__inp"
									value={addAnswer}
									onChange={handleChange}
									type="text"
									name="answer"
									placeholder="Your Answer..."
								/>
								<button className="answer__submit">Submit Your Answer</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Answer;
