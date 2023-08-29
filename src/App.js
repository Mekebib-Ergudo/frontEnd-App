import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/Nav";
import Login from "./components/log/Login";
import Home from "./components/home/Home";
import Ask from "./components/question/Ask";
import Answer from "./components/answer/Answer";
import Signup from "./components/createAccount/Signup";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						<>
							<Nav />
							<Login />
						</>
					}
				/>
				<Route
					path="/signup"
					element={
						<>
							<Nav />
							<Signup />
						</>
					}
				/>
				<Route
					path="/"
					element={
						<>
							<Nav />
							<Home />
						</>
					}
				/>
				<Route
					path="/ask"
					element={
						<>
							<Nav />
							<Ask />
						</>
					}
				/>
				<Route
					path="/ans"
					element={
						<>
							<Nav />
							<Answer />
						</>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
