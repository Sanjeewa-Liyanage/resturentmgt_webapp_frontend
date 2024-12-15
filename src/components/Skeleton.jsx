import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton height={30} width={200} />
        <Skeleton height={40} width={120} />
      </div>

      {/* Banner Skeleton */}
      <div className="mb-8">
        <Skeleton height={200} width="100%" />
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <Skeleton height={160} width="100%" />
            <Skeleton height={20} width="80%" className="mt-2" />
            <Skeleton height={20} width="60%" className="mt-2" />
          </div>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="mt-12">
        <Skeleton height={20} width="100%" />
        <Skeleton height={20} width="100%" className="mt-2" />
        <Skeleton height={20} width="100%" className="mt-2" />
      </div>
    </div>
  );
};

export default SkeletonPage;
