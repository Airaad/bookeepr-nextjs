"use client";
import Image from "next/image";
import React, { useState } from "react";
import StarRating from "./StarRating";
import LoadingSpinner from "./icons/LoadingSpinner";
import { useRouter } from "next/navigation";
import axios from "axios";

type Book = {
  id: string;
  bookKey: string;
  title: string;
  author: string | null;
  content: string;
  coverId: number | null;
  year: number | null;
  rating: number;
  createdAt: Date;
  userId: string;
};

interface UpdateFormProps {
  book: Book;
}

function UpdateForm({ book }: UpdateFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(book.rating);
  const [notes, setNotes] = useState(book.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/update-book/${book.id}`, {
        content: notes,
        rating,
      });
      if (res.status === 201) {
        router.push(`/book-detail/${book.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-[95%] mx-auto space-y-3">
      <div className="flex gap-4 items-start">
        <Image
          src={
            book?.coverId
              ? `https://covers.openlibrary.org/b/id/${book?.coverId}-M.jpg`
              : "/images/no_cover_image.png"
          }
          alt={book?.title}
          className="rounded-md"
          width={96}
          height={144}
        />
        <div>
          <h2 className="text-xl font-semibold">{book?.title}</h2>
          <p className="text-gray-600">by {book?.author}</p>
          {book?.year && (
            <span className="inline-block bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full my-3 -translate-x-1">
              First published: {book.year}
            </span>
          )}
          <div className="mt-3">
            <StarRating value={rating} onChange={(val) => setRating(val)} />
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-gray-700 font-medium">Notes</label>
        <textarea
          required
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={11}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Write your thoughts or notes about the book..."
        />
      </div>

      <p className="text-red-500">{error}</p>
      <div className="flex justify-between">
        <button
          disabled={loading}
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleUpdate}
          className={`px-4 py-2 ${
            loading ? "bg-gray-500" : "bg-emerald-600 hover:bg-emerald-500"
          }  text-white rounded-lg`}
        >
          {loading ? <LoadingSpinner /> : "Update"}
        </button>
      </div>
    </div>
  );
}

export default UpdateForm;
