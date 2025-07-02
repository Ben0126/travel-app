import React, { useState } from 'react';
import { useItinerary } from '../context/ItineraryContext';

const TodoList = () => {
  const { todoItems, addTodoItem, updateTodoItem, toggleTodoItem, resetTodoToDefault } = useItinerary();
  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // 處理新增待辦事項
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      addTodoItem(newItem.trim());
      setNewItem('');
    }
  };

  // 開始編輯模式
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  // 儲存編輯
  const saveEdit = () => {
    if (editingText.trim()) {
      updateTodoItem(editingId, editingText.trim());
    }
    setEditingId(null);
    setEditingText('');
  };

  // 取消編輯
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // 分類統計
  const preparedCount = todoItems.filter(item => item.completed).length;
  const totalCount = todoItems.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">📦 行李準備清單</h3>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">
            {preparedCount}/{totalCount} 已準備
          </div>
          <button
            onClick={resetTodoToDefault}
            className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
            title="重置為預設建議清單"
          >
            使用建議清單
          </button>
        </div>
      </div>

      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>準備進度</span>
          <span>{totalCount > 0 ? Math.round((preparedCount / totalCount) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${totalCount > 0 ? (preparedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* 新增待辦事項表單 */}
      <form onSubmit={handleAddItem} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="新增準備物品..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            新增
          </button>
        </div>
      </form>

      {/* 待辦事項列表 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {todoItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎒</div>
            <p>還沒有任何準備物品</p>
            <p className="text-sm mb-3">點擊上方「使用建議清單」載入預設項目</p>
            <p className="text-sm">或手動添加您的行李清單！</p>
          </div>
        ) : (
          todoItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                item.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {/* 準備狀態核取方塊 */}
              <button
                onClick={() => toggleTodoItem(item.id)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                  item.completed
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
                title={item.completed ? '已準備' : '點擊標記為已準備'}
              >
                {item.completed && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* 待辦事項內容 */}
              {editingId === item.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    儲存
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 text-sm bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <>
                  <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {item.text}
                  </span>
                  
                  {/* 狀態指示 */}
                  <div className="flex items-center gap-2">
                    {item.completed && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        已準備
                      </span>
                    )}
                    
                    {/* 編輯按鈕 */}
                    <button
                      onClick={() => startEditing(item)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                      title="編輯物品名稱"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* 使用說明 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center text-blue-800">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs">
            點擊左側方塊標記物品已準備，點擊編輯圖示修改物品名稱
          </span>
        </div>
      </div>


    </div>
  );
};

export default TodoList; 