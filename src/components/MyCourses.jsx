import React, { useState, useEffect } from "react";
import courses from "../data/courses.ts";

export default function MyCourses() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("LoggedUser"));
    setLoggedUser(user);

    if (user && user.boughtCourses) {
      const filtered = courses.filter((course) =>
        user.boughtCourses.includes(course.id)
      );
      setMyCourses(filtered);
    }
  }, []);

  if (!loggedUser) {
    return (
      <div className="p-4">
        <p>Please log in to see your courses.</p>
      </div>
    );
  }

  if (loggedUser && myCourses.length === 0) {
    return (
      <div className="p-4">
        <p>You have not purchased any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {myCourses.map((course) => (
          <a
            key={course.id}
            href={`/course/${course.id}`}
            className="bg-white rounded-lg shadow-md p-4 block hover:shadow-xl transition"
          >
            <img
              src={course.image_url}
              alt={course.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{course.title}</h2>
            <p className="text-gray-600 text-sm">
              {course.description.slice(0, 100)}...
            </p>
            <p className="text-orange-500 font-bold mt-2">${course.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
}