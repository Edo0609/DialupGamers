import React, { useState, useEffect } from "react";

export default function RegisterForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const loggedUser = localStorage.getItem("LoggedUser");
		if (loggedUser) {
			window.history.back();
		}
	}, []);

	const handleRegister = (event) => {
		event.preventDefault();

	
		const users = JSON.parse(localStorage.getItem("users")) || [];

		const userExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());

		if (userExists) {
			setError("Username already exists");
			return;
		}


		const newUser = {
			username,
			password,
			boughtCourses: [], 
		};


		users.push(newUser);
		localStorage.setItem("users", JSON.stringify(users));


		localStorage.setItem("LoggedUser", JSON.stringify(newUser));


		window.location.href = "/";
	};

	return (
		<div className="flex flex-col items-center justify-center h-100">
			<form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
				<h2 className="text-2xl font-bold text-center mb-4">Register</h2>

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
					className="w-full mt-4 bg-teal-400 text-black p-2 rounded hover:bg-teal-600"
				>
					Register
				</button>
			</form>
		</div>
	);
}