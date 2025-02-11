import React, { useState, useEffect } from "react";

export default function VideoPlayer({ course }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("LoggedUser"));
      setLoggedUser(user);
    };

    updateUser();
    window.addEventListener("userLoggedOut", updateUser);
    return () => {
      window.removeEventListener("userLoggedOut", updateUser);
    };
  }, []);

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

  const isBought = loggedUser?.boughtCourses.includes(course.id);

  return (
    <div className="text-center mt-4">
      {isBought ? (
        <>
          <button
            onClick={() => setShowVideo(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Show Content
          </button>

          {showVideo && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-2">{course.title}</h2>
                <iframe width="560" height="315" src={course.video_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setShowVideo(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : loggedUser ? (
        <>
          <button
            onClick={() => setSelectedCourse(course)}
            className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600"
          >
            Buy Course
          </button>

          {selectedCourse && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold">Confirm Purchase</h2>
                <p>
                  Are you sure you want to buy <strong>{selectedCourse.title}</strong> for $
                  {selectedCourse.price}?
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
        </>
      ) : (
        <a
          href="/login"
          className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600"
        >
          Buy Course
        </a>
      )}
    </div>
  );
}