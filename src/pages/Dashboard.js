import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // Add new category input

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(savedCategories);
  }, []);

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() === "") return; // Ignore empty input
    if (categories.includes(newCategory.trim())) {
      alert("Category already exists!");
      return;
    }
    const updatedCategories = [...categories, newCategory.trim()];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setNewCategory(""); // Clear input
  };

  // Optional: Delete category
  const handleDeleteCategory = (cat) => {
    const updatedCategories = categories.filter(c => c !== cat);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard Categories</h2>

      {/* Add Category */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory} style={{ marginLeft: "10px" }}>
          Add Category
        </button>
      </div>

      {categories.length === 0 && <p>No category added</p>}

      {/* List categories */}
      {categories.map((cat, index) => (
        <div key={index} style={{ marginBottom: "5px" }}>
          <Link to={`/category/${cat}`} style={{ marginRight: "10px" }}>
            {cat}
          </Link>
          <button onClick={() => handleDeleteCategory(cat)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
