import React, { useState } from "react";

function SearchBar({ setCity, fetchWeather }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input) {
      setCity(input);
      fetchWeather(input);
    }
  };

  return (
    <div className="d-flex gap-2">
      <input
        className="form-control"
        placeholder="Enter city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="btn btn-warning" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;