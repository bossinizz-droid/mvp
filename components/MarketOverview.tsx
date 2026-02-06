
import React from 'react';
import { MarketIndex } from '../types';

interface MarketOverviewProps {
  indices: MarketIndex[];
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
      {indices.map((index) => (
        <div key={index.name} className="flex-none w-48 glass-panel p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group hover:bg-white/5">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-400 text-xs font-semibold group-hover:text-slate-300">{index.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${index.change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {index.change >= 0 ? '+' : ''}{index.changePercent}%
            </span>
          </div>
          <div className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {index.value.toLocaleString()}
          </div>
          <div className={`text-xs mt-1 flex items-center gap-1 ${index.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
            <span>{index.change >= 0 ? '▲' : '▼'}</span>
            <span>{Math.abs(index.change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketOverview;
