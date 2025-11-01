import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { fetchBooks } from "../util/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const controllerRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 450);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setBooks([]);
      setNumFound(0);
      setError(null);
      return;
    }
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    async function loadBooks() {
      setLoading(true);
      try {
        const data = await fetchBooks({
          title: debouncedQuery,
          author,
          page,
          signal,
        });
        setBooks(data.docs || []);
        setNumFound(data.numFound || 0);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();

    return () => controllerRef.current && controllerRef.current.abort();
  }, [debouncedQuery, author, page]);

  return (
    <main className="home">
      <h1>BookFinder </h1>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        author={author}
        onAuthorChange={setAuthor}
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setDebouncedQuery(query.trim());
        }}
      />

     {loading && (
        <div className="loader-container">
          <div className="loader"></div>
         
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {!loading && !error && books.length === 0 && debouncedQuery && (
        <p className="noresult">No results found.</p>
      )}

      <ul className="book-list">
        {books.map((b) => (
          <BookCard key={b.key} book={b} />
        ))}
      </ul>

      {books.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            ← Prev
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((p) => p + 1)}>Next →</button>
        </div>
      )}
    </main>
  );
}
