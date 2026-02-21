import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";  // CSS import

function Home() {
  const [news, setNews] = useState([]);
  const [sortOption, setSortOption] = useState("date"); // default: latest first

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news") // backend fetch
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Sort news based on selected option
  const sortedNews = [...news].sort((a, b) => {
    if (sortOption === "date") {
      // latest news first
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "title") {
      // alphabetical order
      return a.title.localeCompare(b.title);
    } else {
      return 0;
    }
  });

  return (
    <div>
      <h1>Latest News</h1>

      {/* 🔹 Sorting dropdown */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="sort">Sort By: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date">Latest First</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {/* 🔹 Render sorted news */}
      {sortedNews.map((item) => (
        <div key={item._id} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <small>Category: {item.category}</small>
        </div>
      ))}
    </div>
  );
}

export default Home;
