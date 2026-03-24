import React, { useState } from "react";

function SearchBar({ setCity, fetchWeather }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const q = input.trim();
    if (q) {
      setCity(q);
      fetchWeather(q);
      setInput("");
    }
  };

  return (
    <div className="search-wrap">
      <div className="search-inner">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          placeholder="Search for a city…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;