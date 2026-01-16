import { useEffect, useState } from "react";
import api from "../api/axios";
import { getUserRole } from "../utils/jwt";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState({});
  const role = getUserRole();

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  const handlePurchase = (courseId) => {
    setPurchased((prev) => ({ ...prev, [courseId]: true }));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              {course.description}
            </p>
            <p className="text-indigo-600 font-semibold mt-4">
              ₹{course.price}
            </p>
          </div>

          {/* Purchase button only for STUDENT */}
          {role === "STUDENT" && (
            <button
              onClick={() => handlePurchase(course.id)}
              disabled={purchased[course.id]}
              className={`mt-4 py-2 rounded-lg transition ${
                purchased[course.id]
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {purchased[course.id] ? "Purchased" : "Purchase"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
