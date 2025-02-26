import React, { useState, useEffect } from "react";
import { currencyRates } from "../data/currencyRates";

export default function Cards({ courses }) {
  const [selectedTag, setSelectedTag] = useState("All");
  const tags = ["All", ...new Set(courses.flatMap((course) => course.tags))];

  const filteredCourses =
    selectedTag === "All"
      ? courses
      : courses.filter((course) => course.tags.includes(selectedTag));

  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {

    const savedCurrency = localStorage.getItem("currency") || "USD";
    setCurrency(savedCurrency);

    const handleCurrencyChanged = () => {
      const newCurrency = localStorage.getItem("currency") || "USD";
      setCurrency(newCurrency);
    };

    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("LoggedUser"));
      setLoggedUser(user);
    };

    updateUser();
    window.addEventListener("userLoggedOut", updateUser);
    return () => {
      window.removeEventListener("currencyChanged", handleCurrencyChanged);
      window.removeEventListener("userLoggedOut", updateUser);
    };
  }, []);

  const convertPrice = (price) => {
    const rate = currencyRates[currency] || 1;
    return (price * rate).toFixed(2);
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

  const handleBuyCourse = (courseId) => {
    if (!loggedUser) return;

    const updatedUser = {
      ...loggedUser,
      boughtCourses: [...loggedUser.boughtCourses, courseId],
    };

    localStorage.setItem("LoggedUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.username.toLowerCase() === loggedUser.username.toLowerCase()
        ? updatedUser
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setLoggedUser(updatedUser);
    setSelectedCourse(null);

    alert("Course purchased successfully!");
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-end mb-4">
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="p-2 border rounded bg-white shadow"
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => {
          const isBought = loggedUser?.boughtCourses.includes(course.id);
          const likes = updatedLikes[course.id] || course.likes;

          return (
            <a
              key={course.id}
              href={`/course/${course.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition p-4 block"
            >
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-gray-600 text-sm">
                  {course.description.slice(0, 100)}...
                </p>
                <p className="text-orange-500 font-bold mt-2">
                {currency} {convertPrice(course.price)}
                </p>
                <p className="text-teal-500 text-sm mt-1">
                  {likes} Likes
                </p>
                <div className="mt-4">
                  {loggedUser ? (
                    isBought ? (
                      <span className="block text-center bg-blue-500 text-white p-2 rounded">
                        View Course
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedCourse(course);
                        }}
                        className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-600"
                      >
                        Buy Course
                      </button>
                    )
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = "/login";
                      }}
                      className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-600"
                    >
                      Buy Course
                    </button>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 flex bg-black/50 items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold">Confirm Purchase</h2>
            <p>
              Are you sure you want to buy{" "}
              <strong>{selectedCourse.title}</strong> for ${selectedCourse.price}?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedCourse(null)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleBuyCourse(selectedCourse.id)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
