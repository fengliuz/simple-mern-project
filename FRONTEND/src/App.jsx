import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Navbar from "./components/Navbar";

const App = () => {
  const [theme,setTheme] = useState(localStorage.getItem("theme") || "sunset")
  useEffect(()=>{
    localStorage.setItem("theme",theme)
  },[theme])
  return (
    <div data-theme={`${theme}`} className="min-h-screen bg-gradient-to-b from-base-300 via-base-200 to-base-100 transition-colors duration-500">
      <Navbar onThemeChange={setTheme} currentTheme={theme}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
