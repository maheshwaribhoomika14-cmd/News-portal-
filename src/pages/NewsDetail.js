import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/${id}`)
      .then((res) => setNews(res.data));
  }, [id]);

  if (!news) return null;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{news.title}</h1>
      <p>{news.description}</p>
    </div>
  );
}

export default NewsDetail;