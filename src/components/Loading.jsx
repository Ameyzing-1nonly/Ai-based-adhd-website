
const Loading = () => {

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 font-semibold animate-pulse">
            Loading
          </div>
        </div>
      </div>
    )
  }



export default Loading;