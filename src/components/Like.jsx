import React, { useState, useEffect } from "react";

function Like({ course }) {
    const [likes, setLikes] = useState(course.likes);
    const id = course.id - 1;

    const updateLikes = async () => {
        try {
            const newLikes = likes + 1;
            console.log(newLikes);
            await fetch(
                `https://dialup-8ed75-default-rtdb.europe-west1.firebasedatabase.app/${id}/likes.json`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newLikes),
                }
            );
            setLikes(newLikes);
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    return (
        <button
            onClick={updateLikes}
            className="px-4 py-2 bg-teal-400 text-black font-bold rounded-3xl hover:bg-teal-600"
        >
            👍 Like ({likes})
        </button>
    );
}

export default Like;