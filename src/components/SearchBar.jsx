import React from "react";
export default function SearchBar({
  query,
  onQueryChange,
  
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="input-row">
        <input
          aria-label="Search book title"
          placeholder="Enter book title — e.g. The Hobbit"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        
        <button type="submit">Search</button>
      </div>
     
    </form>
  );
}
