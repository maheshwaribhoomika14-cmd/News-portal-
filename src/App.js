import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import NewsDetail from "./pages/NewsDetail";
import Dashboard from "./pages/Dashboard";
import AddNews from "./components/AddNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* CATEGORY PAGE (default) */}
        <Route path="/category" element={<Category />} />

        {/* CATEGORY BY NAME (sports, politics etc) */}
        <Route path="/category/:cat" element={<Category />} />

        {/* NEWS DETAIL PAGE */}
        <Route path="/news/:id" element={<NewsDetail />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ADD NEWS PAGE */}
        <Route path="/dashboard/add-news" element={<AddNews />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
