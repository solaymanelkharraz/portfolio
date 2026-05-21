import React from 'react';

const ProjectsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto w-full mb-32 animate-pulse">
      {/* Tabs Header Skeleton */}
      <div className="flex flex-wrap items-center gap-4 mb-12 justify-center md:justify-start">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-32 h-10 bg-emerald-900/10 rounded-full border-2 border-emerald-900/5"></div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="min-h-[600px] xl:min-h-[600px] bg-white rounded-[2rem] border border-emerald-900/5 shadow-sm flex flex-col xl:flex-row items-stretch overflow-hidden">
        
        {/* Left Side: Tactical Breakdown Skeleton */}
        <div className="w-full xl:w-[45%] p-8 md:p-10 border-r border-emerald-900/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-32 h-4 bg-emerald-900/10 rounded"></div>
              <div className="w-24 h-6 bg-emerald-900/10 rounded"></div>
            </div>
            
            <div className="w-3/4 h-10 bg-emerald-900/10 rounded mb-8"></div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <div className="flex-1 space-y-6">
                <div className="bg-[#F8F9FA] p-4 rounded-xl border border-emerald-900/5 h-24 flex flex-col gap-3">
                  <div className="w-1/2 h-4 bg-emerald-900/10 rounded"></div>
                  <div className="w-full h-3 bg-emerald-900/5 rounded"></div>
                  <div className="w-5/6 h-3 bg-emerald-900/5 rounded"></div>
                </div>
                <div className="bg-[#F8F9FA] p-4 rounded-xl border border-emerald-900/5 h-24 flex flex-col gap-3">
                  <div className="w-1/2 h-4 bg-emerald-900/10 rounded"></div>
                  <div className="w-full h-3 bg-emerald-900/5 rounded"></div>
                  <div className="w-5/6 h-3 bg-emerald-900/5 rounded"></div>
                </div>
              </div>

              {/* Analytics Skeleton Column */}
              <div className="w-full sm:w-1/3 bg-emerald-900/5 p-5 rounded-xl space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border-b border-emerald-900/10 pb-3 mb-1">
                    <div className="w-16 h-3 bg-emerald-900/10 rounded mb-2"></div>
                    <div className="w-12 h-6 bg-emerald-900/20 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-emerald-900/10 rounded"></div>
            <div className="w-32 h-10 bg-emerald-900/10 rounded"></div>
          </div>
        </div>

        {/* Right Side: Engine Window Skeleton */}
        <div className="w-full xl:w-[55%] h-[500px] md:h-auto bg-[#F8F9FA] relative">
          <div className="absolute top-0 left-0 w-full h-12 bg-white/50 border-b border-emerald-900/5 flex items-center px-5 gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-900/10"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-900/10"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-900/10"></div>
            <div className="ml-6 flex-1 max-w-md mx-auto bg-emerald-900/5 rounded-md h-7"></div>
          </div>
          
          <div className="w-full h-full pt-12 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-900/5"></div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
