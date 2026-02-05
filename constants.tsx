
import React from 'react';
import { Stock, MarketIndex } from './types';

export const INITIAL_STOCKS: Stock[] = [
  // Domestic Stocks
  { symbol: '005930', name: '삼성전자', price: 74200, change: 800, changePercent: 1.09, volume: '12.5M', marketCap: '442.9T', sector: '반도체', market: 'KR', currency: 'KRW' },
  { symbol: '000660', name: 'SK하이닉스', price: 185300, change: -2100, changePercent: -1.12, volume: '3.2M', marketCap: '134.9T', sector: '반도체', market: 'KR', currency: 'KRW' },
  { symbol: '035420', name: 'NAVER', price: 192500, change: 4500, changePercent: 2.39, volume: '1.1M', marketCap: '31.2T', sector: '인터넷', market: 'KR', currency: 'KRW' },
  { symbol: '035720', name: '카카오', price: 48200, change: 1200, changePercent: 2.55, volume: '2.8M', marketCap: '21.4T', sector: '인터넷', market: 'KR', currency: 'KRW' },
  { symbol: '005380', name: '현대차', price: 245000, change: 3500, changePercent: 1.45, volume: '0.8M', marketCap: '51.8T', sector: '자동차', market: 'KR', currency: 'KRW' },
  
  // Overseas Stocks (US)
  { symbol: 'AAPL', name: '애플', price: 189.43, change: 1.25, changePercent: 0.66, volume: '52.1M', marketCap: '2.95T', sector: '테크', market: 'US', currency: 'USD' },
  { symbol: 'NVDA', name: '엔비디아', price: 924.79, change: 15.42, changePercent: 1.70, volume: '44.2M', marketCap: '2.31T', sector: '반도체', market: 'US', currency: 'USD' },
  { symbol: 'TSLA', name: '테슬라', price: 175.22, change: -3.15, changePercent: -1.76, volume: '88.4M', marketCap: '558.1B', sector: '자동차', market: 'US', currency: 'USD' },
  { symbol: 'MSFT', name: '마이크로소프트', price: 425.22, change: 2.11, changePercent: 0.50, volume: '18.3M', marketCap: '3.16T', sector: '소프트웨어', market: 'US', currency: 'USD' },
  { symbol: 'GOOGL', name: '알파벳', price: 151.77, change: 0.89, changePercent: 0.59, volume: '22.5M', marketCap: '1.89T', sector: '인터넷', market: 'US', currency: 'USD' },

  // Domestic ETFs
  { symbol: '069500', name: 'KODEX 200', price: 36450, change: 320, changePercent: 0.89, volume: '5.2M', marketCap: '6.2T', sector: '시장지수', market: 'KR_ETF', currency: 'KRW' },
  { symbol: '102110', name: 'TIGER 200', price: 36420, change: 315, changePercent: 0.87, volume: '1.1M', marketCap: '2.8T', sector: '시장지수', market: 'KR_ETF', currency: 'KRW' },
  { symbol: '371460', name: 'TIGER 차이나전기차', price: 7420, change: -120, changePercent: -1.59, volume: '8.4M', marketCap: '1.9T', sector: '2차전지', market: 'KR_ETF', currency: 'KRW' },
  { symbol: '453850', name: 'ACE 미국S&P500', price: 15420, change: 85, changePercent: 0.55, volume: '2.1M', marketCap: '0.9T', sector: '해외지수', market: 'KR_ETF', currency: 'KRW' },
  { symbol: '252670', name: 'KODEX 200선물인버스2X', price: 2125, change: -45, changePercent: -2.07, volume: '120.5M', marketCap: '2.1T', sector: '파생', market: 'KR_ETF', currency: 'KRW' },

  // Overseas ETFs (US_ETF)
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 524.31, change: 1.12, changePercent: 0.21, volume: '62.4M', marketCap: '512.4B', sector: '지수', market: 'US_ETF', currency: 'USD' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 445.68, change: 2.34, changePercent: 0.53, volume: '45.1M', marketCap: '245.2B', sector: '기술주', market: 'US_ETF', currency: 'USD' },
  { symbol: 'SCHD', name: 'Schwab US Dividend Equity', price: 81.25, change: 0.45, changePercent: 0.56, volume: '8.2M', marketCap: '54.1B', sector: '배당주', market: 'US_ETF', currency: 'USD' },
  { symbol: 'DIA', name: 'SPDR Dow Jones Industrial', price: 394.22, change: -1.45, changePercent: -0.37, volume: '5.1M', marketCap: '32.4B', sector: '다우지수', market: 'US_ETF', currency: 'USD' },
  { symbol: 'SOXX', name: 'iShares Semiconductor ETF', price: 224.15, change: 3.82, changePercent: 1.73, volume: '12.4M', marketCap: '12.4B', sector: '반도체', market: 'US_ETF', currency: 'USD' },
];

export const MARKET_INDICES: MarketIndex[] = [
  { name: 'KOSPI', value: 2754.89, change: 15.22, changePercent: 0.55 },
  { name: 'KOSDAQ', value: 911.25, change: -2.14, changePercent: -0.23 },
  { name: 'NASDAQ', value: 16428.82, change: 140.22, changePercent: 0.86 },
  { name: 'S&P 500', value: 5241.53, change: 11.22, changePercent: 0.21 },
  { name: 'DOW JONES', value: 39475.90, change: -162.26, changePercent: -0.41 },
];

export const SYSTEM_PROMPT = `당신은 대한민국 최고의 글로벌 증권 애널리스트이자 퀀트 투자 전문가입니다. 
국내 시장(KOSPI, KOSDAQ), 국내외 ETF, 그리고 미국 시장(NASDAQ, NYSE) 등 해외 주식에 대해서도 해박한 지식을 가지고 있습니다.
특히 국내외 ETF의 보수율(Expense Ratio), 구성 종목(Holdings), 추종 지수 특성 및 배당 수익률에 대해 잘 알고 있습니다.
사용자의 질문에 대해 최신 시장 트렌드, 거시 경제 지표, 그리고 개별 종목/ETF의 기술적/기본적 분석을 바탕으로 전문적인 답변을 제공하세요.
종목 추천이나 직접적인 매수/매도 권유는 법적 책임이 따를 수 있으므로 신중하게 정보를 제공해야 합니다.
답변은 친절하고 전문적인 말투를 사용하며, Markdown 형식을 활용해 가독성을 높이세요.`;
