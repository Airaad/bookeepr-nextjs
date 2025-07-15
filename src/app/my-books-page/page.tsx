import Navbar from "@/components/Navbar";
import UserBooksGrid from "@/components/UserBooksGrid";

const books = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-1847941831-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-07-10T12:00:00Z",
  },
  {
    id: "3",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-9389931525-M.jpg?default=false",
    rating: 4,
    createdAt: "2025-05-18T14:45:00Z",
  },
  {
    id: "4",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780857501004-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-04-10T08:00:00Z",
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780140620306-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-02-27T16:20:00Z",
  },
  {
    id: "6",
    title: "The Book Thief",
    author: "Markus Zusak",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780375842207-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-02-05T11:15:00Z",
  },
  {
    id: "7",
    title: "Their Eyes Were Watching God",
    author: "Zora Neale Hurston",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780061120060-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-01-25T10:00:00Z",
  },
  {
    id: "8",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780439023481-M.jpg?default=false",
    rating: 4,
    createdAt: "2024-12-15T09:00:00Z",
  },
  {
    id: "9",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780141199078-M.jpg?default=false",
    rating: 5,
    createdAt: "2024-11-10T13:30:00Z",
  },
  {
    id: "10",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780099590088-M.jpg?default=false",
    rating: 5,
    createdAt: "2024-10-01T07:45:00Z",
  },
  {
    id: "11",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-0062641540-M.jpg?default=false",
    rating: 4,
    createdAt: "2024-09-15T18:30:00Z",
  },
  {
    id: "12",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9781571313560-M.jpg?default=false",
    rating: 5,
    createdAt: "2024-08-20T12:15:00Z",
  },
  {
    id: "13",
    title: "Dork Diaries: Tales from a Not-So-Fabulous Life",
    author: "Rachel Renée Russell",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780061995632-M.jpg?default=false",
    rating: 4,
    createdAt: "2024-07-30T09:00:00Z",
  },
  {
    id: "14",
    title: "How to Be Popular",
    author: "Meg Cabot",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/0060880120-M.jpg?default=false",
    rating: 3,
    createdAt: "2024-06-25T14:00:00Z",
  },
  {
    id: "15",
    title: "1001 Books You Must Read Before You Die",
    author: "Peter Boxall",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9781844034178-M.jpg?default=false",
    rating: 5,
    createdAt: "2024-05-05T08:45:00Z",
  },
  {
    id: "16",
    title: "The Emperor of Gladness",
    author: "Ocean Vuong",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-0593831878-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-05-13T00:00:00Z",
  },
  {
    id: "17",
    title: "Atmosphere",
    author: "Taylor Jenkins Reid",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-0593158715-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-06-03T00:00:00Z",
  },
  {
    id: "20",
    title: "Katabasis",
    author: "R. F. Kuang",
    imageUrl: "/images/no_cover_image.png",
    rating: 5,
    createdAt: "2025-08-26T00:00:00Z",
  },
  {
    id: "21",
    title: "Audition",
    author: "Katie Kitamura",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-0593852323-M.jpg?default=false",
    rating: 4,
    createdAt: "2025-04-08T00:00:00Z",
  },
  {
    id: "24",
    title: "Death Takes Me",
    author: "Cristina Rivera Garza",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-0143450832-M.jpg?default=false",
    rating: 4,
    createdAt: "2025-02-25T00:00:00Z",
  },
  {
    id: "25",
    title: "Heart Lamp: Selected Stories",
    author: "Banu Mushtaq",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/978-1916751163-M.jpg?default=false",
    rating: 5,
    createdAt: "2025-02-18T00:00:00Z",
  },
  {
    id: "26",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780142437230-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "27",
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780141439600-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    id: "28",
    title: "The Lord of the Rings",
    author: "J. R. R. Tolkien",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780544003415-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-03-01T00:00:00Z",
  },
  {
    id: "29",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-04-01T00:00:00Z",
  },
  {
    id: "30",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J. K. Rowling",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780747532699-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-05-01T00:00:00Z",
  },
  {
    id: "31",
    title: "And Then There Were None",
    author: "Agatha Christie",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780062073488-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-06-01T00:00:00Z",
  },
  {
    id: "32",
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg?default=false",
    rating: 5,
    createdAt: "2023-07-01T00:00:00Z",
  },
  {
    id: "33",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780307474278-M.jpg?default=false",
    rating: 4,
    createdAt: "2023-08-01T00:00:00Z",
  },
  {
    id: "34",
    title: "She: A History of Adventure",
    author: "H. Rider Haggard",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780544141515-M.jpg?default=false",
    rating: 4,
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "35",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    imageUrl:
      "https://covers.openlibrary.org/b/isbn/9780671027032-M.jpg?default=false",
    rating: 4,
    createdAt: "2023-10-01T00:00:00Z",
  },
];

export default function MyBooksPage() {
  return (
    <div className="bg-[#faf7f0] min-h-screen py-20">
      <Navbar />
      <UserBooksGrid books={books} />
    </div>
  );
}
