import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-2">
        <div
          className="w-4 h-4 bg-blue-400 rounded-full animate-bounce-custom"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 bg-sky-400 rounded-full animate-bounce-custom"
          style={{ animationDelay: "0.4s" }}
        ></div>
        <div
          className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce-custom"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
