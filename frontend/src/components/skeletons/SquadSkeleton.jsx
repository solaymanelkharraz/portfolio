import React from 'react';

const SquadSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 relative animate-pulse">
      {/* The Pitch Container Skeleton */}
      <div className="w-full h-[700px] rounded-xl bg-emerald-900/10 border-4 border-white shadow-lg relative flex items-center justify-center overflow-hidden">
        
        {/* Placeholder lines to suggest the pitch */}
        <div className="absolute inset-6 border-2 border-white/20"></div>
        <div className="absolute top-1/2 left-0 w-full border-t-2 border-white/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/20 rounded-full"></div>

        {/* Pulsing blocks for players (Starting XI representation) */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        <div className="absolute top-[30%] left-[70%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        
        <div className="absolute top-[50%] left-[20%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        <div className="absolute top-[50%] left-[80%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        
        <div className="absolute top-[75%] left-[25%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        <div className="absolute top-[75%] left-[45%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        <div className="absolute top-[75%] left-[75%] -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
        
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-14 h-14 bg-emerald-900/20 rounded-full"></div>
      </div>

      {/* The Bench Skeleton */}
      <div className="w-full mt-6 bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center gap-6">
        <div className="w-32 h-4 bg-slate-200 rounded"></div>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full bg-slate-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SquadSkeleton;
