"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import EllipsesIcon from "./icons/EllipsesIcon";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./icons/LoadingSpinner";

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

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setOpen(false);
    try {
      const res = await axios.delete(`/api/delete-book/${book.id}`);
      if (res.status === 201) {
        router.push("/my-books-page");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="bg-[#FAF7F0] min-h-screen flex justify-center items-center">
        <h1 className="text-2xl text-red-500">Deleting in progress...</h1>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="py-6 px-5 md:px-10 bg-[#FAF7F0]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 items-cetner mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2B3838] ">
            {book.title}
          </h1>
          <span className="text-gray-600 text-medium text-sm sm:translate-y-[13px]">
            ({format(book.createdAt, "d MMMM, yyyy")})
          </span>
        </div>

        <div className="relative inline-block">
          <button
            disabled={loading}
            onClick={() => setOpen(!open)}
            className="rounded hover:bg-gray-200"
          >
            <EllipsesIcon />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button
                onClick={() => router.push(`/update-book-page/${book.id}`)}
                className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-cetner gap-2">
                  <span className="text-lg">Edit</span>
                  <EditIcon />
                </div>
              </button>
              <div className="bg-gray-300 w-[full] h-[1px]" />
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100"
              >
                <div className="flex items-cetner gap-2">
                  <span className="text-lg">Delete</span>
                  <DeleteIcon />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mb-4">
        <p className="text-sm text-gray-600">
          By <span className="font-medium">{book.author}</span> · Published in{" "}
          {book.year ? (
            <span className="font-medium">{book.year}</span>
          ) : (
            <span className="font-medium">NaN</span>
          )}
        </p>
        <div className=" text-yellow-500 text-2xl -translate-y-0.5">
          {"★".repeat(book.rating) + "☆".repeat(5 - book.rating)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-shrink-0">
          <Image
            src={
              book.coverId
                ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
                : "/images/no_cover_image.png"
            }
            alt={book.title}
            className="rounded-lg object-cover"
            width={200}
            height={200}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="w-[2px] h-min-screen bg-gray-300" />
        <div className="flex-1">
          <div className="text-[#2B3838] whitespace-pre-line">
            {book.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
