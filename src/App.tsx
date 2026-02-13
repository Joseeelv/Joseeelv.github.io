import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Blog from "./pages/blog/page";
import CodeBlogPost from "./pages/blog/code/page";
import LinkVortexBlogPost from "./pages/blog/linkVortex/page";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/code" element={<CodeBlogPost />} />
        <Route path="/blog/linkVortex" element={<LinkVortexBlogPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
