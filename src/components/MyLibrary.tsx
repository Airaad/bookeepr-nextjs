"use client";

import { useState } from "react";
import { Search, Star, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";
import FilterSvg from "./icons/FilterSvg";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import Link from "next/link";
import AddIcon from "./icons/AddIcon";

interface Book {
  rating: number;
  title: string;
  year: number | null;
  id: string;
  content: string;
  bookKey: string;
  coverId: number | null;
  author: string | null;
  userId: string;
  createdAt: Date;
}

interface MyLibraryProps {
  books: Book[];
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">({rating}/5)</span>
    </div>
  );
};

const BookCard = ({ book }: { book: Book }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCoverImage = (coverId: number | null) => {
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    }

    return "/images/no_cover_image.png";
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <Image
          src={getCoverImage(book.coverId)}
          alt={book.title}
          className="w-full h-64 object-contain py-3 group-hover:scale-105 transition-transform duration-300"
          width={160}
          height={256}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+vx1PQAIqAM4jZDFJQAAAABJRU5ErkJggg=="
        />
        <Link href={`/book-detail/${book.id}`}>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
            <BookOpen className="w-5 h-5 text-green-700" />
          </div>
        </Link>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-1 group-hover:text-green-700 transition-colors">
            {book.title}
          </h3>
          <p className="text-green-700 font-medium text-sm">
            by {book.author || "Unknown Author"}
          </p>
        </div>

        <div className="space-y-3">
          <StarRating rating={book.rating} />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Published {book.year || "Unknown"}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Added on {formatDate(book.createdAt.toISOString())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowLeft />
      </button>

      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number" ? onPageChange(page) : undefined
            }
            disabled={page === "..."}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              page === currentPage
                ? "bg-green-700 text-white"
                : page === "..."
                ? "text-gray-400 cursor-default"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default function MyLibrary({ books }: MyLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"createdAt" | "rating" | "title">(
    "createdAt"
  );
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const filteredAndSortedBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author &&
          book.author.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRating = filterRating ? book.rating === filterRating : true;
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredAndSortedBooks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as any);
    setCurrentPage(1);
  };

  const handleRatingFilterChange = (value: string) => {
    setFilterRating(value ? Number(value) : null);
    setCurrentPage(1);
  };
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf7f0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-5 items-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My Library
            </h1>
            <Link href={"/add-book-page"}>
              <button className="flex items-center p-1 bg-green-700 hover:bg-green-600 text-white rounded-full h-8 w-8">
                <AddIcon />
              </button>
            </Link>
          </div>
          <p className="text-gray-600 text-lg">
            Your personal collection of {books.length} book
            {books.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <FilterSvg />
              <div className="border border-gray-200 pr-2 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="pl-1 pr-2 py-2"
                >
                  <option value="createdAt">Recently Added</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">
                Min Rating:
              </span>
              <div className="border border-gray-200 pr-2 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-colors">
                <select
                  value={filterRating || ""}
                  onChange={(e) => handleRatingFilterChange(e.target.value)}
                  className="pl-1 pr-2 py-2"
                >
                  <option value="">All</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedBooks.length)} of{" "}
            {filteredAndSortedBooks.length} book
            {filteredAndSortedBooks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Books Grid */}
        {currentBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No books found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterRating
                ? "Try adjusting your search or filters"
                : "Start building your library by adding your first book!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
