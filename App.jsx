import { useState, useEffect } from "react";
import Navbar       from "./components/Navbar";
import HomePage     from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("home");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      <main>
        {page === "home"     && <HomePage     setPage={setPage} />}
        {page === "projects" && <ProjectsPage setPage={setPage} />}
      </main>
    </>
  );
}
