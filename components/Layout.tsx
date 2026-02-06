
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">G</div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Gemini Quant
          </h1>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">시장분석</a>
          <a href="#" className="hover:text-white transition-colors">나의 포트폴리오</a>
          <a href="#" className="hover:text-white transition-colors">AI 인사이트</a>
          <a href="#" className="hover:text-white transition-colors">커뮤니티</a>
        </div>
        <div className="flex gap-4 items-center">
          <button className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20">
            로그인
          </button>
        </div>
      </nav>
      <main className="flex-1 overflow-auto bg-[#0f172a]">
        {children}
      </main>
      <footer className="glass-panel border-t border-white/10 p-6 text-center text-slate-500 text-sm">
        &copy; 2024 Gemini Quant. All market data is delayed by 15 mins.
      </footer>
    </div>
  );
};

export default Layout;
