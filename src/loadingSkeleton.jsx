import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const LoadingSkeleton = () => {
  return (
    <div className="flex w-1/3 flex-col p-4l justify-between">
      <div>
        <Skeleton count={7} width="100%" height="30px" />
      </div>
      {/* <div>
        <Skeleton count={1} width="100%" height="30px" />
        <Skeleton count={1} width="100%" height="30px" />
        <Skeleton count={1} width="100%" height="30px" />
        <Skeleton count={1} width="100%" height="30px" />
      </div> */}
    </div>
  );
};

export default LoadingSkeleton;
