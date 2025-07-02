import React from 'react';

const InfoPanel = () => {
  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 text-center">日本大阪與大邱旅行指南</h3>
      </div>

      {/* 航班資訊 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-sky-800 mb-4 flex items-center">
          <span className="mr-2">✈️</span>
          航班時刻表
        </h4>
        <div className="space-y-3 text-sm text-sky-700">
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
            <p className="font-medium">TW664 台北 → 大邱</p>
            <p>02:00 - 05:25 (紅眼航班)</p>
            <p className="text-xs text-sky-600">※ 請確保登機前有足夠休息</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
            <p className="font-medium">TW313 大邱 → 大阪關西</p>
            <p>15:25 - 17:00 (1小時35分)</p>
            <p className="text-xs text-sky-600">※ 確認行李是否直掛到KIX</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
            <p className="font-medium">VZ567 關西 → 台北</p>
            <p>12:25 - 14:25 (2小時)</p>
            <p className="text-xs text-sky-600">※ 建議前一晚住機場酒店</p>
          </div>
        </div>
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <h5 className="font-semibold text-amber-800 mb-2">⚠️ 注意事項</h5>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 大邱轉機時間約9小時</li>
            <li>• 航班起飛前2小時抵達機場</li>
            <li>• 線上報到可節省時間</li>
          </ul>
        </div>
      </div>

      {/* 行前準備 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-green-800 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          行前準備
        </h4>
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h5 className="font-semibold text-green-800 mb-2">證件與簽證</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 護照效期需6個月以上</li>
              <li>• 台灣公民免簽證短期觀光</li>
              <li>• 預訂確認信備份</li>
              <li>• 旅遊保險必備</li>
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <h5 className="font-semibold text-purple-800 mb-2">現金與支付</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• 日幣現金用於小店、交通</li>
              <li>• 韓元備妥大邱快閃所需</li>
              <li>• 信用卡：Visa/Mastercard/JCB</li>
              <li>• ICOCA卡：大阪地鐵與消費</li>
            </ul>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <h5 className="font-semibold text-orange-800 mb-2">電壓與插座</h5>
            <div className="text-sm text-orange-700 space-y-1">
              <p><strong>日本：</strong>100V，兩孔扁平</p>
              <p><strong>韓國：</strong>220V，需轉接頭</p>
            </div>
          </div>
        </div>
      </div>

      {/* 實用APP */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
          <span className="mr-2">📱</span>
          實用APP
        </h4>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h5 className="font-semibold text-blue-800 mb-2">交通導航</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Google Maps</strong> - 必備！</li>
              <li>• <strong>乘換案內</strong> - 日本鐵路專用</li>
              <li>• <strong>Naver Map</strong> - 韓國地圖首選</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h5 className="font-semibold text-green-800 mb-2">翻譯工具</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Google Translate</strong> - 拍照翻譯</li>
              <li>• <strong>Papago</strong> - 韓語翻譯專家</li>
            </ul>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <h5 className="font-semibold text-purple-800 mb-2">美食與旅遊</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <strong>Tabelog</strong> - 日本美食評論</li>
              <li>• <strong>Klook/KKday</strong> - 門票預訂</li>
              <li>• <strong>LINE</strong> - 日韓常用通訊</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 交通指南 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
          <span className="mr-2">🚇</span>
          交通指南
        </h4>
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <h5 className="font-semibold text-red-800 mb-2">🇰🇷 大邱交通</h5>
            <div className="text-sm text-red-700 space-y-1">
              <p><strong>機場↔市區：</strong></p>
              <p>• 地鐵1號線：機場站→中央路站</p>
              <p>• 計程車：20-30分鐘</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h5 className="font-semibold text-blue-800 mb-2">🇯🇵 大阪交通</h5>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>關西機場→心齋橋：</strong></p>
              <p>• 南海電鐵特急Rapi:t (38分鐘)</p>
              <p>• 南海空港急行 (45-50分鐘)</p>
              <p><strong>市區內：</strong></p>
              <p>• 大阪地鐵 (建議購買ICOCA卡)</p>
            </div>
          </div>
        </div>
      </div>

      {/* eSIM建議 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-semibold text-indigo-800 mb-4 flex items-center">
          <span className="mr-2">📶</span>
          eSIM建議
        </h4>
        <div className="space-y-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <h5 className="font-semibold text-indigo-800 mb-2">優勢</h5>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• 免實體卡片，環保便利</li>
              <li>• 保留原門號接收簡訊</li>
              <li>• 即時啟用網路服務</li>
            </ul>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
            <h5 className="font-semibold text-teal-800 mb-2">推薦供應商</h5>
            <div className="text-sm text-teal-700 space-y-1">
              <p>• <strong>Airalo</strong> - 全球知名</p>
              <p>• <strong>Holafly</strong> - 無限流量</p>
              <p>• <strong>Klook/KKday</strong> - 搭配優惠</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;

