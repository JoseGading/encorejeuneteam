import React from 'react';
import {
  Shield, Users, Calendar, CheckCircle, Sparkles, BarChart3, LogOut,
  Save, Edit, Trash2, Plus, Sun, Moon, Settings, Upload
} from 'lucide-react';

/**
 * AdminPanel Component
 * 
 * Admin interface for managing:
 * - Employees (edit, reset)
 * - Calendar attendance data
 * - Tasks management
 * - Cleaning tasks templates
 * - Attendance statistics
 * - System actions (export/import/clear)
 */
export const AdminPanel = React.memo(({
  currentTheme,
  handleAdminLogout,
  adminTab,
  setAdminTab,
  employees,
  editingEmployee,
  setEditingEmployee,
  handleSaveEmployee,
  handleEditEmployee,
  handleDeleteTask,
  handleResetEmployee,
  currentMonth,
  currentYear,
  monthNames,
  yearlyAttendance,
  statusConfig,
  handleEditCalendar,
  shiftTasks,
  newCleaningTask,
  setNewCleaningTask,
  handleAddCleaningTask,
  handleDeleteCleaningTask,
  calculateMonthlyStats,
  exportData,
  importData,
  setShowClearModal
}) => {
  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${currentTheme.accent} p-3 rounded-xl`}>
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Admin Panel</h2>
              <p className={`text-sm ${currentTheme.subtext}`}>Kelola semua data sistem</p>
            </div>
          </div>
          <button
            onClick={handleAdminLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all ${currentTheme.shadow} text-sm font-medium hover:scale-[1.01] active:scale-[0.99]`}
          >
            <LogOut size={16} />
            Logout Admin
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-2`}>
        <div className="flex gap-2">
          {[
            { id: 'employees', label: 'Karyawan', icon: Users },
            { id: 'calendar', label: 'Kalender', icon: Calendar },
            { id: 'tasks', label: 'Tasks', icon: CheckCircle },
            { id: 'cleaning', label: 'Task Kebersihan', icon: Sparkles },
            { id: 'attendance', label: 'Kehadiran', icon: BarChart3 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${adminTab === tab.id
                  ? `${currentTheme.accent} text-white ${currentTheme.shadow}`
                  : `${currentTheme.badge} hover:bg-white/5`
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Management Tab */}
      {adminTab === 'employees' && (
        <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-blue-500" size={24} />
            <h3 className={`text-xl font-bold ${currentTheme.text}`}>Manajemen Karyawan</h3>
          </div>

          <div className="space-y-4">
            {employees.map(emp => (
              <div key={emp.id} className={`${currentTheme.badge} rounded-xl p-5 border-2 ${currentTheme.borderColor}`}>
                {editingEmployee && editingEmployee.id === emp.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>Nama:</label>
                        <input
                          type="text"
                          value={editingEmployee.name}
                          onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} text-sm`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${currentTheme.text} mb-1`}>ID:</label>
                        <input
                          type="number"
                          value={editingEmployee.id}
                          onChange={(e) => setEditingEmployee({ ...editingEmployee, id: parseInt(e.target.value) })}
                          className={`w-full px-3 py-2 rounded-lg border ${currentTheme.input} text-sm`}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEmployee}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all text-sm font-medium hover:scale-[1.01] active:scale-[0.99]`}
                      >
                        <Save size={16} />
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingEmployee(null)}
                        className={`px-4 py-2 rounded-lg ${currentTheme.badge} hover:bg-white/5 transition-all text-sm font-medium hover:scale-[1.01] active:scale-[0.99]`}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-lg font-bold ${currentTheme.text}`}>{emp.name}</h4>
                      <p className={`text-sm ${currentTheme.subtext}`}>
                        ID: {emp.id} |
                        Status: {emp.checkedIn ? '✅ Checked In' : '⭕ Not Checked In'} |
                        Shift: {emp.shift || '-'} |
                        Tasks: 🧹 {emp.cleaningTasks.length} | 💼 {emp.workTasks.length}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditEmployee(emp)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all text-sm font-medium hover:scale-[1.01] active:scale-[0.99]`}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                  </div>
                )}

                {/* Tasks List */}
                {!editingEmployee || editingEmployee.id !== emp.id ? (
                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    {/* Cleaning Tasks */}
                    <div>
                      <h5 className={`text-sm font-semibold ${currentTheme.text} mb-2`}>🧹 Task Kebersihan ({emp.cleaningTasks.length})</h5>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {emp.cleaningTasks.map(task => (
                          <div key={task.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded p-2 text-xs">
                            <span className={task.completed ? 'line-through opacity-60' : ''}>{task.task}</span>
                            <button
                              onClick={() => handleDeleteTask(emp.id, 'cleaning', task.id)}
                              className="text-blue-300 hover:text-blue-200"
                              title="Hapus task"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Work Tasks */}
                    <div>
                      <h5 className={`text-sm font-semibold ${currentTheme.text} mb-2`}>💼 Task Pekerjaan ({emp.workTasks.length})</h5>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {emp.workTasks.map(task => (
                          <div key={task.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded p-2 text-xs">
                            <span className={task.completed ? 'line-through opacity-60' : ''}>{task.task}</span>
                            <button
                              onClick={() => handleDeleteTask(emp.id, 'work', task.id)}
                              className="text-blue-300 hover:text-blue-200"
                              title="Hapus task"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Edit Tab */}
      {adminTab === 'calendar' && (
        <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-blue-300" size={24} />
            <h3 className={`text-xl font-bold ${currentTheme.text}`}>Edit Kalender Kehadiran</h3>
          </div>

          <div className="space-y-6">
            {employees.map(emp => {
              const days = new Date(currentYear, currentMonth + 1, 0).getDate();
              const first = new Date(currentYear, currentMonth, 1).getDay();

              return (
                <div key={emp.id} className={`${currentTheme.badge} rounded-xl p-5 border-2 ${currentTheme.borderColor}`}>
                  <h4 className={`text-lg font-bold ${currentTheme.text} mb-4`}>{emp.name} - {monthNames[currentMonth]} {currentYear}</h4>

                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                      <div key={d} className={`text-center text-xs font-medium ${currentTheme.subtext} py-1.5`}>{d}</div>
                    ))}
                    {[...Array(first)].map((_, i) => <div key={`e-${i}`}></div>)}
                    {[...Array(days)].map((_, i) => {
                      const day = i + 1;
                      const data = yearlyAttendance[emp.name]?.[currentMonth]?.[day];
                      const hasData = data && data.status && data.status !== 'belum';

                      // Check if this day has overtime (multiple statuses)
                      const hasOvertime = data && data.status === 'lembur';
                      const baseStatus = hasOvertime && data.overtimeBaseStatus ? data.overtimeBaseStatus : data?.status;

                      return (
                        <div key={day} className="relative">
                          {hasData ? (
                            hasOvertime ? (
                              // Multi-color for overtime days (hadir/telat + lembur)
                              <button
                                onClick={() => handleEditCalendar(emp.name, currentMonth, day, currentYear)}
                                className="w-full calendar-cell rounded-lg p-2.5 text-center text-white text-xs font-medium hover:scale-105 transition-transform cursor-pointer shadow-sm overflow-hidden relative"
                                title={`${day} ${monthNames[currentMonth]}: ${baseStatus === 'telat' ? 'Telat' : 'Hadir'} + Lembur${data.lateHours > 0 ? ` (${data.lateHours}h telat)` : ''}`}
                              >
                                {/* Base status color (left half) */}
                                <div className={`absolute inset-0 ${statusConfig[baseStatus]?.bg || 'bg-blue-600'}`} style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}></div>
                                {/* Overtime color (right half) */}
                                <div className={`absolute inset-0 ${statusConfig?.lembur?.bg || 'bg-emerald-600'}`} style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
                                {/* Day number */}
                                <span className="relative z-10">{day}</span>
                              </button>
                            ) : (
                              // Single color for normal days
                              <button
                                onClick={() => handleEditCalendar(emp.name, currentMonth, day, currentYear)}
                                className={`w-full calendar-cell ${statusConfig?.[data.status]?.bg || 'bg-blue-600'} rounded-lg p-2.5 text-center text-white text-xs font-medium hover:scale-105 transition-transform cursor-pointer shadow-sm`}
                                title={`${day} ${monthNames[currentMonth]}: ${(statusConfig?.[data.status]?.label || data.status)}${data.lateHours > 0 ? ` (${data.lateHours}h telat)` : ''}`}
                              >
                                {day}
                              </button>
                            )
                          ) : (
                            <button
                              onClick={() => handleEditCalendar(emp.name, currentMonth, day, currentYear)}
                              className={`w-full calendar-cell ${currentTheme.badge} rounded-lg p-2.5 text-center text-xs font-medium border border-dashed border-white/10 hover:scale-105 transition-transform cursor-pointer ${currentTheme.text}`}
                              title={`Klik untuk edit ${day} ${monthNames[currentMonth]} ${currentYear}`}
                            >
                              {day}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {adminTab === 'tasks' && (
        <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="text-blue-500" size={24} />
            <h3 className={`text-xl font-bold ${currentTheme.text}`}>Manajemen Tasks</h3>
          </div>

          <div className="space-y-6">
            {employees.map(emp => (
              <div key={emp.id} className={`${currentTheme.badge} rounded-xl p-5 border-2 ${currentTheme.borderColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg font-bold ${currentTheme.text}`}>{emp.name}</h4>
                  <button
                    onClick={() => handleResetEmployee(emp.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-950/40 text-blue-200 hover:bg-blue-900/40 transition-all text-sm font-medium border border-blue-500/15 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Trash2 size={14} />
                    Reset Data
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Cleaning Tasks */}
                  <div>
                    <h5 className={`text-sm font-semibold ${currentTheme.text} mb-2`}>🧹 Task Kebersihan ({emp.cleaningTasks.length})</h5>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {emp.cleaningTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded p-2 text-xs">
                          <div className="flex-1">
                            <p className={task.completed ? 'line-through opacity-60' : ''}>{task.task}</p>
                            {task.completed && task.duration && (
                              <p className="text-xs text-blue-200">✓ {task.duration}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteTask(emp.id, 'cleaning', task.id)}
                            className="text-blue-300 hover:text-blue-200 ml-2"
                            title="Hapus task"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {emp.cleaningTasks.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-4">Tidak ada task</p>
                      )}
                    </div>
                  </div>

                  {/* Work Tasks */}
                  <div>
                    <h5 className={`text-sm font-semibold ${currentTheme.text} mb-2`}>💼 Task Pekerjaan ({emp.workTasks.length})</h5>
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {emp.workTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded p-2 text-xs">
                          <div className="flex-1">
                            <p className={task.completed ? 'line-through opacity-60' : ''}>{task.task}</p>
                            {task.completed && task.duration && (
                              <p className="text-xs text-blue-200">✓ {task.duration}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteTask(emp.id, 'work', task.id)}
                            className="text-blue-300 hover:text-blue-200 ml-2"
                            title="Hapus task"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      {emp.workTasks.length === 0 && (
                        <p className="text-xs text-slate-400 text-center py-4">Tidak ada task</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cleaning Tasks Management Tab */}
      {adminTab === 'cleaning' && (
        <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-blue-300" size={24} />
            <h3 className={`text-xl font-bold ${currentTheme.text}`}>Manajemen Task Kebersihan</h3>
          </div>

          <div className={`mb-6 p-4 ${currentTheme.accentSoftBg} border ${currentTheme.borderColor} rounded-xl`}>
            <p className={`text-sm ${currentTheme.text} mb-2`}>
              <strong>ℹ️ Info:</strong> Task yang ditambahkan akan otomatis di-<strong>randomize</strong> oleh sistem saat karyawan check-in.
            </p>
            <p className={`text-xs ${currentTheme.subtext}`}>
              Sistem akan mendistribusikan task secara adil dan acak berdasarkan tanggal untuk memastikan pembagian yang merata.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Shift Pagi */}
            <div className={`${currentTheme.badge} rounded-xl p-5 border-2 ${currentTheme.borderColor}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`${currentTheme.accent} p-2 rounded-lg`}>
                  <Sun className="text-white" size={20} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${currentTheme.text}`}>Shift Pagi</h4>
                  <p className={`text-xs ${currentTheme.subtext}`}>{shiftTasks.pagi.length} task</p>
                </div>
              </div>

              {/* Add New Task */}
              <div className="mb-4">
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Tambah Task Baru:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCleaningTask.pagi}
                    onChange={(e) => setNewCleaningTask(prev => ({ ...prev, pagi: e.target.value }))}
                    placeholder="Contoh: Sapu ruang tamu..."
                    className={`flex-1 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500/40 ${currentTheme.input} text-sm`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCleaningTask('pagi');
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddCleaningTask('pagi')}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all text-sm font-medium hover:scale-[1.01] active:scale-[0.99]`}
                  >
                    <Plus size={16} />
                    Tambah
                  </button>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {shiftTasks.pagi.map((task, index) => (
                  <div key={index} className="flex items-start justify-between bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                    <div className="flex-1 flex items-start gap-2">
                      <span className="text-blue-300 font-bold text-xs mt-0.5">{index + 1}.</span>
                      <p className={currentTheme.text}>{task}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCleaningTask('pagi', index)}
                      className="text-blue-300 hover:text-blue-200 ml-2 flex-shrink-0"
                      title="Hapus task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {shiftTasks.pagi.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-8">Belum ada task kebersihan</p>
                )}
              </div>
            </div>

            {/* Shift Malam */}
            <div className={`${currentTheme.badge} rounded-xl p-5 border-2 ${currentTheme.borderColor}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`${currentTheme.accent} p-2 rounded-lg`}>
                  <Moon className="text-white" size={20} />
                </div>
                <div>
                  <h4 className={`text-lg font-bold ${currentTheme.text}`}>Shift Malam</h4>
                  <p className={`text-xs ${currentTheme.subtext}`}>{shiftTasks.malam.length} task</p>
                </div>
              </div>

              {/* Add New Task */}
              <div className="mb-4">
                <label className={`block text-sm font-medium ${currentTheme.text} mb-2`}>Tambah Task Baru:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCleaningTask.malam}
                    onChange={(e) => setNewCleaningTask(prev => ({ ...prev, malam: e.target.value }))}
                    placeholder="Contoh: Bersihkan kamar mandi..."
                    className={`flex-1 px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-500/40 ${currentTheme.input} text-sm`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCleaningTask('malam');
                      }
                    }}
                  />
                  <button
                    onClick={() => handleAddCleaningTask('malam')}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all text-sm font-medium hover:scale-[1.01] active:scale-[0.99]`}
                  >
                    <Plus size={16} />
                    Tambah
                  </button>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {shiftTasks.malam.map((task, index) => (
                  <div key={index} className="flex items-start justify-between bg-white/5 border border-white/10 rounded-lg p-3 text-sm">
                    <div className="flex-1 flex items-start gap-2">
                      <span className="text-blue-300 font-bold text-xs mt-0.5">{index + 1}.</span>
                      <p className={currentTheme.text}>{task}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCleaningTask('malam', index)}
                      className="text-blue-300 hover:text-blue-200 ml-2 flex-shrink-0"
                      title="Hapus task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {shiftTasks.malam.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-8">Belum ada task kebersihan</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Data Tab */}
      {adminTab === 'attendance' && (
        <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-blue-300" size={24} />
            <h3 className={`text-xl font-bold ${currentTheme.text}`}>Data Kehadiran</h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {employees.map(emp => {
              const monthStats = calculateMonthlyStats(emp.name, currentMonth);
              return (
                <div key={emp.id} className={`${currentTheme.badge} rounded-xl p-4 border-2 ${currentTheme.borderColor}`}>
                  <h4 className={`text-lg font-bold ${currentTheme.text} mb-3`}>{emp.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={currentTheme.subtext}>Hadir:</span>
                      <span className="font-semibold text-blue-200">{monthStats.hadir}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={currentTheme.subtext}>Telat:</span>
                      <span className="font-semibold text-blue-200">{monthStats.telat} ({monthStats.totalLateHours}h)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={currentTheme.subtext}>Lembur:</span>
                      <span className="font-semibold text-blue-200">{monthStats.lembur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={currentTheme.subtext}>Libur:</span>
                      <span className="font-semibold text-blue-200">{monthStats.libur}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* System Actions - Always visible */}
      <div className={`${currentTheme.card} rounded-2xl ${currentTheme.shadow} border-2 ${currentTheme.borderColor} p-6`}>
        <div className="flex items-center gap-2 mb-6">
          <Settings className="text-blue-300" size={24} />
          <h3 className={`text-xl font-bold ${currentTheme.text}`}>Aksi Sistem</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={exportData}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all ${currentTheme.shadow} font-medium hover:scale-[1.01] active:scale-[0.99]`}
          >
            <Upload size={18} />
            Export Data
          </button>

          <label className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg ${currentTheme.accent} text-white ${currentTheme.accentHover} transition-all ${currentTheme.shadow} font-medium cursor-pointer hover:scale-[1.01] active:scale-[0.99]`}>
            <Upload size={18} />
            Import Data
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>

          <button
            onClick={() => setShowClearModal(true)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg ${currentTheme.accentSoftBg} ${currentTheme.accentText} ${currentTheme.accentHover} transition-all ${currentTheme.shadow} font-medium border ${currentTheme.borderColor} hover:scale-[1.01] active:scale-[0.99]`}
          >
            <Trash2 size={18} />
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
});

AdminPanel.displayName = 'AdminPanel';
