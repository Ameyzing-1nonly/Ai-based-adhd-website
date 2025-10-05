const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="w-full flex">
      <input
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        type="text"
        className="border-none py-2 mx-auto mr-5 bg-gray-100 w-full dark:text-gray-200  dark:bg-gray-800 rounded-lg outline-none text-gray-800 focus:outline-none focus:border"
        placeholder="What is ADHD ?"
      />
      <button onClick={handleSearch} className="bg-pink-500 px-4 py-2 rounded-xl text-white"
      >Search</button>
    </div>
  );
};

export default SearchBlog;
