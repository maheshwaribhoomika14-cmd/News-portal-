import { Link } from "react-router-dom";

function NewsCard({ item }) {
  return (
    <div className="news-card">
      <Link to={`/news/${item._id}`} className="news-title">
        {item.title}
      </Link>
      <p className="news-desc">{item.description}</p>
    </div>
  );
}

export default NewsCard;