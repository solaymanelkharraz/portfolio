import React from 'react';

const HeroSkeleton = () => {
  return (
    <div className="w-full lg:w-[55%] animate-pulse relative z-10">
      {/* Badge Skeleton */}
      <div className="w-32 h-6 bg-emerald-900/10 rounded-full mb-6"></div>

      {/* Headline Skeleton */}
      <div className="h-[200px] md:h-[240px] flex flex-col justify-center space-y-4">
        <div className="w-3/4 h-16 bg-emerald-900/10 rounded-lg"></div>
        <div className="w-1/2 h-16 bg-emerald-900/10 rounded-lg"></div>
      </div>
      
      {/* Profile Stats Box Skeleton */}
      <div className="bg-white/80 border-l-4 border-emerald-900/20 p-6 rounded-r-xl shadow-lg max-w-xl">
        <div className="space-y-6">
          <div className="flex justify-between border-b border-emerald-900/5 pb-3">
            <div className="w-16 h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-24 h-6 bg-emerald-900/10 rounded"></div>
          </div>
          <div className="flex justify-between border-b border-emerald-900/5 pb-3">
            <div className="w-16 h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-32 h-6 bg-emerald-900/10 rounded"></div>
          </div>
          <div className="border-b border-emerald-900/5 pb-4 space-y-3">
            <div className="w-24 h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-full h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-5/6 h-4 bg-emerald-900/10 rounded"></div>
          </div>
          <div className="pt-1 space-y-3">
            <div className="w-20 h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-full h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-4/5 h-4 bg-emerald-900/10 rounded"></div>
            <div className="w-full h-4 bg-emerald-900/10 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
