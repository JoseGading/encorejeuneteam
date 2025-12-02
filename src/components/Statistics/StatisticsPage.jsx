import React, { useMemo } from 'react';
import { 
  Calendar, CheckCircle, Clock, AlertCircle, ChevronLeft, ChevronRight,
  Bell, Play, Square, Pause, Coffee
} from 'lucide-react';

/**
 * StatisticsPage Component
 * 
 * Extracted from App.js monolith
 * Shows task completion history and attendance statistics
 * 
 * @param {Object} props
 * @param {Array} props.employees - Employee data array
 * @param {Array} props.attentions - Attention items array  
 * @param {Object} props.currentTheme - Current theme configuration
 * @param {String} props.selectedDate - Selected date for history view
 * @param {Function} props.setSelectedDate - Selected date setter
 * @param {String} props.statisticsTab - Active tab ('history' or 'attendance')
 * @param {Function} props.setStatisticsTab - Tab setter
 * @param {Number} props.currentMonth - Current month index
 * @param {Function} props.setCurrentMonth - Month setter
 * @param {Number} props.currentYear - Current year
 * @param {Object} props.yearlyAttendance - Yearly attendance data
 * @param {Object} props.statusConfig - Status configuration object
 * @param {Array} props.monthNames - Month names array
 * @param {Function} props.calculateMonthlyStats - Calculate monthly statistics function
 */
