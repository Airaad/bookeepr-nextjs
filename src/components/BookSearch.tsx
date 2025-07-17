"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./icons/LoadingSpinner";
import Search from "./icons/Search";
import SearchInputBox from "./SearchInputBox";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_sentence?: string[];
}

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const searchBooks = async (searchTerm: string): Promise<void> => {
    if (!searchTerm) return setResults([]);
    setLoading(true);

    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchTerm
        )}`
      );
      setResults(res.data.docs.slice(0, 10));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => searchBooks(query), 700);

    return () => {
      clearTimeout(debounceSearch);
    };
  }, [query]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SearchInputBox
        size="xl"
        placeholder="Search book by title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <div className="mt-4 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="mt-4 flex justify-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {results.map((book) => (
          <div
            key={book.key}
            className="flex gap-4 p-4 border border-gray-200 rounded-xl shadow-sm"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "/images/no_cover_image.png"
              }
              alt={book.title}
              className="w-24 h-36 object-cover rounded"
            />
            <div>
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">
                by {book.author_name?.join(", ") || "Unknown Author"}
              </p>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {book.first_sentence?.join(" ") || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
