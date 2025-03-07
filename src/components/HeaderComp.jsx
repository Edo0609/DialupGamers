import "../styles/global.css";
import logo from "../assets/ComputerIcon.png";
import Search from "./Search.jsx";
import courses from "../data/courses.ts";
import React, { useState, useEffect } from 'react';

export default function HeaderComp() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currency, setCurrency] = useState("USD");

	useEffect(() => {
		const user = localStorage.getItem('LoggedUser');
		setIsLoggedIn(!!user);

		const savedCurrency = localStorage.getItem("currency") || "USD";
		setCurrency(savedCurrency);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("LoggedUser");
		setIsLoggedIn(false);
		window.dispatchEvent(new Event("userLoggedOut"));
	};

	const handleCurrencyChange = (e) => {
		const newCurrency = e.target.value;
		setCurrency(newCurrency);
		localStorage.setItem("currency", newCurrency);
		window.dispatchEvent(new Event("currencyChanged"));
	};

	return (
		<header className="bg-white h-20 w-full shadow-xl z-10">
			<div className="w-full h-full flex items-center justify-between px-10">
				<div className="h-full">
					<a href="/" className="w-full h-full">
						<div className="w-full h-full flex items-center justify-around p-1">
							<img src={logo.src} alt="icon" className="h-full object-scale-down" />
							<div className="flex justify-center">
								<h1 className="text-2xl font-bold text-orange-600">Dial</h1>
								<h1 className="text-2xl font-bold text-teal-400">Up</h1>
							</div>
						</div>
					</a>
				</div>
				<div className="h-full flex items-center">
					<Search courses={courses} />
					<select
						value={currency}
						onChange={handleCurrencyChange}
						className="mx-2 p-2 border rounded bg-white shadow"
					>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
						<option value="JPY">JPY</option>
						<option value="AUD">AUD</option>
						<option value="CAD">CAD</option>
					</select>
					{isLoggedIn ? (
						<div className="h-full flex items-center">
							<a href="/my-courses" className="m-1">
								<div className="flex items-center p-2 px-5 border-2 bg-teal-100 border-teal-400 rounded-lg">
									<h1 className="text-xl font-bold h-full">My courses</h1>
								</div>
							</a>
							<button onClick={handleLogout} className="m-1">
								<div className="flex items-center p-2 px-5 bg-orange-400 border-2 border-orange-400 rounded-lg">
									<h1 className="text-xl font-bold h-full">Logout</h1>
								</div>
							</button>
						</div>
					) : (
						<div className="h-full flex items-center">
							<a href="/login" className="m-1">
								<div className="flex items-center p-2 px-5 border-2 bg-teal-100 border-teal-400 rounded-lg">
									<h1 className="text-xl font-bold h-full">Login</h1>
								</div>
							</a>
							<a href="/register" className="m-1">
								<div className="flex items-center p-2 px-5 bg-orange-400 border-2 border-orange-400 rounded-lg">
									<h1 className="text-xl font-bold h-full">Register</h1>
								</div>
							</a>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
