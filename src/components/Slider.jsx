import React from "react";
import { useState, useEffect } from "react";
import { currencyRates } from "../data/currencyRates"

export default function Slider({ courses }) {
	const topCourses = [...courses]
		.sort((a, b) => b.likes - a.likes)
		.slice(0, 5);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currency, setCurrency] = useState("USD");

	useEffect(() => {
		const savedCurrency = localStorage.getItem("currency") || "USD";
		setCurrency(savedCurrency);
	}, []);

	const convertPrice = (price) => {
		const rate = currencyRates[currency] || 1;
		return (price * rate).toFixed(2);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev === 0 ? topCourses.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev === topCourses.length - 1 ? 0 : prev + 1));
	};

	const [updatedLikes, setUpdatedLikes] = useState({});
	useEffect(() => {
		const fetchLikes = async () => {
			const newLikes = {};
			for (const course of courses) {
				try {
					const id = course.id - 1;
					const res = await fetch(
						`https://dialup-8ed75-default-rtdb.europe-west1.firebasedatabase.app/${id}/likes.json`
					);
					if (res.ok) {
						const data = await res.json();
						newLikes[course.id] = data || 0;
					}
				} catch (error) {
					console.error("Error fetching likes:", error);
				}
			}
			setUpdatedLikes(newLikes);
		};

		fetchLikes();
	}, [courses]);

	return (
		<div className="relative w-full max-w-4xl mx-auto overflow-hidden">
			<div
				className="flex transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{topCourses.map((course) => (
					<div key={course.id} className="min-w-full flex-shrink-0 p-4">
						<a href={`course/${course.id}`}>
							<div className="bg-white rounded-lg shadow-lg p-4">
								<img
									src={course.image_url}
									alt={course.title}
									className="w-full h-40 object-contain rounded"
								/>
								<h2 className="text-xl font-bold mt-2">{course.title}</h2>
								<p className="text-gray-600">{course.description}...</p>
								<p className="text-orange-500 font-bold mt-2">
									{currency} {convertPrice(course.price)}
								</p>
								<p className="text-teal-500 mt-1">{updatedLikes[course.id] ?? course.likes} Likes</p>
							</div>
						</a>
					</div>
				))}
			</div>
			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
			>
				&#9664;
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
			>
				&#9654;
			</button>
		</div>
	);
}