import React, { useState, useMemo } from 'react';
import { 
  Package, Plus, CheckCircle, Clock, AlertCircle, Zap, 
  Eye, Trash2, Play, Search, MessageSquare, ShoppingCart 
} from 'lucide-react';
import { PLATFORM_CONFIG, PRIORITY_CONFIG, STATUS_CONFIG } from '../../config'; // ✅ Unified import

/**
 * OrderanPage Component
 * 
 * Extracted from App.js monolith
 * Manages order display, creation, and management
 * 
 * @param {Object} props
 * @param {Object} props.currentTheme - Current theme configuration
 * @param {Object} props.ordersHook - useOrders hook return value
 * @param {Boolean} props.showAddForm - Form visibility state
 * @param {Function} props.setShowAddForm - Form visibility setter
 * @param {Number} props.expandedOrder - Expanded order ID
 * @param {Function} props.setExpandedOrder - Expanded order setter
 * @param {String} props.newNote - Note input value
 * @param {Function} props.setNewNote - Note input setter
 */
export const OrderanPage = React.memo(({
  currentTheme,
  ordersHook,
  showAddForm,
  setShowAddForm,
  expandedOrder,
  setExpandedOrder,
  newNote,
  setNewNote
}) => {
  const {
    orderForm,
    setOrderForm,
    orderFilter,
    setOrderFilter,
    orderSearch,
    setOrderSearch,
    orderPlatformFilter,
    setOrderPlatformFilter,
    filteredOrders,
    stats,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    addOrderNote
  } = ordersHook;

  // Process note modal state
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [processNote, setProcessNote] = useState('');
  const [processingOrderId, setProcessingOrderId] = useState(null);

  // Helper functions
  const getPlatformBadge = (platform) => {
    return PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.wa;
  };

  const getPriorityBadge = (priority) => {
    return PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
  };

  const getStatusBadge = (status) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  };

  const isOverdue = (order) => {
    if (order.status === 'completed' || !order.dueDate) return false;
    return new Date(order.dueDate) < new Date();
  };

  const handleStartProcess = (orderId) => {
    setProcessingOrderId(orderId);
    setProcessNote('');
    setShowProcessModal(true);
  };

  const handleConfirmProcess = () => {
    if (!processNote.trim()) {
      alert('⚠️ Catatan harus diisi sebelum memulai proses!');
      return;
    }
    updateOrderStatus(processingOrderId, 'process', processNote);
    setShowProcessModal(false);
    setProcessNote('');
    setProcessingOrderId(null);
  };

  const handleAddOrder = () => {
    const success = addOrder();
    if (success) {
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Package className="text-white" size={24} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Manajemen Orderan</h1>
              <p className={`text-sm ${currentTheme.subtext}`}>Kelola semua orderan dari berbagai platform</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-md font-medium"
          >
            <Plus size={18} />
            Tambah Order
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className={`${currentTheme.badge} rounded-xl p-4 border-2`}>
            <div className="flex items-center gap-2 mb-2">
              <Package size={16} className="text-purple-500" />
              <span className={`text-xs font-medium ${currentTheme.subtext}`}>Total</span>
            </div>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>{stats.total}</p>
          </div>
          <div className={`${currentTheme.badge} rounded-xl p-4 border-2 border-yellow-300`}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-yellow-500" />
              <span className={`text-xs font-medium ${currentTheme.subtext}`}>Pending</span>
            </div>
            <p className={`text-2xl font-bold text-yellow-600`}>{stats.pending}</p>
          </div>
          <div className={`${currentTheme.badge} rounded-xl p-4 border-2 border-blue-300`}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-blue-500" />
              <span className={`text-xs font-medium ${currentTheme.subtext}`}>Diproses</span>
            </div>
            <p className={`text-2xl font-bold text-blue-600`}>{stats.process}</p>
          </div>
          <div className={`${currentTheme.badge} rounded-xl p-4 border-2 border-green-300`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className={`text-xs font-medium ${currentTheme.subtext}`}>Selesai</span>
            </div>
            <p className={`text-2xl font-bold text-green-600`}>{stats.completed}</p>
          </div>
          {stats.overdue > 0 && (
            <div className={`${currentTheme.badge} rounded-xl p-4 border-2 border-red-300`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-red-500" />
                <span className={`text-xs font-medium ${currentTheme.subtext}`}>Terlambat</span>
              </div>
              <p className={`text-2xl font-bold text-red-600`}>{stats.overdue}</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Order Form */}
      {showAddForm && (
        <div
          key="add-order-form"
          className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-6`}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <h2 className={`text-lg font-bold ${currentTheme.text} mb-4`}>Tambah Order Baru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Username Buyer</label>
              <input
                type="text"
                value={orderForm.username}
                onChange={(e) => {
                  e.stopPropagation();
                  setOrderForm({ ...orderForm, username: e.target.value });
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                placeholder="Masukkan username buyer"
                autoComplete="off"
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Platform</label>
              <select
                value={orderForm.platform}
                onChange={(e) => {
                  e.stopPropagation();
                  setOrderForm({ ...orderForm, platform: e.target.value });
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              >
                <option value="wa">WhatsApp</option>
                <option value="tele">Telegram</option>
                <option value="shopee_media">Shopee Media Booster</option>
                <option value="shopee_acc">Shopee AccStorageCom</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Deskripsi</label>
              <textarea
                value={orderForm.description}
                onChange={(e) => {
                  e.stopPropagation();
                  setOrderForm({ ...orderForm, description: e.target.value });
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                placeholder="Deskripsi orderan..."
                rows="3"
                autoComplete="off"
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Quantity</label>
              <input
                type="number"
                min="1"
                value={orderForm.quantity}
                onChange={(e) => {
                  e.stopPropagation();
                  setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 });
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                placeholder="Jumlah"
                autoComplete="off"
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Prioritas</label>
              <select
                value={orderForm.priority}
                onChange={(e) => {
                  e.stopPropagation();
                  setOrderForm({ ...orderForm, priority: e.target.value });
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Due Date (Opsional)</label>
              <input
                type="date"
                value={orderForm.dueDate}
                onChange={(e) => {
                  e.stopPropagation();
                  setOrderForm({ ...orderForm, dueDate: e.target.value });
                }}
                onFocus={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className={`w-full px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={handleAddOrder}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all shadow-md font-medium"
            >
              <CheckCircle size={16} />
              Simpan Order
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className={`px-5 py-2 rounded-lg ${currentTheme.badge} hover:bg-slate-200 transition-all font-medium`}
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-4`}>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Cari username atau deskripsi..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
              />
            </div>
          </div>

          <select
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
            className={`px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="process">Diproses</option>
            <option value="completed">Selesai</option>
          </select>

          <select
            value={orderPlatformFilter}
            onChange={(e) => setOrderPlatformFilter(e.target.value)}
            className={`px-4 py-2 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
          >
            <option value="all">Semua Platform</option>
            <option value="wa">WhatsApp</option>
            <option value="tele">Telegram</option>
            <option value="shopee_media">Shopee Media Booster</option>
            <option value="shopee_acc">Shopee AccStorageCom</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setOrderFilter('all');
              setOrderPlatformFilter('all');
              setOrderSearch('');
            }}
            className={`px-4 py-2 rounded-lg ${currentTheme.badge} hover:bg-slate-200 transition-all font-medium`}
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-12 text-center`}>
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <p className={`text-lg font-medium ${currentTheme.subtext}`}>Belum ada orderan</p>
            <p className={`text-sm ${currentTheme.subtext} mt-2`}>Klik tombol "Tambah Order" untuk memulai</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const platform = getPlatformBadge(order.platform);
            const priority = getPriorityBadge(order.priority);
            const status = getStatusBadge(order.status);
            const overdue = isOverdue(order);
            const expanded = expandedOrder === order.id;
            const PlatformIcon = platform.icon === 'MessageSquare' ? MessageSquare : ShoppingCart;

            return (
              <div key={order.id} className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-5 transition-all ${expanded ? 'ring-2 ring-purple-500' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <PlatformIcon className="text-white" size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-lg font-bold ${currentTheme.text} truncate`}>{order.username}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priority.color}`}>
                            {priority.icon} {priority.label}
                          </span>
                          {order.status === 'process' && (
                            <span className="relative px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 animate-pulse">
                              🔔 Sedang Diproses
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                            </span>
                          )}
                          {overdue && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 animate-pulse">
                              ⚠️ Terlambat
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`px-2 py-1 rounded-lg bg-gradient-to-r ${platform.color} text-white text-xs font-medium`}>
                            {platform.label}
                          </span>
                          <span className={`px-3 py-1 rounded-lg border-2 ${status.color} text-xs font-medium`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedOrder(expanded ? null : order.id)}
                          className={`p-2 rounded-lg ${currentTheme.badge} hover:bg-slate-200 transition-all`}
                          title="Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteOrder(order.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className={`text-base font-bold ${currentTheme.text} mb-3 line-clamp-2`}>{order.description}</p>
                    {order.quantity && (
                      <p className={`text-sm ${currentTheme.subtext} mb-2`}>
                        <span className="font-medium">Jumlah:</span> {order.quantity} item
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className={currentTheme.subtext}>
                        <Clock size={12} className="inline mr-1" />
                        Dibuat: {new Date(order.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {order.dueDate && (
                        <span className={overdue ? 'text-red-600 font-medium' : currentTheme.subtext}>
                          <AlertCircle size={12} className="inline mr-1" />
                          Due: {new Date(order.dueDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      {order.completedAt && (
                        <span className="text-green-600">
                          <CheckCircle size={12} className="inline mr-1" />
                          Selesai: {new Date(order.completedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>

                    {order.status !== 'completed' && (
                      <div className="flex gap-2 mt-3">
                        {order.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleStartProcess(order.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all text-xs font-medium"
                          >
                            <Play size={12} />
                            Mulai Proses
                          </button>
                        )}
                        {order.status === 'process' && (
                          <>
                            <button
                              type="button"
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-all text-xs font-medium"
                            >
                              <CheckCircle size={12} />
                              Selesai
                            </button>
                            <button
                              type="button"
                              onClick={() => updateOrderStatus(order.id, 'pending')}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-all text-xs font-medium"
                            >
                              <Clock size={12} />
                              Pending
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {expanded && (
                      <div className="mt-4 pt-4 border-t-2 space-y-3">
                        <div>
                          <h4 className={`text-sm font-bold ${currentTheme.text} mb-2`}>Deskripsi Lengkap</h4>
                          <p className={`text-sm ${currentTheme.text} mb-4 whitespace-pre-wrap`}>{order.description}</p>
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${currentTheme.text} mb-2`}>Catatan</h4>
                          {order.notes && order.notes.length > 0 ? (
                            <div className="space-y-2 mb-3">
                              {order.notes.map(note => (
                                <div key={note.id} className={`${currentTheme.badge} rounded-lg p-3`}>
                                  <p className={`text-sm ${currentTheme.text}`}>{note.text}</p>
                                  <p className={`text-xs ${currentTheme.subtext} mt-1`}>
                                    {note.createdBy} • {new Date(note.createdAt).toLocaleString('id-ID')}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className={`text-sm ${currentTheme.subtext} mb-3`}>Belum ada catatan</p>
                          )}

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Tambah catatan..."
                              className={`flex-1 px-3 py-2 rounded-lg ${currentTheme.input} border-2 text-sm`}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && newNote.trim()) {
                                  addOrderNote(order.id, newNote);
                                  setNewNote('');
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newNote.trim()) {
                                  addOrderNote(order.id, newNote);
                                  setNewNote('');
                                }
                              }}
                              className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all text-sm font-medium"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className={`text-sm font-bold ${currentTheme.text} mb-2`}>Timeline</h4>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-xs">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                              <div>
                                <p className={currentTheme.text}>Dibuat oleh {order.createdBy}</p>
                                <p className={currentTheme.subtext}>{new Date(order.createdAt).toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 text-xs">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1"></div>
                              <div>
                                <p className={currentTheme.text}>Terakhir diupdate</p>
                                <p className={currentTheme.subtext}>{new Date(order.updatedAt).toLocaleString('id-ID')}</p>
                              </div>
                            </div>
                            {order.completedAt && (
                              <div className="flex items-start gap-2 text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                                <div>
                                  <p className={currentTheme.text}>Selesai</p>
                                  <p className={currentTheme.subtext}>{new Date(order.completedAt).toLocaleString('id-ID')}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Process Note Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowProcessModal(false)}>
          <div 
            className={`${currentTheme.card} rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`text-xl font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
              <Play size={24} className="text-blue-600" />
              Mulai Proses Order
            </h3>
            <p className={`text-sm ${currentTheme.subtext} mb-4`}>
              Masukkan catatan untuk memulai proses order ini:
            </p>
            <textarea
              value={processNote}
              onChange={(e) => setProcessNote(e.target.value)}
              placeholder="Contoh: Sudah konfirmasi dengan customer, mulai pengerjaan..."
              rows="4"
              autoFocus
              className={`w-full px-4 py-3 rounded-lg ${currentTheme.input} border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4`}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleConfirmProcess}
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium"
              >
                Mulai Proses
              </button>
              <button
                type="button"
                onClick={() => setShowProcessModal(false)}
                className={`flex-1 px-4 py-2.5 rounded-lg ${currentTheme.badge} hover:bg-slate-200 transition-all font-medium`}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

OrderanPage.displayName = 'OrderanPage';

export default OrderanPage;
