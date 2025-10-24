import React from 'react';

const MemoryGame = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-pink-500 dark:text-pink-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Memory Games
        </h1>
        
        <div className="inline-block bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg px-6 py-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-200 font-semibold text-xl">
            🚧 Under Construction 🚧
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
          We're working hard to bring you exciting memory games to help improve focus and cognitive skills!
        </p>
        
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
          Check back soon for updates
        </p>
      </div>
    </div>
  );
};

export default MemoryGame;