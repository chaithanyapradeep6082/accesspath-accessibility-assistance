import { useState } from "react";
import HomePage from "./pages/HomePage";
import ExplorerPage from "./pages/ExplorerPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      {currentPage === "home" ? (
        <HomePage onNavigate={navigateTo} />
      ) : (
        <ExplorerPage onNavigate={navigateTo} />
      )}
    </div>
  );
}

export default App;