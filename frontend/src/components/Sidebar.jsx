import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Sidebar({ onLogout }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => {
        // silently fail, sidebar shouldn't break app
      });
  }, []);

  return (
    <aside className="w-64 bg-white shadow min-h-screen p-6 flex flex-col">
      {/* App title */}
      <h2 className="text-xl font-semibold text-indigo-600 mb-6">
        Course Platform
      </h2>

      {/* Static section */}
      <div className="mb-4 font-medium text-gray-700">
        All Courses
      </div>

      {/* Dynamic course list */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="text-sm text-gray-600 hover:text-indigo-600 cursor-pointer truncate"
            title={course.title}
          >
            {course.title}
          </div>
        ))}

        {courses.length === 0 && (
          <p className="text-sm text-gray-400">No courses found</p>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-6 text-red-600 font-medium hover:underline"
      >
        Logout
      </button>
    </aside>
  );
}
