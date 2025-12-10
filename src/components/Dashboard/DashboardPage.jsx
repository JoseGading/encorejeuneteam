import React, { useMemo } from 'react';
import { 
  Calendar, Users, Sun, Moon, TrendingUp, CheckCircle, Clock, 
  AlertCircle, Sparkles, Zap, GripVertical, Trash2, Play, Square, 
  Pause, Coffee, Plus, Bell 
} from 'lucide-react';

/**
 * DashboardPage Component
 * 
 * Extracted from App.js monolith
 * Main dashboard showing employee cards with tasks and real-time productivity
 * 
 * @param {Object} props
 * @param {Array} props.employees - Employee data array
 * @param {Object} props.currentTheme - Current theme configuration
 * @param {JSX.Element} props.AttentionSection - Attention section component
 * @param {String} props.selectedEmployee - Selected employee filter
 * @param {Function} props.setSelectedEmployee - Selected employee setter
 * @param {Object} props.newTask - New task input state
 * @param {Function} props.setNewTask - New task input setter
 * @param {Boolean} props.showCompletedTasks - Show completed tasks toggle
 * @param {Boolean} props.isProcessing - Processing state for buttons
 * @param {Object} props.statusConfig - Status configuration
 * @param {Object} props.priorityColors - Priority colors configuration
 * @param {Function} props.detectShift - Detect current shift function
 * @param {Function} props.updateLateHours - Update late hours function
 * @param {Function} props.startBreak - Start break function
 * @param {Function} props.endBreak - End break function
 * @param {Function} props.startIzin - Start izin function
 * @param {Function} props.endIzin - End izin function
 * @param {Function} props.endShift - End shift function
 * @param {Function} props.handleDragStart - Drag start handler
 * @param {Function} props.handleDragOver - Drag over handler
 * @param {Function} props.handleDrop - Drop handler
 * @param {Function} props.calculateElapsedTime - Calculate elapsed time
 * @param {Function} props.deleteTask - Delete task function
 * @param {Function} props.updateProgress - Update progress function
 * @param {Function} props.updatePriority - Update priority function
 * @param {Function} props.startTask - Start task function
 * @param {Function} props.pauseTask - Pause task function
 * @param {Function} props.resumeTask - Resume task function
 * @param {Function} props.taskBreak - Task break function
 * @param {Function} props.resumeFromTaskBreak - Resume from task break function
 * @param {Function} props.endTask - End task function
 * @param {Function} props.addTask - Add task function
 */
