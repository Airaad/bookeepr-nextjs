"use client";
import { FC, useState, useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import SearchInputBox from "./SearchInputBox";
import AddIcon from "./icons/AddIcon";
import Link from "next/link";
import Image from "next/image";

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

interface UserBooksGridProps {
  books: Book[];
}

const ITEMS_PER_PAGE = 12;

const UserBooksGrid: FC<UserBooksGridProps> = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, books]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#faf7f0] px-4 py-3 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-medium mb-4 text-gray-800 text-center">
        My Library
      </h2>
      <div className="flex items-center justify-center gap-2 my-6">
        <SearchInputBox
          size="md"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Link href={"/add-book-page"}>
          <button className="flex justify-between items-center bg-green-700 hover:bg-green-600 text-white rounded-full px-3 py-2 h-10 w-10">
            <AddIcon />
          </button>
        </Link>
      </div>
      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-[#2B3838] rounded-xl shadow hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
              >
                <Link href={`/book-detail/${book.id}`}>
                  <div className="">
                    <Image
                      src={
                        book.coverId
                          ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
                          : "/images/no_cover_image.png"
                      }
                      alt={book.title}
                      className="object-contain p-3 mx-auto"
                      width={160}
                      height={192}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
                    />
                    <div className="p-4 flex flex-col justify-between space-y-1">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-300 my-2">
                          by {book.author}
                        </p>
                        {book?.year && (
                          <span className="inline-block bg-gray-700 text-gray-200 text-xs px-3 py-1 my-2 rounded-full -translate-x-1">
                            Year: {book.year}
                          </span>
                        )}
                        <div className="flex items-center space-x-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < book.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.785.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300">
                        {formatDistanceToNow(new Date(book.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 disabled:opacity-50 cursor-pointer"
            >
              <ArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 disabled:opacity-50 cursor-pointer"
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserBooksGrid;
