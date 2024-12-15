import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader2 = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <ThreeCircles
        color="#7e5bef"
        height={120}
        width={120}
        ariaLabel="Loading..."
      />
      <p className="mt-6 text-white text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader2;
