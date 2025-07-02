import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            日本大阪與大邱之旅
          </h1>
          <p className="mt-2 text-lg text-gray-600">您的個人化互動行程表</p>
          
          {/* 添加一些旅行圖示作為裝飾 */}
          <div className="flex justify-center items-center gap-2 mt-4 text-2xl">
            <span>🗾</span>
            <span className="text-gray-400">•</span>
            <span>🏯</span>
            <span className="text-gray-400">•</span>
            <span>🍜</span>
            <span className="text-gray-400">•</span>
            <span>✈️</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
