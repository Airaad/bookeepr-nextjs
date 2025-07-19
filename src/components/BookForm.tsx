import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
import LoadingSpinner from "./icons/LoadingSpinner";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

type BookFormProps = {
  selectedBook: Book;
  notes: string;
  onChangeNotes: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rating: number;
  onChangeRating: (val: number) => void;
  loading: boolean;
  error?: string;
  onClick: () => void;
  onSave: () => void;
};

function BookForm({
  selectedBook,
  notes,
  onChangeNotes,
  rating,
  onChangeRating,
  loading,
  error,
  onClick,
  onSave,
}: BookFormProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-[95%] mx-auto space-y-3 -translate-y-10">
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
          <h2 className="text-xl font-semibold">{selectedBook?.title}</h2>
          <p className="text-gray-600">
            by {selectedBook?.author_name?.join(", ") || "Unknown Author"}
          </p>
          {selectedBook?.first_publish_year && (
            <span className="inline-block bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full my-3 -translate-x-1">
              First published: {selectedBook.first_publish_year}
            </span>
          )}
          <div className="mt-3">
            <StarRating value={rating} onChange={onChangeRating} />
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-gray-700 font-medium">Notes</label>
        <textarea
          required
          value={notes}
          onChange={onChangeNotes}
          rows={11}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Write your thoughts or notes about the book..."
        />
      </div>

      <p className="text-red-500">{error}</p>
      <div className="flex justify-between">
        <button
          disabled={loading}
          onClick={onClick}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
        >
          Back
        </button>
        <button
          disabled={loading}
          onClick={onSave}
          className={`px-4 py-2 ${
            loading ? "bg-gray-500" : "bg-emerald-600 hover:bg-emerald-500"
          }  text-white rounded-lg`}
        >
          {loading ? <LoadingSpinner /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default BookForm;
