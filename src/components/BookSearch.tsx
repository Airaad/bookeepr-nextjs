"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./icons/LoadingSpinner";
import SearchInputBox from "./SearchInputBox";
import SelectedIcon from "./icons/SelectedIcon";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export default function BookSearch({ session }: { session: Session }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [step, setStep] = useState<"search" | "form">("search");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleSave = async () => {
    if (!selectedBook || notes === "") return;
    setLoading(true);
    try {
      const res = await axios.post("/api/add-book", {
        bookKey: selectedBook?.key,
        coverId: selectedBook.cover_i ?? null,
        title: selectedBook?.title,
        author: selectedBook?.author_name?.join(", ") ?? "Unknown Author",
        content: notes,
        rating: rating,
        year: selectedBook.first_publish_year ?? null,
        userId: session?.user?.id,
      });
      if (res.status === 201) {
        router.push("/my-books-page");
      }
    } catch (error) {
      setError(error);
    } finally {
      setSelectedBook(null);
      setNotes("");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* search step */}
      {step === "search" && (
        <>
          <div className="flex justify-center">
            <SearchInputBox
              size="lg"
              placeholder="Search book by title / author / isbn"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {loading && (
            <div className="mt-4 flex justify-center">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="mt-4 flex justify-center">
              <p className="text-red-500 text-lg">
                {error instanceof Error ? error.message : String(error)}
              </p>
            </div>
          )}

          <div className="mt-6">
            <div className="max-h-[500px] overflow-y-auto space-y-4">
              {results.map((book) => (
                <div
                  key={book.key}
                  className="flex gap-4 p-4 border bg-white border-gray-200 rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:bg-gray-300"
                  onClick={() => {
                    setSelectedBook(book);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  <Image
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "/images/no_cover_image.png"
                    }
                    alt={book.title}
                    className="object-cover rounded"
                    width={96}
                    height={144}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p className="text-gray-600">
                      by {book.author_name?.join(", ") || "Unknown Author"}
                    </p>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      Year: {book.first_publish_year || "Not available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Selected Book */}
          {selectedBook && (
            <div className="relative bg-[#1e2d2f] bg-opacity-70 backdrop-blur-md p-4 my-6 max-w-xl mx-auto rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-500">
              <div className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
                <SelectedIcon />
                Selected
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Image
                  src={
                    selectedBook?.cover_i
                      ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg`
                      : "/images/no_cover_image.png"
                  }
                  alt={selectedBook?.title}
                  className="rounded-lg object-cover shadow-md"
                  width={128}
                  height={192}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
                />
                <div className="text-white flex-1 space-y-3">
                  <h3 className="text-2xl font-bold">{selectedBook?.title}</h3>
                  <p className="text-gray-300 text-base">
                    by{" "}
                    <span className="font-medium text-white">
                      {selectedBook?.author_name?.join(", ")}
                    </span>
                  </p>
                  {selectedBook?.first_publish_year && (
                    <span className="inline-block bg-[#3a4c4c] text-gray-200 text-xs px-3 py-1 rounded-full">
                      First published: {selectedBook.first_publish_year}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {selectedBook ? (
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => {
                  setQuery("");
                  setResults([]);
                  setSelectedBook(null);
                }}
                className="w-28 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl shadow transition-all duration-200"
              >
                Refresh
              </button>

              <button
                onClick={() => setStep("form")}
                disabled={selectedBook === null}
                className={`w-28 flex items-center justify-center gap-2 px-4 py-2 bg-green-700 hover:bg-emerald-600 text-white rounded-xl shadow transition-all duration-200`}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="text-center mt-10">
              <span className="text-gray-700 text-xl">
                Start by selecting a book to add it to your collection
              </span>
            </div>
          )}
        </>
      )}

      {/* form step */}
      {step === "form" && (
        <>
          {selectedBook && (
            <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto space-y-6 mt-4">
              <div className="flex gap-4 items-start">
                <Image
                  src={
                    selectedBook?.cover_i
                      ? `https://covers.openlibrary.org/b/id/${selectedBook?.cover_i}-M.jpg`
                      : "/images/no_cover_image.png"
                  }
                  alt={selectedBook?.title}
                  className="rounded-md"
                  width={96}
                  height={144}
                />
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedBook?.title}
                  </h2>
                  <p className="text-gray-600">
                    by{" "}
                    {selectedBook?.author_name?.join(", ") || "Unknown Author"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Write your thoughts or notes about the book..."
                />
              </div>
              <StarRating value={rating} onChange={(val) => setRating(val)} />
              <div className="flex justify-between">
                <button
                  disabled={loading}
                  onClick={() => setStep("search")}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  onClick={handleSave}
                  className={`px-4 py-2 ${
                    loading
                      ? "bg-gray-500"
                      : "bg-emerald-600 hover:bg-emerald-500"
                  }  text-white rounded-lg`}
                >
                  {loading ? <LoadingSpinner /> : "Save"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
