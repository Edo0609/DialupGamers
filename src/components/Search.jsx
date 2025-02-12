import React, { useState } from "react";
import searchbtn from "../assets/search.png";
import closebtn from "../assets/close.png";

export default function Search({ courses }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 text-white rounded hover:bg-teal-100"
            >
                <img src={searchbtn.src} alt="search" className="h-8" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <button
                            onClick={() => setIsOpen(false)}
                            className=" text-gray-600 hover:bg-gray-100 relative left-80"
                        >
                            <img src={closebtn.src} alt="close" className="h-5" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search for a course..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                        <ul className="mt-4">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <li key={course.id} className="p-2 border-b">
                                        <a
                                            href={`/course/${course.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {course.title}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 p-2">No courses found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}