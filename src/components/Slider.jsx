import React from "react";
import { useState } from "react";

export default function Slider({ courses }) {
	const topCourses = [...courses]
		.sort((a, b) => b.likes - a.likes)
		.slice(0, 5);

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev === 0 ? topCourses.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev === topCourses.length - 1 ? 0 : prev + 1));
	};

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
								<p className="text-orange-500 font-bold mt-2">${course.price}</p>
								<p className="text-teal-500 mt-1">{course.likes} Likes</p>
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