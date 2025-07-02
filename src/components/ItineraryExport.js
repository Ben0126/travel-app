import React from 'react';

const ItineraryExport = ({ itineraries, defaultItinerary }) => {
  const exportToJSON = () => {
    const exportData = {
      defaultItinerary,
      customItineraries: itineraries,
      exportDate: new Date().toISOString(),
      totalItems: itineraries.length
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `travel-itinerary-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportToCSV = () => {
    let csvContent = "日期,時間,地點,描述,類型\n";
    
    // 添加預設行程
    defaultItinerary.forEach(day => {
      day.events.forEach(event => {
        const csvRow = `"${day.date}","${event.time}","預設行程 - ${day.title}","${event.details}","${event.type}"\n`;
        csvContent += csvRow;
      });
    });
    
    // 添加自定義行程
    itineraries.forEach(item => {
      const csvRow = `"${item.date}","${item.time || ''}","${item.location}","${item.description}","${item.type}"\n`;
      csvContent += csvRow;
    });
    
    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const exportFileDefaultName = `travel-itinerary-${new Date().toISOString().split('T')[0]}.csv`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.customItineraries) {
            localStorage.setItem('customTravelItineraries', JSON.stringify(importedData.customItineraries));
            window.location.reload(); // 重新載入頁面以顯示匯入的資料
          }
        } catch (error) {
          alert('檔案格式錯誤，請選擇有效的 JSON 檔案。');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">行程匯入/匯出</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={exportToJSON}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <span className="mr-2">📄</span>
          匯出為 JSON
        </button>
        
        <button
          onClick={exportToCSV}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          <span className="mr-2">📊</span>
          匯出為 CSV
        </button>
        
        <label className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer">
          <span className="mr-2">📁</span>
          匯入 JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            className="hidden"
          />
        </label>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>• JSON 格式包含完整的行程資料，適合備份和分享</p>
        <p>• CSV 格式適合在 Excel 或 Google Sheets 中開啟</p>
        <p>• 匯入 JSON 檔案將會覆蓋現有的自定義行程</p>
      </div>
    </div>
  );
};

export default ItineraryExport; 