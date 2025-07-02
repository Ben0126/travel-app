import React from 'react';

const InfoPanel = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">旅行資訊</h3>
      
      <div className="space-y-4">
        {/* 航班資訊 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">✈️ 航班資訊</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>去程1：</strong>TW664 (TPE → TAE)</p>
            <p>02:00 - 05:25</p>
            <hr className="my-2 border-blue-200" />
            <p><strong>去程2：</strong>TW313 (TAE → KIX)</p>
            <p>15:25 - 17:00</p>
            <hr className="my-2 border-blue-200" />
            <p><strong>回程：</strong>VZ567 (KIX → TPE)</p>
            <p>12:25 - 14:25</p>
          </div>
        </div>

        {/* 住宿資訊 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">🏨 住宿資訊</h4>
          <div className="text-sm text-green-700 space-y-2">
            <div>
              <p><strong>大阪市區：</strong></p>
              <p>Chuo Ward, Osaka</p>
              <p className="text-xs">2-chōme-2-16 Shimanouchi</p>
            </div>
            <hr className="my-2 border-green-200" />
            <div>
              <p><strong>機場酒店：</strong></p>
              <p>關西機場奧德西斯套房酒店</p>
              <p className="text-xs">1 Rinkuoraikita, 泉佐野市</p>
            </div>
          </div>
        </div>

        {/* 重要提醒 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-800 mb-2">⚠️ 重要提醒</h4>
          <div className="text-sm text-amber-700 space-y-1">
            <p>• 提前3小時抵達機場</p>
            <p>• 確認護照有效期</p>
            <p>• 準備日圓現金</p>
            <p>• 下載Google翻譯App</p>
            <p>• 準備緊急聯絡方式</p>
            <p>• 確認旅遊保險</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;

