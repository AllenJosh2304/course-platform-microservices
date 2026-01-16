import { useState } from "react";
import api from "../api/axios";

export default function AddCourse({ onCourseAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/courses", {
        title,
        description,
        price: Number(price),
      });

      setSuccess("Course added successfully");
      setTitle("");
      setDescription("");
      setPrice("");
      onCourseAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add course");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Add Course
        </button>
      </form>

      {error && <p className="text-red-600 mt-3">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}
    </div>
  );
}