export const StatisticsPage = React.memo(({
  employees,
  attentions,
  currentTheme,
  selectedDate,
  setSelectedDate,
  statisticsTab,
  setStatisticsTab,
  currentMonth,
  setCurrentMonth,
  currentYear,
  yearlyAttendance,
  statusConfig,
  monthNames,
  calculateMonthlyStats
}) => {
  const days = new Date(currentYear, currentMonth + 1, 0).getDate();
  const first = new Date(currentYear, currentMonth, 1).getDay();
  const active = attentions.filter(a => !a.completed);

  // Memoize completed tasks to prevent re-render on timer updates
  const employeeCompletedTasks = useMemo(() => {
    return employees.map(emp => {
      const currentTasks = [...emp.cleaningTasks, ...emp.workTasks].filter(t => {
        if (!t.completed) return false;
        const taskDate = t.completedAt ? new Date(t.completedAt).toDateString() : null;
        return taskDate === selectedDate;
      });
      
      // Use shiftDate for archived tasks, fallback to completedAt
      const archivedTasks = emp.completedTasksHistory.filter(t => {
        const taskDate = t.shiftDate || (t.completedAt ? new Date(t.completedAt).toDateString() : null);
        return taskDate === selectedDate;
      });
      
      return {
        emp,
        completedTasks: [...currentTasks, ...archivedTasks]
      };
    });
  }, [employees, selectedDate]);

  return (
    <div className="space-y-8">
      {active.length > 0 && (
        <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-5`}>
          <div className="flex items-center gap-2.5 mb-4">
            <Bell className="text-red-500" size={20} />
            <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Active Attentions</h3>
          </div>
          <div className="space-y-2.5">
            {active.map(a => (
              <div key={a.id} className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-slate-800 font-medium mb-1.5">{a.text}</p>
                {a.image && <img src={a.image} alt="Att" className="max-w-sm rounded-lg border border-slate-300 mb-1.5" />}
                <p className="text-xs text-slate-500">📝 {a.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Selector */}
      <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-2`}>
        <div className="flex gap-2">
          <button
            onClick={() => setStatisticsTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition-all text-sm ${
              statisticsTab === 'history'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : `${currentTheme.badge} hover:opacity-80`
            }`}
          >
            <CheckCircle size={18} />
            History Task Selesai
          </button>
          <button
            onClick={() => setStatisticsTab('attendance')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium transition-all text-sm ${
              statisticsTab === 'attendance'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : `${currentTheme.badge} hover:opacity-80`
            }`}
          >
            <Calendar size={18} />
            Statistik Kehadiran
          </button>
        </div>
      </div>

      {/* Task History Section */}
      {statisticsTab === 'history' && (
      <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2.5 rounded-xl">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${currentTheme.text}`}>History Task Selesai</h2>
              <p className={`text-xs ${currentTheme.subtext}`}>
                {selectedDate === new Date().toDateString() 
                  ? 'Task hari ini' 
                  : `Task tanggal ${new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`}
              </p>
            </div>
          </div>
          
          {selectedDate !== new Date().toDateString() && (
            <button
              onClick={() => setSelectedDate(new Date().toDateString())}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-xs font-medium hover:opacity-90 transition-all"
            >
              Kembali ke Hari Ini
            </button>
          )}
        </div>

        {/* 3 Kolom per Employee */}
        <div className="grid grid-cols-3 gap-6">
          {employeeCompletedTasks.map(({ emp, completedTasks }) => {

            return (
              <div key={emp.id} className={`${currentTheme.card} rounded-xl shadow-md border-2 p-4`}>
                <div className="mb-4 pb-3 border-b">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white">
                      {emp.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-bold ${currentTheme.text}`}>{emp.name}</h3>
                      <span className={`text-xs ${currentTheme.subtext}`}>
                        {completedTasks.length} task selesai
                      </span>
                    </div>
                  </div>
                  
                  {/* Shift Info */}
                  {emp.shifts && emp.shifts.length > 0 && (() => {
                    const todayShift = emp.shifts.find(s => s.date === selectedDate);
                    if (todayShift) {
                      return (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full ${todayShift.shift === 'pagi' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                {todayShift.shift === 'pagi' ? '☀️ Pagi' : '🌙 Malam'}
                              </span>
                              <span className={currentTheme.subtext}>
                                {todayShift.status === 'telat' ? `⚠️ Telat ${todayShift.lateHours}h` : '✅ Tepat Waktu'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                              <Play size={12} className="text-emerald-500" />
                              <span>Mulai: <strong>{todayShift.checkInTime}</strong></span>
                            </div>
                            {todayShift.endTime && (
                              <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                                <Square size={12} className="text-rose-500" />
                                <span>Selesai: <strong>{todayShift.endTime}</strong></span>
                              </div>
                            )}
                            {todayShift.checkInTime && todayShift.endTime && (() => {
                              const [startH, startM] = todayShift.checkInTime.split(':').map(Number);
                              const [endH, endM] = todayShift.endTime.split(':').map(Number);
                              const startMinutes = startH * 60 + startM;
                              const endMinutes = endH * 60 + endM;
                              const durationMinutes = endMinutes - startMinutes;
                              const hours = Math.floor(durationMinutes / 60);
                              const minutes = durationMinutes % 60;
                              return (
                                <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                                  <Clock size={12} className="text-blue-500" />
                                  <span>Durasi: <strong>{hours}h {minutes}m</strong></span>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>

                <div className="space-y-2">
                {completedTasks.map((task, taskIdx) => (
                  <div key={`task-${emp.id}-${task.id}-${taskIdx}`} className={`${currentTheme.badge} rounded-lg p-3 border`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                          <p className={`text-sm font-medium ${currentTheme.text}`}>{task.task}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {task.completedAtDisplay && (
                            <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                              <Calendar size={12} />
                              <span>Selesai: {task.completedAtDisplay}</span>
                            </div>
                          )}
                          {task.duration && (
                            <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                              <Clock size={12} />
                              <span>Durasi: {task.duration}</span>
                            </div>
                          )}
                          {task.startTime && (
                            <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                              <Play size={12} />
                              <span>Mulai: {task.startTime}</span>
                            </div>
                          )}
                          {task.endTime && (
                            <div className={`flex items-center gap-1 ${currentTheme.subtext}`}>
                              <Square size={12} />
                              <span>Selesai: {task.endTime}</span>
                            </div>
                          )}
                        </div>

                        {/* ✅ FIX BUG #2: Display Pause History with detailed info */}
                        {task.pauseHistory && task.pauseHistory.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-200">
                            <p className="text-xs font-semibold text-orange-600 mb-1.5 flex items-center gap-1">
                              <Pause size={12} />
                              Riwayat Pause ({task.pauseHistory.length}x):
                            </p>
                            <div className="space-y-1">
                              {task.pauseHistory.map((pause, idx) => (
                                <div key={idx} className="text-xs bg-orange-50 border border-orange-200 rounded px-2 py-1.5">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-orange-700 font-medium">
                                      ⏸️ {pause.startTime} → {pause.endTime || 'Belum selesai'}
                                    </span>
                                  </div>
                                  <p className="text-slate-600 text-xs">📋 Alasan: {pause.reason}</p>
                                  {pause.dateDisplay && (
                                    <p className="text-slate-500 text-xs mt-0.5">📅 {pause.dateDisplay}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                            task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            task.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {task.priority}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${currentTheme.badge}`}>
                            {task.progress}% progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {completedTasks.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle size={40} className="text-slate-300 mx-auto mb-2" />
                    <p className={`text-xs ${currentTheme.subtext}`}>Belum ada task selesai</p>
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {employees.every(emp => [...emp.cleaningTasks, ...emp.workTasks].filter(t => t.completed).length === 0) && (
          <div className="text-center py-8">
            <AlertCircle size={48} className="text-slate-300 mx-auto mb-3" />
            <p className={`text-sm ${currentTheme.subtext}`}>Belum ada task yang diselesaikan</p>
          </div>
        )}

        {/* Break History Section */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}>
            <Coffee size={20} />
            Riwayat Istirahat
          </h3>
          {employees.map(emp => {
            // Filter break history by selected date
            const filteredBreaks = emp.breakHistory.filter(brk => {
              if (!brk.date) return false;
              const breakDate = new Date(brk.date).toDateString();
              return breakDate === selectedDate;
            });
            
            if (filteredBreaks.length === 0) return null;
            
            return (
              <div key={`break-${emp.id}`} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
                    {emp.name[0]}
                  </div>
                  <h4 className={`text-sm font-semibold ${currentTheme.text}`}>{emp.name}</h4>
                  <span className={`text-xs ${currentTheme.badge} px-2 py-0.5 rounded-full`}>
                    {filteredBreaks.length} istirahat
                  </span>
                </div>
                
                <div className="space-y-2">
                  {filteredBreaks.map((brk, idx) => (
                    <div key={`break-${emp.id}-${idx}-${brk.date}`} className={`${currentTheme.badge} rounded-lg p-3 border ${brk.isLate ? 'border-orange-300' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Coffee size={14} className={brk.isLate ? 'text-orange-500' : 'text-emerald-500'} />
                            <span className={`text-xs font-medium ${brk.isLate ? 'text-orange-600' : 'text-emerald-600'}`}>
                              {brk.shift === 'pagi' ? '☀️ Shift Pagi' : '🌙 Shift Malam'}
                            </span>
                            {brk.isLate && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                                Telat {brk.lateDuration} jam
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                            <div className={currentTheme.subtext}>
                              <span className="font-medium">Mulai:</span> {brk.startTime}
                            </div>
                            <div className={currentTheme.subtext}>
                              <span className="font-medium">Selesai:</span> {brk.endTime}
                            </div>
                            <div className={currentTheme.subtext}>
                              <span className="font-medium">Durasi:</span> {brk.duration} menit
                            </div>
                          </div>
                          
                          <div className={`text-xs ${currentTheme.subtext} mt-1`}>
                            {brk.dateDisplay || brk.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {employees.every(emp => emp.breakHistory.length === 0) && (
            <div className="text-center py-6">
              <Coffee size={40} className="text-slate-300 mx-auto mb-2" />
              <p className={`text-sm ${currentTheme.subtext}`}>Belum ada riwayat istirahat</p>
            </div>
          )}
        </div>

        {/* Izin History Section */}
        <div className="mt-8">
          <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4 flex items-center gap-2`}>
            <Bell size={20} />
            Riwayat Izin
          </h3>
          {employees.map(emp => {
            // Filter izin history by selected date
            const filteredIzin = emp.izinHistory.filter(izin => {
              if (!izin.date) return false;
              const izinDate = new Date(izin.date).toDateString();
              return izinDate === selectedDate;
            });
            
            if (filteredIzin.length === 0) return null;
            
            return (
              <div key={`izin-${emp.id}`} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
                    {emp.name[0]}
                  </div>
                  <h4 className={`text-sm font-semibold ${currentTheme.text}`}>{emp.name}</h4>
                  <span className={`text-xs ${currentTheme.badge} px-2 py-0.5 rounded-full`}>
                    {filteredIzin.length} izin
                  </span>
                </div>
                
                <div className="space-y-2">
                  {filteredIzin.map((izin, idx) => (
                    <div key={`izin-${emp.id}-${idx}-${izin.date}`} className={`${currentTheme.badge} rounded-lg p-3 border border-violet-200`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Bell size={14} className="text-violet-500" />
                            <span className="text-xs font-medium text-violet-600">
                              {izin.shift === 'pagi' ? '☀️ Shift Pagi' : '🌙 Shift Malam'}
                            </span>
                          </div>
                          
                          <div className="bg-violet-50 border border-violet-200 rounded px-2 py-1.5 mb-2">
                            <p className="text-xs text-violet-700 font-medium">
                              📋 Alasan: {izin.reason}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                            <div className={currentTheme.subtext}>
                              <span className="font-medium">Mulai:</span> {izin.startTime}
                            </div>
                            <div className={currentTheme.subtext}>
                              <span className="font-medium">Selesai:</span> {izin.endTime}
                            </div>
                            <div className={currentTheme.subtext}>
                              <span className="font-medium">Durasi:</span> {izin.duration} menit
                            </div>
                          </div>
                          
                          <div className={`text-xs ${currentTheme.subtext} mt-1`}>
                            {izin.dateDisplay || izin.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {employees.every(emp => emp.izinHistory.length === 0) && (
            <div className="text-center py-6">
              <Bell size={40} className="text-slate-300 mx-auto mb-2" />
              <p className={`text-sm ${currentTheme.subtext}`}>Belum ada riwayat izin</p>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Attendance Statistics Section */}
      {statisticsTab === 'attendance' && (
      <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Statistik Kehadiran</h2>
            <p className={`text-sm ${currentTheme.subtext} mt-1`}>{monthNames[currentMonth]} {currentYear}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))} disabled={currentMonth === 0} className={`p-2 rounded-lg border ${currentTheme.badge} hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))} disabled={currentMonth === 11} className={`p-2 rounded-lg border ${currentTheme.badge} hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {employees.map(e => {
          const mStats = calculateMonthlyStats(e.name, currentMonth);
          return (
            <div key={e.id} className="mb-8 last:mb-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${currentTheme.text}`}>{e.name}</h3>
                <div className="flex gap-2 text-xs">
                  {['hadir', 'telat', 'lembur', 'izin', 'libur'].map(s => (
                    <div key={s} className={`bg-${s === 'hadir' ? 'emerald' : s === 'telat' ? 'rose' : s === 'lembur' ? 'amber' : s === 'izin' ? 'violet' : 'blue'}-50 text-${s === 'hadir' ? 'emerald' : s === 'telat' ? 'rose' : s === 'lembur' ? 'amber' : s === 'izin' ? 'violet' : 'blue'}-700 px-2.5 py-1 rounded-lg border border-${s === 'hadir' ? 'emerald' : s === 'telat' ? 'rose' : s === 'lembur' ? 'amber' : s === 'izin' ? 'violet' : 'blue'}-200 font-medium`}>
                      {statusConfig[s].label}: {mStats[s]}{s === 'telat' && mStats.totalLateHours > 0 ? ` (${mStats.totalLateHours}j)` : ''}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
                  <div key={d} className={`text-center text-xs font-medium ${currentTheme.subtext} py-1.5`}>{d}</div>
                ))}
                {[...Array(first)].map((_, i) => <div key={`e-${i}`}></div>)}
                {[...Array(days)].map((_, i) => {
                  const day = i + 1;
                  const data = yearlyAttendance[e.name][currentMonth][day];
                  
                  // Only show status if there's actual data (not default/empty)
                  const hasData = data && data.status && data.status !== 'belum';
                  
                  // Check if this day has overtime (multiple statuses)
                  const hasOvertime = data && data.status === 'lembur';
                  const baseStatus = hasOvertime && data.overtimeBaseStatus ? data.overtimeBaseStatus : data?.status;
                  
                  return (
                    <div key={day} className="relative">
                      {hasData ? (
                        hasOvertime ? (
                          // Multi-color for overtime days (hadir/telat + lembur)
                          <div 
                            className="calendar-cell rounded-lg p-2.5 text-center text-white text-xs font-medium hover:scale-105 transition-transform cursor-pointer shadow-sm overflow-hidden relative"
                            onClick={() => {
                              const clickedDate = new Date(currentYear, currentMonth, day);
                              setSelectedDate(clickedDate.toDateString());
                              setStatisticsTab('history');
                            }} 
                            title={`${day} ${monthNames[currentMonth]}: ${baseStatus === 'telat' ? 'Telat' : 'Hadir'} + Lembur${data.lateHours > 0 ? ` (${data.lateHours}h telat)` : ''}`}
                          >
                            {/* Base status color (left half) */}
                            <div className={`absolute inset-0 ${statusConfig[baseStatus]?.bg || 'bg-emerald-500'}`} style={{clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'}}></div>
                            {/* Overtime color (right half) */}
                            <div className="absolute inset-0 bg-amber-500" style={{clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'}}></div>
                            {/* Day number */}
                            <span className="relative z-10">{day}</span>
                          </div>
                        ) : (
                          // Single color for normal days
                          <div 
                            className={`calendar-cell ${statusConfig[data.status].bg} rounded-lg p-2.5 text-center text-white text-xs font-medium hover:scale-105 transition-transform cursor-pointer shadow-sm`} 
                            onClick={() => {
                              const clickedDate = new Date(currentYear, currentMonth, day);
                              setSelectedDate(clickedDate.toDateString());
                              setStatisticsTab('history');
                            }} 
                            title={`${day} ${monthNames[currentMonth]}: ${statusConfig[data.status].label}${data.lateHours > 0 ? ` (${data.lateHours}h telat)` : ''}`}
                          >
                            {day}
                          </div>
                        )
                      ) : (
                        <div 
                          className={`calendar-cell ${currentTheme.badge} rounded-lg p-2.5 text-center text-xs font-medium border border-dashed border-slate-300`}
                          title={`${day} ${monthNames[currentMonth]}: Tidak ada data`}
                        >
                          {day}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Total Late Hours Summary */}
              {mStats.totalLateHours > 0 && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="text-rose-600" size={16} />
                      <span className="text-sm font-medium text-rose-700">Total Jam Telat:</span>
                    </div>
                    <span className="text-lg font-bold text-rose-600">{mStats.totalLateHours} jam</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
});

StatisticsPage.displayName = 'StatisticsPage';
