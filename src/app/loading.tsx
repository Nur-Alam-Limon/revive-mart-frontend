const Loading = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-4 h-4 bg-[#272727] rounded-full"></div>
          <div className="w-4 h-4 bg-[#272727] rounded-full"></div>
          <div className="w-4 h-4 bg-[#272727] rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  