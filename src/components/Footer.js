import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-2 sm:mb-0">
            © 2025 旅遊行程規劃器 - 享受美好旅程
          </div>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>💖 用心規劃</span>
            <span>🌏 安全旅行</span>
            <span>📱 智慧管理</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
