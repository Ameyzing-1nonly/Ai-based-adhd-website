import { useState } from "react";

const booksData = [
  {
    id: 1,
    title: "Driven to Distraction",
    author: "Edward M. Hallowell and John J. Ratey",
    description: "Groundbreaking work on ADHD...",
    link: "https://books.google.com.np/books?id=VVhASraP67IC&printsec=frontcover&source=gbs_ge_summary_r&cad=0#v=onepage&q&f=false",
    image:
      "https://i.pinimg.com/564x/41/52/56/415256f03fd5c0dc32c7025674e208f5.jpg",
  },
  {
    id: 2,
    title: "Taking Charge of Adult ADHD",
    author: "Russell A. Barkley",
    description: "Practical strategies for adults with ADHD...",
    link: "https://books.google.com.np/books/about/Taking_Charge_of_Adult_ADHD.html?id=ed5CEAAAQBAJ&redir_esc=y",
    image: "https://m.media-amazon.com/images/I/51M0XYYVmML.jpg",
  },
  {
    id: 3,
    title: "The ADHD Effect on Marriage",
    author: "Melissa Orlov",
    description: "Understand and rebuild your relationship...",
    link: "https://books.google.com.np/books/about/ADHD_Effects_On_Marriage.html?id=PTmSzQEACAAJ&redir_esc=y",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRy4qsqds9SVNL6GLhGXV5pXb3aiv2rsgZWDlx6qQTu5iICgJep",
  },
];
const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<>
<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <header className="text-pink-500 dark:text-pink-400 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">ADHD Books</h1>
        </div>
      </header>

      <main className="container mx-auto mr-8 px-4 py-8">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full p-3 mb-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={book.image}
                alt={`${book.title} cover`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{book.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{book.author}</p>
                <p className="mb-4 text-gray-700 dark:text-gray-200">{book.description}</p>

                
                 <a href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white transition duration-300"
                >
                  Read Book
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 mx-8">
          <h2 className="text-3xl font-bold mb-8 text-pink-500 dark:text-pink-400">
            Get Premium Books for Free
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
            Follow these steps to download over millions of premium books for free using our
            Manish Basnet Sir CLI tool. This method only works on laptops and PCs.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7147188251986997248"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="Embedded post"
              ></iframe>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p>CLI tool created by Reeman Technology Team</p>
            <a href="https://www.digitalpathshalanepal.com/" className="text-pink-500 dark:text-pink-400 hover:underline">
              Visit their website
            </a>
          </div>
        </div>
      </main>
    </div>
</>
  );
};

export default Books;