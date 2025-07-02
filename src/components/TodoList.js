import React, { useState } from 'react';
import { useItinerary } from '../context/ItineraryContext';

const TodoList = () => {
  const { todoItems, addTodoItem, updateTodoItem, deleteTodoItem, toggleTodoItem } = useItinerary();
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
  const completedCount = todoItems.filter(item => item.completed).length;
  const totalCount = todoItems.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">📦 行李準備清單</h3>
        <div className="text-sm text-gray-500">
          {completedCount}/{totalCount} 已完成
        </div>
      </div>

      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>準備進度</span>
          <span>{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
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
            <p className="text-sm">開始添加您的行李清單吧！</p>
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
              {/* 核取方塊 */}
              <button
                onClick={() => toggleTodoItem(item.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                  item.completed
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {item.completed && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
                  
                  {/* 操作按鈕 */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEditing(item)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
                      title="編輯"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteTodoItem(item.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200"
                      title="刪除"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* 預設建議項目 */}
      {todoItems.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">💡 建議準備物品</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
            <div>• 護照、簽證</div>
            <div>• 機票確認單</div>
            <div>• 旅行保險文件</div>
            <div>• 充電器、轉接頭</div>
            <div>• 常用藥品</div>
            <div>• 日圓現金</div>
            <div>• 換洗衣物</div>
            <div>• 相機、記憶卡</div>
          </div>
          <p className="text-xs text-blue-600 mt-2">點擊上方輸入框開始添加您的清單！</p>
        </div>
      )}
    </div>
  );
};

export default TodoList; 