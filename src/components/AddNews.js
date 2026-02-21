import React, { useState } from "react";
import axios from "axios";

const AddNews = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!title || !description || !category) {
      alert("Please fill all fields!");
      return;
    }

    const newsData = { title, description, category };

    try {
      const response = await axios.post("http://localhost:5000/api/news", newsData);
      console.log("Inserted News:", response.data);
      alert("News Added Successfully!");

      // Clear form after submission
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error("Error inserting news:", err);
      alert("Failed to add news!");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Add News</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Add News</button>
      </form>
    </div>
  );
};

export default AddNews;
