import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";

function Category() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [news, setNews] = useState([]);
  const [newCat, setNewCat] = useState("");

  // ✅ Fetch categories from backend
  const fetchCategories = useCallback(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        const catNames = res.data.map((c) => c.name);
        setCategories(catNames);
        if (catNames.length > 0 && !activeCategory) {
          setActiveCategory(catNames[0]); // default category
        }
      })
      .catch((err) => console.log("Error fetching categories:", err));
  }, [activeCategory]);

  // Call fetchCategories once on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch news whenever activeCategory changes
  useEffect(() => {
    if (!activeCategory) return;

    axios
      .get(`http://localhost:5000/api/category/${activeCategory}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.log("Error fetching news:", err));
  }, [activeCategory]);

  // Add new category
  const addCategory = () => {
    if (!newCat) return;

    axios
      .post("http://localhost:5000/api/categories", { name: newCat })
      .then((res) => {
        setCategories([...categories, res.data.name]);
        setNewCat(""); // clear input
      })
      .catch((err) => console.log("Error adding category:", err));
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* LEFT SIDE – CATEGORY LIST */}
      <div style={{ width: "25%" }}>
        <Sidebar />

        <h3>Categories</h3>
        {categories.length === 0 && <p>No categories found</p>}
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: activeCategory === cat ? "#eee" : "",
              fontWeight: activeCategory === cat ? "bold" : "normal",
            }}
          >
            👉 {cat}
          </div>
        ))}

        {/* Add new category */}
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="New Category"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            style={{ padding: "5px", width: "70%" }}
          />
          <button
            onClick={addCategory}
            style={{ padding: "5px 10px", marginLeft: "5px" }}
          >
            Add
          </button>
        </div>
      </div>

      {/* RIGHT SIDE – NEWS LIST */}
      <div style={{ width: "75%" }}>
        <h2>{activeCategory}</h2>

        {news.length === 0 ? (
          <p>No news found</p>
        ) : (
          news.map((item) => <NewsCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
}

export default Category;
