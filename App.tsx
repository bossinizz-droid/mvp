
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import MarketOverview from './components/MarketOverview';
import StockChart from './components/StockChart';
import AIAssistant from './components/AIAssistant';
import { INITIAL_STOCKS, MARKET_INDICES } from './constants.tsx';
import { Stock, PricePoint } from './types';

const App: React.FC = () => {
  const [stocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [marketFilter, setMarketFilter] = useState<'KR' | 'US' | 'KR_ETF' | 'US_ETF'>('KR');
  const [selectedStock, setSelectedStock] = useState<Stock>(INITIAL_STOCKS[0]);
  const [chartData, setChartData] = useState<PricePoint[]>([]);

  const filteredStocks = stocks.filter(s => s.market === marketFilter);

  // Auto-select first stock when market changes
  useEffect(() => {
    const firstOfMarket = stocks.find(s => s.market === marketFilter);
    if (firstOfMarket) {
      setSelectedStock(firstOfMarket);
    }
  }, [marketFilter, stocks]);

  // Helper to format currency
  const formatPrice = (price: number, currency: string) => {
    return currency === 'KRW' 
      ? price.toLocaleString() 
      : price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getCurrencySymbol = (currency: string) => currency === 'KRW' ? '₩' : '$';

  // Generate mock chart data based on price magnitude
  useEffect(() => {
    const data: PricePoint[] = [];
    const volatility = selectedStock.currency === 'KRW' ? (selectedStock.price > 10000 ? 1000 : 100) : 5;
    let currentPrice = selectedStock.price * 0.95;
    
    for (let i = 0; i < 30; i++) {
      currentPrice += (Math.random() - 0.45) * volatility;
      data.push({
        time: `${i + 1}일`,
        price: Number(currentPrice.toFixed(2))
      });
    }
    setChartData(data);
  }, [selectedStock]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* Global Market Switcher & Index Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="w-1.5 h-8 bg-indigo-500 rounded-full"></span>
                시장 대시보드
              </h2>
              {/* Main Market Toggles */}
              <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/10 backdrop-blur-sm overflow-x-auto scrollbar-hide">
                <button 
                  onClick={() => setMarketFilter('KR')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    marketFilter === 'KR' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  국내주식
                </button>
                <button 
                  onClick={() => setMarketFilter('US')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    marketFilter === 'US' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  해외주식
                </button>
                <button 
                  onClick={() => setMarketFilter('KR_ETF')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    marketFilter === 'KR_ETF' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  국내ETF
                </button>
                <button 
                  onClick={() => setMarketFilter('US_ETF')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    marketFilter === 'US_ETF' 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  해외ETF
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              실시간 시장 연결됨
            </div>
          </div>
          
          <MarketOverview indices={MARKET_INDICES} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Main Chart & Popular Stock List (Now Below Chart) */}
          <div className="lg:col-span-2 space-y-8">
            <section className="glass-panel p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group min-h-[500px]">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold">{selectedStock.name}</h2>
                    <span className="text-slate-500 font-mono text-sm">{selectedStock.symbol}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider ${
                      selectedStock.market.includes('ETF') 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {selectedStock.market === 'KR' ? 'KOREA' : selectedStock.market === 'US' ? 'USA' : selectedStock.market === 'KR_ETF' ? 'KOREA ETF' : 'USA ETF'} · {selectedStock.sector}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold font-mono tracking-tighter">
                      <span className="text-slate-500 text-xl mr-1 font-normal">{getCurrencySymbol(selectedStock.currency)}</span>
                      {formatPrice(selectedStock.price, selectedStock.currency)}
                    </span>
                    <span className={`text-lg font-semibold flex items-center gap-1 ${selectedStock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedStock.change >= 0 ? '▲' : '▼'} {formatPrice(Math.abs(selectedStock.change), selectedStock.currency)} ({selectedStock.changePercent}%)
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 bg-black/20 p-1 rounded-xl">
                  {['1D', '1W', '1M', '1Y', 'ALL'].map(range => (
                    <button 
                      key={range}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        range === '1M' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              
              <StockChart 
                data={chartData} 
                color={selectedStock.change >= 0 ? "#10b981" : "#f43f5e"} 
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
                {[
                  { label: selectedStock.market.includes('ETF') ? '순자산(AUM)' : '시가총액', value: selectedStock.marketCap },
                  { label: '거래량', value: selectedStock.volume },
                  { label: '52주 최고', value: `${getCurrencySymbol(selectedStock.currency)}${formatPrice(selectedStock.price * 1.2, selectedStock.currency)}` },
                  { label: '52주 최저', value: `${getCurrencySymbol(selectedStock.currency)}${formatPrice(selectedStock.price * 0.8, selectedStock.currency)}` },
                ].map(stat => (
                  <div key={stat.label} className="group/stat">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold group-hover/stat:text-indigo-400 transition-colors">{stat.label}</p>
                    <p className="text-sm font-bold text-slate-200">{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Stocks Section (Wide Layout) */}
            <section className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="font-bold flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
                   {marketFilter === 'KR' ? '국내주식' : marketFilter === 'US' ? '해외주식' : marketFilter === 'KR_ETF' ? '국내ETF' : '해외ETF'} 실시간 리스트
                </h3>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">실시간 종목 데이터</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-white/5">
                    <tr>
                      <th className="px-6 py-4">종목/심볼</th>
                      <th className="px-6 py-4">현재가</th>
                      <th className="px-6 py-4">등락율</th>
                      <th className="px-6 py-4">거래량</th>
                      <th className="px-6 py-4 text-right">테마/섹터</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStocks.map((stock) => (
                      <tr 
                        key={stock.symbol} 
                        className={`hover:bg-indigo-500/5 cursor-pointer transition-all duration-200 group ${selectedStock.symbol === stock.symbol ? 'bg-indigo-600/10' : ''}`}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                              stock.market === 'US' || stock.market === 'US_ETF' ? 'bg-blue-600/20 text-blue-400' : 
                              stock.market === 'KR_ETF' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-600/20 text-red-400'
                            }`}>
                              {stock.name.charAt(0)}
                            </div>
                            <div>
                              <div className="group-hover:text-indigo-400 transition-colors font-bold text-sm">{stock.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono uppercase">{stock.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-sm">
                          {getCurrencySymbol(stock.currency)}{formatPrice(stock.price, stock.currency)}
                        </td>
                        <td className={`px-6 py-4 font-bold text-sm ${stock.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          <div className="flex items-center gap-1">
                            {stock.change >= 0 ? '▲' : '▼'}
                            {stock.changePercent}%
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">{stock.volume}</td>
                        <td className="px-6 py-4 text-right">
                           <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-500 group-hover:text-indigo-300 transition-colors border border-transparent group-hover:border-indigo-500/20 uppercase font-bold tracking-tight">
                             {stock.sector}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Market Insights & AI Assistant */}
          <div className="space-y-8 lg:col-span-1">
            <section className="glass-panel p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/40 to-slate-900/40 shadow-xl group">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
                </div>
                <h3 className="font-bold tracking-tight">글로벌 마켓 인사이트</h3>
              </div>
              <div className="space-y-4">
                {[
                  "엔비디아 시가총액 2조 달러 돌파와 AI 산업 영향",
                  "미국 ETF 시장 주간 자금 유입액 사상 최대치 경신",
                  "국내 ETF 시장 140조 시대, 채권형 ETF 자금 유입 가속",
                  "미 연준 금리 인하 기대감에 고배당 ETF(SCHD 등) 관심 증가"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10 group/item">
                    <span className="text-indigo-500 font-bold font-mono text-xs mt-0.5">0{i+1}</span>
                    <span className="text-xs text-slate-300 group-hover/item:text-white leading-snug font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold text-slate-500 hover:text-white transition-all border border-white/5 uppercase tracking-widest">
                상세 리포트 읽기
              </button>
            </section>

            <AIAssistant />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
