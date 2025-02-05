import React, { useState, useEffect } from "react";

export default function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const loggedUser = localStorage.getItem("LoggedUser");
		if (loggedUser) {
			window.history.back();
		}
	}, []);

	const handleLogin = (event) => {
		event.preventDefault();


		const users = JSON.parse(localStorage.getItem("users")) || [];


		const user = users.find(
			(u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
		);

		if (user) {

			localStorage.setItem("LoggedUser", JSON.stringify(user));


			window.location.href = "/";
		} else {
			setError("Username or password incorrect");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-100">
			<form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
				<h2 className="text-2xl font-bold text-center mb-4">Login</h2>

				{error && <p className="text-red-500 text-sm text-center">{error}</p>}

				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-2"
					required
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-2"
					required
				/>

				<button
					type="submit"
					className="w-full mt-4 bg-orange-400 text-black p-2 rounded hover:bg-orange-600"
				>
					Login
				</button>
			</form>
		</div>
	);
}