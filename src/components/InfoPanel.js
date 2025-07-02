import React, { useState } from 'react';

const InfoPanel = () => {
  const [activeTab, setActiveTab] = useState('flights');

  const tabs = [
    { id: 'flights', label: '航班', icon: '✈️' },
    { id: 'preparation', label: '行前準備', icon: '📋' },
    { id: 'apps', label: '實用APP', icon: '📱' },
    { id: 'transport', label: '交通指南', icon: '🚇' },
    { id: 'esim', label: 'eSIM', icon: '📶' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* 標題 */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">日本大阪與大邱旅行指南</h3>
      </div>

      {/* 分頁標籤 */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 內容區域 */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {activeTab === 'flights' && (
          <div className="space-y-4">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <h4 className="font-semibold text-sky-800 mb-3">✈️ 航班時刻表</h4>
              <div className="space-y-3 text-sm text-sky-700">
                <div>
                  <p className="font-medium">TW664 台北 → 大邱</p>
                  <p>02:00 - 05:25 (紅眼航班)</p>
                  <p className="text-xs text-sky-600">※ 請確保登機前有足夠休息</p>
                </div>
                <hr className="border-sky-200" />
                <div>
                  <p className="font-medium">TW313 大邱 → 大阪關西</p>
                  <p>15:25 - 17:00 (1小時35分)</p>
                  <p className="text-xs text-sky-600">※ 確認行李是否直掛到KIX</p>
                </div>
                <hr className="border-sky-200" />
                <div>
                  <p className="font-medium">VZ567 關西 → 台北</p>
                  <p>12:25 - 14:25 (2小時)</p>
                  <p className="text-xs text-sky-600">※ 建議前一晚住機場酒店</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">⚠️ 航班注意事項</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 大邱轉機時間約9小時 (快閃市區遊)</li>
                <li>• 建議航班起飛前2小時抵達機場</li>
                <li>• 線上報到可節省排隊時間</li>
                <li>• 注意各航空公司行李規定</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">📋 證件與簽證</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 護照效期需6個月以上</li>
                <li>• 台灣公民免簽證短期觀光</li>
                <li>• 預訂確認信備份</li>
                <li>• 旅遊保險必備</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-3">💰 現金與支付</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• 日幣 (JPY)：備妥現金用於小店、交通</li>
                <li>• 韓元 (KRW)：大邱快閃所需</li>
                <li>• 信用卡：Visa/Mastercard/JCB</li>
                <li>• ICOCA卡：大阪地鐵與消費</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-3">🔌 電壓與插座</h4>
              <div className="text-sm text-orange-700 space-y-2">
                <div>
                  <p><strong>日本：</strong>100V，兩孔扁平 (Type A/B)</p>
                  <p className="text-xs">台灣電器可直接使用</p>
                </div>
                <div>
                  <p><strong>韓國：</strong>220V，兩圓孔 (Type C/F)</p>
                  <p className="text-xs">需萬用轉接頭和變壓器</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">👕 七月天氣穿搭</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 夏季炎熱潮濕，輕便透氣衣物</li>
                <li>• 棉麻材質最佳</li>
                <li>• 攜帶輕便雨具（午後雷雨）</li>
                <li>• 薄外套應對室內冷氣</li>
                <li>• 個人常用藥品</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'apps' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">🗺️ 交通導航</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li><strong>Google Maps</strong> - 必備！路線查詢、景點位置</li>
                <li><strong>乘換案內</strong> - 日本鐵路換乘專用</li>
                <li><strong>Naver/Kakao Map</strong> - 韓國地圖首選</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">🗣️ 翻譯工具</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li><strong>Google Translate</strong> - 拍照翻譯、語音翻譯</li>
                <li><strong>Papago</strong> - 韓語翻譯專家</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-3">🍽️ 美食與旅遊</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li><strong>Tabelog/Gurunavi</strong> - 日本美食評論</li>
                <li><strong>TripAdvisor</strong> - 景點餐廳評價</li>
                <li><strong>Klook/KKday</strong> - 門票、行程預訂</li>
                <li><strong>LINE</strong> - 日韓常用通訊軟體</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-3">🇰🇷 大邱交通</h4>
              <div className="text-sm text-red-700 space-y-2">
                <p><strong>機場↔市區：</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 地鐵1號線：機場站→中央路/半月堂站</li>
                  <li>• 計程車：20-30分鐘，費用較高</li>
                </ul>
                <p><strong>市區內：</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 地鐵系統涵蓋主要景點</li>
                  <li>• 公車路線廣泛</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-3">🇯🇵 大阪交通</h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p><strong>關西機場→心齋橋：</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 南海電鐵特急Rapi:t (38分鐘)</li>
                  <li>• 南海空港急行 (45-50分鐘)</li>
                  <li>• JR關空特急Haruka→天王寺轉乘</li>
                  <li>• 利木津巴士直達市區</li>
                </ul>
                <p><strong>市區內：</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>• 大阪地鐵 (建議購買ICOCA卡)</li>
                  <li>• JR大阪環狀線</li>
                  <li>• 私鐵連接周邊城市</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-3">🎡 世博交通</h4>
              <p className="text-sm text-green-700">
                地鐵中央線→宇宙廣場站→轉乘世博線/接駁巴士
              </p>
            </div>
          </div>
        )}

        {activeTab === 'esim' && (
          <div className="space-y-4">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-3">📶 eSIM 優勢</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• 免實體卡片，環保便利</li>
                <li>• 保留原門號接收簡訊</li>
                <li>• 無需插拔SIM卡</li>
                <li>• 即時啟用網路服務</li>
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h4 className="font-semibold text-teal-800 mb-3">🏪 推薦供應商</h4>
              <div className="text-sm text-teal-700 space-y-2">
                <div>
                  <p><strong>Airalo</strong> - 全球知名，多種方案</p>
                </div>
                <div>
                  <p><strong>Holafly</strong> - 無限流量方案</p>
                </div>
                <div>
                  <p><strong>Klook/KKday</strong> - 搭配促銷優惠</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-3">💡 選擇建議</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 出發前1-2週比較價格</li>
                <li>• 考慮流量需求與使用天數</li>
                <li>• 確認日韓兩國訊號覆蓋</li>
                <li>• 大流量包通常較划算</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;

