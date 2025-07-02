import React from 'react';
import { useItinerary } from '../context/ItineraryContext';

const Header = () => {
  const { view, setView } = useItinerary();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-500">日本大阪與大邱之旅</h1>
          <p className="mt-2 text-lg text-gray-600">您的個人化互動行程表</p>
        </div>
        
        {/* 切換視圖的按鈕 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setView('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              view === 'overview' 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            行程概覽
          </button>
          <button
            onClick={() => setView('manager')}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              view === 'manager' 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            自定義行程
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
