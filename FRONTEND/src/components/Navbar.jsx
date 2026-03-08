import { PaletteIcon, PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function Navbar({ onThemeChange, currentTheme }) {
  const THEMES = [
    "sunset",
    "synthwave",
    "halloween",
    "forest",
    "light",
    "dark",
    "coffee"
  ];
  return (
    <header className=" bg-base-300 border-b border-base-content/10 transition-colors duration-500">
      <div className=" mx-auto max-w-6xl p-4 flex justify-between">
        <h1 className=" font-bold text-3xl text-primary font-mono tracking-tight">
          ThinkBoard
        </h1>
        <div className="flex items-center gap-4 justify-around">
          <Link to={"/create"} className=" btn btn-primary btn-soft">
            <PlusIcon className="size-5" />
            <span>New note</span>
          </Link>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Themes: {currentTheme} <PaletteIcon />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {THEMES.map((t) => (
                <li key={t}>
                  <button className={`btn btn-soft border-olive-950 btn-primary ${currentTheme === t?"active":""}`} onClick={()=>onThemeChange(t)}>{t}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
