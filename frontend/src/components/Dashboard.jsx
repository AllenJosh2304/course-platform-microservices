import { useState } from "react";
import Sidebar from "./Sidebar";
import CourseList from "./CourseList";
import AddCourse from "./AddCourse";
import { getUserRole } from "../utils/jwt";
import { logout } from "../utils/auth";

export default function Dashboard({ onLogout }) {
  const role = getUserRole();
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {role}
          </h1>

          <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 font-semibold">
            {role}
          </span>
        </div>

        {/* Add Course */}
        {(role === "ADMIN" || role === "INSTRUCTOR") && (
          <AddCourse onCourseAdded={() => setRefresh(!refresh)} />
        )}

        {/* Courses */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Available Courses
        </h2>

        <CourseList key={refresh} />
      </main>
    </div>
  );
}
