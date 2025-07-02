import React from 'react';

const ItineraryStats = ({ itineraries, defaultItinerary }) => {
  // 計算統計資訊
  const calculateStats = () => {
    // 統計自定義行程的類型分佈
    const typeStats = itineraries.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    // 計算時間分佈（按日期）
    const dateStats = itineraries.reduce((acc, item) => {
      const date = item.date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // 計算預設行程的統計
    let defaultFlights = 0;
    let defaultAccommodations = 0;
    let defaultActivities = 0;
    
    defaultItinerary.forEach(day => {
      day.events.forEach(event => {
        if (event.type === 'flight') defaultFlights++;
        else if (event.type === 'lodging') defaultAccommodations++;
        else if (event.type === 'activity') defaultActivities++;
      });
    });

    return {
      customTotal: itineraries.length,
      typeStats,
      dateStats,
      defaultStats: {
        flights: defaultFlights,
        accommodations: defaultAccommodations,
        activities: defaultActivities
      },
      mostActiveDate: Object.keys(dateStats).reduce((a, b) => dateStats[a] > dateStats[b] ? a : b, null),
      totalDays: defaultItinerary.length
    };
  };

  const stats = calculateStats();

  const getTypeIcon = (type) => {
    const icons = {
      '活動': '🏯',
      '航班': '✈️',
      '住宿': '🏨',
      '交通': '🚗',
      '餐飲': '🍽️',
      '購物': '🛍️',
      '其他': '📌'
    };
    return icons[type] || '📌';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">行程統計分析</h2>
      
      {/* 整體統計 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalDays}</p>
          <p className="text-sm text-blue-500">旅行天數</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-green-600">{stats.customTotal}</p>
          <p className="text-sm text-green-500">自定義項目</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.defaultStats.flights}</p>
          <p className="text-sm text-purple-500">預定航班</p>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-orange-600">{stats.defaultStats.accommodations}</p>
          <p className="text-sm text-orange-500">預定住宿</p>
        </div>
      </div>

      {/* 類型統計 */}
      {stats.customTotal > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">自定義行程類型分佈</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(stats.typeStats).map(([type, count]) => (
              <div key={type} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{getTypeIcon(type)}</span>
                  <span className="text-sm text-gray-600">{type}</span>
                </div>
                <span className="font-bold text-gray-800">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 日期統計 */}
      {stats.customTotal > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">每日行程數量</h3>
          <div className="space-y-2">
            {Object.entries(stats.dateStats)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([date, count]) => (
                <div key={date} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">{date}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(stats.dateStats))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-800 w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 推薦建議 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 行程建議</h3>
        <div className="text-sm text-yellow-700 space-y-1">
          {stats.customTotal === 0 ? (
            <p>• 您還沒有添加任何自定義行程項目，建議開始規劃您的個人行程！</p>
          ) : (
            <>
              <p>• 您已添加了 {stats.customTotal} 個自定義行程項目</p>
              {stats.mostActiveDate && (
                <p>• {stats.mostActiveDate} 是您行程最豐富的一天</p>
              )}
              {Object.keys(stats.typeStats).length > 0 && (
                <p>• 您的行程類型豐富度：{Object.keys(stats.typeStats).length} 種不同類型</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryStats; 