export const DashboardPage = React.memo(({
  employees,
  currentTheme,
  AttentionSection,
  selectedEmployee,
  setSelectedEmployee,
  newTask,
  setNewTask,
  showCompletedTasks,
  isProcessing,
  statusConfig,
  priorityColors,
  detectShift,
  updateLateHours,
  startBreak,
  endBreak,
  startIzin,
  endIzin,
  endShift,
  handleDragStart,
  handleDragOver,
  handleDrop,
  calculateElapsedTime,
  deleteTask,
  updateProgress,
  updatePriority,
  startTask,
  pauseTask,
  resumeTask,
  taskBreak,
  resumeFromTaskBreak,
  endTask,
  addTask
}) => {
  const dashboardContent = useMemo(() => {
    const date = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const currentShift = detectShift();
    const checkedInCount = employees.filter(e => e.checkedIn).length;
    const shiftPagi = employees.filter(e => e.shift === 'pagi').map(e => e.name);
    const shiftMalam = employees.filter(e => e.shift === 'malam').map(e => e.name);

    // Filter employees based on selection
    // Desta (admin) dapat melihat semua tim, tim lain hanya lihat yang checked in
    const destaUser = employees.find(e => e.isAdmin);
    const isDestaView = selectedEmployee === 'all' || selectedEmployee === destaUser?.name;
    
    const filteredEmployees = selectedEmployee === 'all' 
      ? (destaUser ? employees : employees.filter(e => e.checkedIn))
      : employees.filter(emp => emp.name === selectedEmployee);

    return (
      <div className="space-y-8">
        {AttentionSection}
        
        <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>EncoreJeune Absensi</h1>
              <p className={`text-sm ${currentTheme.subtext} flex items-center gap-1.5 mt-1`}>
                <Calendar size={14} />
                {date}
              </p>
              <div className="flex gap-4 mt-2">
                <p className={`text-xs ${currentTheme.subtext} flex items-center gap-1.5`}>
                  {currentShift === 'pagi' ? <Sun size={12} className="text-orange-500" /> : <Moon size={12} className="text-blue-500" />}
                  Shift Sekarang: <span className="font-semibold">{currentShift === 'pagi' ? '☀️ Pagi' : '🌙 Malam'}</span>
                </p>
                <p className={`text-xs ${currentTheme.subtext} flex items-center gap-1.5`}>
                  <Users size={12} />
                  Check-in: <span className="font-semibold">{checkedInCount}/3</span>
                </p>
              </div>
              {(shiftPagi.length > 0 || shiftMalam.length > 0) && (
                <div className="flex gap-4 mt-2">
                  {shiftPagi.length > 0 && (
                    <p className={`text-xs ${currentTheme.subtext}`}>
                      ☀️ Pagi: {shiftPagi.join(', ')}
                    </p>
                  )}
                  {shiftMalam.length > 0 && (
                    <p className={`text-xs ${currentTheme.subtext}`}>
                      🌙 Malam: {shiftMalam.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Employee Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedEmployee('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedEmployee === 'all'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : `${currentTheme.badge} hover:opacity-80`
                }`}
              >
                Semua
              </button>
              {employees.map(emp => (
                <button
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedEmployee === emp.name
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                      : `${currentTheme.badge} hover:opacity-80`
                  }`}
                >
                  {emp.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Productivity Dashboard */}
        <div className={`${currentTheme.card} rounded-2xl shadow-md border-2 p-6`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2.5 rounded-xl">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Productivity Dashboard</h2>
              <p className={`text-xs ${currentTheme.subtext}`}>Real-time task completion tracking</p>
            </div>
          </div>
          
          <div className={`grid ${filteredEmployees.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : filteredEmployees.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
            {filteredEmployees.map(emp => {
              const allTasks = [...emp.cleaningTasks, ...emp.workTasks];
              const completed = allTasks.filter(t => t.completed).length;
              const inProgress = allTasks.filter(t => t.startTime && !t.endTime).length;
              const pending = allTasks.filter(t => !t.startTime && !t.completed).length;
              const completionRate = allTasks.length > 0 ? Math.round((completed / allTasks.length) * 100) : 0;
              
              return (
                <div key={emp.id} className={`${currentTheme.badge} rounded-xl p-4 border-2`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      {emp.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-semibold ${currentTheme.text}`}>{emp.name}</h3>
                      <p className={`text-xs ${currentTheme.subtext}`}>{completionRate}% selesai</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle size={12} /> Selesai
                      </span>
                      <span className="font-semibold text-emerald-600">{completed}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600 flex items-center gap-1">
                        <Zap size={12} /> Progress
                      </span>
                      <span className="font-semibold text-blue-600">{inProgress}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-orange-600 flex items-center gap-1">
                        <Clock size={12} /> Pending
                      </span>
                      <span className="font-semibold text-orange-600">{pending}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredEmployees.map(emp => (
          <div key={emp.id} className={`${currentTheme.card} rounded-2xl shadow-md border-2 overflow-hidden`}>
            <div className={`bg-gradient-to-r ${currentTheme.header} p-5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-slate-700 text-lg">
                    {emp.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-semibold text-white">{emp.name}</h2>
                      {emp.isAdmin && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/30 text-yellow-200 border border-yellow-400/50">
                          👑 Admin
                        </span>
                      )}
                      {emp.shift && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          emp.shift === 'pagi' 
                            ? 'bg-orange-500/30 text-orange-200 border border-orange-400/50' 
                            : 'bg-blue-500/30 text-blue-200 border border-blue-400/50'
                        }`}>
                          {emp.shift === 'pagi' ? '☀️ Pagi' : '🌙 Malam'}
                        </span>
                      )}
                      {emp.overtime && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/30 text-purple-200 border border-purple-400/50 animate-pulse">
                          ⚡ LEMBUR
                        </span>
                      )}
                      {emp.breakTime && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/30 text-amber-200 border border-amber-400/50">
                          ☕ Istirahat
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">EMP-{emp.id.toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {Object.keys(statusConfig).map(s => (
                    <div key={s} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${emp.status === s ? `${statusConfig[s].bg} text-white shadow-lg` : 'bg-slate-700 text-slate-400'} cursor-not-allowed opacity-70`}>
                      {statusConfig[s].label}
                    </div>
                  ))}
                </div>
              </div>
              {emp.status === 'telat' && (
                <div className="mt-3 flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 rounded-lg p-2.5">
                  <AlertCircle className="text-rose-300" size={16} />
                  <span className="text-xs text-rose-200">Terlambat</span>
                  <input type="number" min="0" max="12" value={emp.lateHours} onChange={(e) => updateLateHours(emp.id, parseInt(e.target.value) || 0)} className="w-16 px-2 py-1 rounded-md bg-white/10 border border-white/20 text-white text-xs text-center focus:outline-none focus:border-white/40" />
                  <span className="text-xs text-rose-200">jam</span>
                </div>
              )}
              
              {/* Tombol Istirahat, Izin & End Shift */}
              {emp.checkedIn && (
                <>
                  <div className="mt-3 flex gap-2">
                    {!emp.breakTime && !emp.hasBreakToday ? (
                      <button
                        onClick={() => startBreak(emp.id)}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-lg p-2.5 text-amber-200 text-xs font-medium transition-all ${
                          isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-500/30'
                        }`}
                      >
                        <Coffee size={16} />
                        Istirahat
                      </button>
                    ) : emp.breakTime ? (
                      <button
                        onClick={() => endBreak(emp.id)}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-2.5 text-emerald-200 text-xs font-medium transition-all ${
                          isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500/30'
                        }`}
                      >
                        <CheckCircle size={16} />
                        Selesai Istirahat
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-500/20 border border-slate-400/30 rounded-lg p-2.5 text-slate-400 text-xs font-medium cursor-not-allowed"
                      >
                        <Coffee size={16} />
                        Sudah Istirahat
                      </button>
                    )}
                    
                    {!emp.izinTime ? (
                      <button
                        onClick={() => startIzin(emp.id)}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 bg-violet-500/20 border border-violet-400/30 rounded-lg p-2.5 text-violet-200 text-xs font-medium transition-all ${
                          isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-500/30'
                        }`}
                      >
                        <Bell size={16} />
                        Izin
                      </button>
                    ) : (
                      <button
                        onClick={() => endIzin(emp.id)}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-2.5 text-emerald-200 text-xs font-medium transition-all ${
                          isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-500/30'
                        }`}
                      >
                        <CheckCircle size={16} />
                        Selesai Izin
                      </button>
                    )}
                    
                    <button
                      onClick={() => endShift(emp.id)}
                      disabled={isProcessing}
                      className={`flex-1 flex items-center justify-center gap-2 bg-rose-500/20 border border-rose-400/30 rounded-lg p-2.5 text-rose-200 text-xs font-medium transition-all ${
                        isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-500/30'
                      }`}
                    >
                      <Square size={16} />
                      End Shift
                    </button>
                  </div>
                  
                  {/* Timer Display */}
                  {(emp.breakTime || emp.izinTime) && (
                    <div className="mt-2 text-xs text-center">
                      {emp.breakTime && (
                        <span className="text-amber-300">⏱️ Istirahat dimulai: {emp.breakTime}</span>
                      )}
                      {emp.izinTime && (
                        <span className="text-violet-300">⏱️ Izin: {emp.izinReason} (Mulai: {emp.izinTime})</span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-5">
                {['cleaning', 'work'].map(type => {
                  const tasks = type === 'cleaning' ? emp.cleaningTasks : emp.workTasks;
                  const filtered = tasks.filter(t => showCompletedTasks || !t.completed);
                  const Icon = type === 'cleaning' ? Sparkles : CheckCircle;
                  const color = type === 'cleaning' ? 'emerald' : 'blue';
                  
                  return (
                    <div key={type}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`text-${color}-500`} size={18} />
                        <h3 className={`text-base font-semibold ${currentTheme.text}`}>
                          {type === 'cleaning' ? 'Task Kebersihan' : 'Task Pekerjaan'}
                        </h3>
                      </div>

                      <div className="space-y-2.5 mb-3">
                        {filtered.map(task => (
                          <div 
                            key={task.id} 
                            className={`rounded-xl border ${priorityColors[task.priority].border} ${priorityColors[task.priority].bg} p-3 cursor-move hover:shadow-md transition-shadow`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, emp.id, type, task.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, emp.id, type, task.id)}
                          >
                            <div className="flex items-start justify-between mb-2.5">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <GripVertical size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className={`text-xs ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'} break-words font-medium`}>{task.task}</p>
                                  {task.createdAt && <p className="text-xs text-slate-400 mt-1">📝 {task.createdAt}</p>}
                                  {task.completedAt && <p className={`text-xs text-${color}-600 mt-1`}>✅ {task.completedAt}</p>}
                                  {task.startTime && !task.endTime && !task.paused && !task.isPaused && (
                                    <p className={`text-xs text-${color}-600 mt-1 flex items-center gap-1 font-semibold`}>
                                      <Clock size={10} />
                                      Running: {calculateElapsedTime(task.startTime)}
                                    </p>
                                  )}
                                  {task.isPaused && (
                                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1 font-semibold">
                                      <Coffee size={10} />
                                      Break - Progress: {task.progress}%
                                    </p>
                                  )}
                                  {task.paused && (
                                    <p className="text-xs text-orange-600 mt-1 flex items-center gap-1 font-semibold">
                                      <Pause size={10} />
                                      Paused: {task.pauseHistory?.[task.pauseHistory.length - 1]?.reason}
                                    </p>
                                  )}
                                  {task.duration && (
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                      <Clock size={10} />
                                      {task.startTime} - {task.endTime} ({task.duration})
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                                <span className={`${priorityColors[task.priority].badge} text-white text-xs px-1.5 py-0.5 rounded-full`}>{task.priority}</span>
                                {type === 'work' && (
                                  <button onClick={() => deleteTask(emp.id, type, task.id)} className="text-slate-400 hover:text-rose-500 p-0.5">
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <input type="range" min="0" max="100" value={task.progress} onChange={(e) => updateProgress(emp.id, type, task.id, e.target.value)} className="flex-1 h-1.5 rounded-lg appearance-none bg-slate-200 cursor-pointer" style={{ background: `linear-gradient(to right, ${type === 'cleaning' ? '#10b981' : '#3b82f6'} ${task.progress}%, #e5e7eb ${task.progress}%)` }} />
                                <span className="text-xs font-medium text-slate-600 w-9 text-right">{task.progress}%</span>
                              </div>

                              <div className="flex gap-1.5">
                                <select value={task.priority} onChange={(e) => updatePriority(emp.id, type, task.id, e.target.value)} className="text-xs px-2 py-1 rounded-md border border-slate-200 focus:outline-none focus:border-slate-300 bg-white">
                                  <option value="urgent">Urgent</option>
                                  <option value="high">High</option>
                                  <option value="normal">Normal</option>
                                  <option value="low">Low</option>
                                </select>
                                {!task.startTime ? (
                                  <button onClick={() => startTask(emp.id, type, task.id)} className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-${color}-500 text-white hover:bg-${color}-600 font-medium`}>
                                    <Play size={10} />
                                    Start
                                  </button>
                                ) : !task.endTime ? (
                                  <>
                                    {task.paused ? (
                                      <button onClick={() => resumeTask(emp.id, type, task.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 font-medium">
                                        <Play size={10} />
                                        Resume
                                      </button>
                                    ) : (
                                      <button onClick={() => pauseTask(emp.id, type, task.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-orange-500 text-white hover:bg-orange-600 font-medium">
                                        <Pause size={10} />
                                        Pause
                                      </button>
                                    )}
                                    {type === 'work' && !task.onTaskBreak && (
                                      <button onClick={() => taskBreak(emp.id, type, task.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-amber-500 text-white hover:bg-amber-600 font-medium">
                                        <Coffee size={10} />
                                        Break
                                      </button>
                                    )}
                                    {type === 'work' && task.onTaskBreak && (
                                      <button onClick={() => resumeFromTaskBreak(emp.id, type, task.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 font-medium">
                                        <Play size={10} />
                                        Lanjutkan
                                      </button>
                                    )}
                                    <button onClick={() => endTask(emp.id, type, task.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-rose-500 text-white hover:bg-rose-600 font-medium">
                                      <Square size={10} />
                                      End
                                    </button>
                                  </>
                                ) : (
                                  <span className={`text-xs text-${color}-600 px-2.5 py-1 bg-${color}-50 rounded-md font-medium`}>✓ Done</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {type === 'work' && (
                        <div className="flex gap-2">
                          <input type="text" placeholder="Task pekerjaan baru..." value={newTask[`${emp.id}-${type}`] || ''} onChange={(e) => setNewTask(prev => ({ ...prev, [`${emp.id}-${type}`]: e.target.value }))} onKeyPress={(e) => e.key === 'Enter' && addTask(emp.id, type)} className={`flex-1 px-3 py-2 rounded-lg border ${currentTheme.input} text-xs`} />
                          <button onClick={() => addTask(emp.id, type)} className={`bg-${color}-500 text-white px-3 py-2 rounded-lg hover:bg-${color}-600 transition-colors`}>
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }, [
    employees, 
    currentTheme, 
    AttentionSection, 
    selectedEmployee, 
    newTask, 
    showCompletedTasks, 
    isProcessing,
    statusConfig,
    priorityColors,
    detectShift,
    updateLateHours,
    startBreak,
    endBreak,
    startIzin,
    endIzin,
    endShift,
    handleDragStart,
    handleDragOver,
    handleDrop,
    calculateElapsedTime,
    deleteTask,
    updateProgress,
    updatePriority,
    startTask,
    pauseTask,
    resumeTask,
    taskBreak,
    resumeFromTaskBreak,
    endTask,
    addTask,
    setSelectedEmployee,
    setNewTask
  ]);

  return dashboardContent;
});

DashboardPage.displayName = 'DashboardPage';
