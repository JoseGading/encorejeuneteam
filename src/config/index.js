/**
 * Unified Constants & Configuration
 * 
 * Single source of truth for all application constants.
 * Consolidates config/constants.js and utils/constants.js
 * 
 * @module config
 */

// ============================================================================
// EMPLOYEE & TASK DATA
// ============================================================================

/**
 * Initial employee data structure
 * @constant {Array<Object>}
 */
export const INITIAL_EMPLOYEES = [
  { 
    id: 1, 
    name: 'Desta', 
    baseSalary: 8000000, 
    status: 'belum', 
    lateHours: 0, 
    checkInTime: null, 
    cleaningTasks: [], 
    workTasks: [], 
    shift: null, 
    checkedIn: false, 
    isAdmin: true, 
    breakTime: null, 
    breakDuration: 0,
    shiftEndAdjustment: 0, 
    overtime: false, 
    shifts: [], 
    breakHistory: [],
    hasBreakToday: false, 
    shiftEndTime: null, 
    izinTime: null, 
    izinHistory: [],
    completedTasksHistory: []
  },
  { 
    id: 2, 
    name: 'Ariel', 
    baseSalary: 7000000, 
    status: 'belum', 
    lateHours: 0, 
    checkInTime: null, 
    cleaningTasks: [], 
    workTasks: [], 
    shift: null, 
    checkedIn: false, 
    isAdmin: false, 
    breakTime: null, 
    breakDuration: 0,
    shiftEndAdjustment: 0, 
    overtime: false, 
    shifts: [], 
    breakHistory: [],
    hasBreakToday: false, 
    shiftEndTime: null, 
    izinTime: null, 
    izinHistory: [],
    completedTasksHistory: []
  },
  { 
    id: 3, 
    name: 'Robert', 
    baseSalary: 6500000, 
    status: 'belum', 
    lateHours: 0, 
    checkInTime: null, 
    cleaningTasks: [], 
    workTasks: [], 
    shift: null, 
    checkedIn: false, 
    isAdmin: false, 
    breakTime: null, 
    breakDuration: 0,
    shiftEndAdjustment: 0, 
    overtime: false, 
    shifts: [], 
    breakHistory: [],
    hasBreakToday: false, 
    shiftEndTime: null, 
    izinTime: null, 
    izinHistory: [],
    completedTasksHistory: []
  }
];

/**
 * Morning shift cleaning tasks
 * @constant {Array<string>}
 */
export const CLEANING_TASKS_PAGI = [
  'Bersihkan Lantai',
  'Lap Meja & Kursi',
  'Bersihkan Toilet',
  'Buang Sampah',
  'Rapikan Ruangan',
  'Pel Lantai'
];

/**
 * Night shift closing tasks
 * @constant {Array<string>}
 */
export const CLOSING_TASKS_MALAM = [
  'Tutup Kasir',
  'Hitung Uang',
  'Bersihkan Area Kasir',
  'Matikan Lampu',
  'Kunci Pintu',
  'Cek Keamanan'
];

/**
 * Month names in Indonesian
 * @constant {Array<string>}
 */
export const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Day names in Indonesian
 * @constant {Array<string>}
 */
export const DAY_NAMES = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

// ============================================================================
// ORDER CONSTANTS
// ============================================================================

/**
 * Order status types
 * @constant {Object}
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESS: 'process',
  COMPLETED: 'completed'
};

/**
 * Order priority levels
 * @constant {Object}
 */
export const ORDER_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

/**
 * Order platforms
 * @constant {Object}
 */
export const ORDER_PLATFORMS = {
  WA: 'wa',
  TELEGRAM: 'tele',
  SHOPEE_MEDIA: 'shopee_media',
  SHOPEE_ACC: 'shopee_acc'
};

/**
 * Platform display configuration
 * @constant {Object}
 */
export const PLATFORM_CONFIG = {
  wa: {
    label: 'WhatsApp',
    color: 'from-green-500 to-emerald-500',
    icon: 'MessageSquare'
  },
  tele: {
    label: 'Telegram',
    color: 'from-blue-500 to-cyan-500',
    icon: 'MessageSquare'
  },
  shopee_media: {
    label: 'Shopee Media Booster',
    color: 'from-orange-500 to-red-500',
    icon: 'ShoppingCart'
  },
  shopee_acc: {
    label: 'Shopee AccStorageCom',
    color: 'from-pink-500 to-rose-500',
    icon: 'ShoppingCart'
  }
};

/**
 * Priority display configuration
 * @constant {Object}
 */
export const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    color: 'bg-slate-100 text-slate-700',
    icon: '●'
  },
  medium: {
    label: 'Medium',
    color: 'bg-blue-100 text-blue-700',
    icon: '●●'
  },
  high: {
    label: 'High',
    color: 'bg-orange-100 text-orange-700',
    icon: '●●●'
  },
  urgent: {
    label: 'Urgent',
    color: 'bg-red-100 text-red-700',
    icon: '🔥'
  }
};

/**
 * Status display configuration
 * @constant {Object}
 */
export const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300'
  },
  process: {
    label: 'Diproses',
    color: 'bg-blue-100 text-blue-700 border-blue-300'
  },
  completed: {
    label: 'Selesai',
    color: 'bg-green-100 text-green-700 border-green-300'
  }
};

// ============================================================================
// SHIFT CONFIGURATION
// ============================================================================

/**
 * Shift time configuration
 * @constant {Object}
 */
export const SHIFT_CONFIG = {
  pagi: {
    start: 9,
    end: 17,
    maxCheckIn: 10,
    name: 'Shift Pagi',
    emoji: '🌅',
    color: 'from-yellow-500 to-orange-500'
  },
  malam: {
    start: 17,
    end: 1,
    maxCheckIn: 18,
    name: 'Shift Malam',
    emoji: '🌙',
    color: 'from-purple-500 to-indigo-500'
  }
};

// ============================================================================
// ATTENDANCE CONSTANTS
// ============================================================================

/**
 * Attendance status types
 * @constant {Object}
 */
export const ATTENDANCE_STATUS = {
  HADIR: 'hadir',
  TELAT: 'telat',
  LIBUR: 'libur',
  IZIN: 'izin',
  SAKIT: 'sakit',
  ALPHA: 'alpha',
  LEMBUR: 'lembur'
};

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

/**
 * Application theme configurations
 * @constant {Object}
 */
export const APP_THEMES = {
  dark: {
    name: 'Dark Mode',
    icon: 'Moon',
    bg: 'from-slate-900 to-slate-800',
    card: 'bg-slate-800 text-white',
    nav: 'bg-slate-800/90 backdrop-blur-sm',
    navActive: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg',
    navInactive: 'text-slate-300 hover:bg-slate-700',
    badge: 'bg-slate-700',
    text: 'text-white',
    subtext: 'text-slate-300',
    input: 'bg-slate-700 text-white'
  },
  light: {
    name: 'Light Mode',
    icon: 'Sun',
    bg: 'from-slate-50 to-white',
    card: 'bg-white text-slate-900',
    nav: 'bg-white/90 backdrop-blur-sm',
    navActive: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg',
    navInactive: 'text-slate-700 hover:bg-slate-100',
    badge: 'bg-slate-100',
    text: 'text-slate-900',
    subtext: 'text-slate-600',
    input: 'bg-white text-slate-900'
  },
  ocean: {
    name: 'Ocean',
    icon: 'Palette',
    bg: 'from-blue-900 to-cyan-900',
    card: 'bg-blue-800/50 text-white backdrop-blur',
    nav: 'bg-blue-900/90 backdrop-blur-sm',
    navActive: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg',
    navInactive: 'text-blue-100 hover:bg-blue-800',
    badge: 'bg-blue-700/50',
    text: 'text-white',
    subtext: 'text-blue-200',
    input: 'bg-blue-900/50 text-white'
  },
  sunset: {
    name: 'Sunset',
    icon: 'Palette',
    bg: 'from-orange-900 to-red-900',
    card: 'bg-orange-800/50 text-white backdrop-blur',
    nav: 'bg-orange-900/90 backdrop-blur-sm',
    navActive: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg',
    navInactive: 'text-orange-100 hover:bg-orange-800',
    badge: 'bg-orange-700/50',
    text: 'text-white',
    subtext: 'text-orange-200',
    input: 'bg-orange-900/50 text-white'
  }
};

// ============================================================================
// APP CONFIGURATION
// ============================================================================

/**
 * Application configuration values
 * @constant {Object}
 */
export const APP_CONFIG = {
  /** Auto-save delay in milliseconds */
  AUTO_SAVE_DELAY: 500,
  /** Notification duration in milliseconds */
  NOTIFICATION_DURATION: 5000,
  /** Session check interval in milliseconds */
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000,
  /** Attendance check interval in milliseconds */
  ATTENDANCE_CHECK_INTERVAL: 60000,
  /** Pause reminder check interval in milliseconds */
  PAUSE_REMINDER_CHECK_INTERVAL: 60000
};

/**
 * Timeout configurations
 * @constant {Object}
 */
export const TIMEOUTS = {
  /** Unlock session timeout (24 hours) */
  UNLOCK_SESSION: 24 * 60 * 60 * 1000,
  /** Admin session timeout (12 hours) */
  ADMIN_SESSION: 12 * 60 * 60 * 1000
};

/**
 * Local storage key names
 * @constant {Object}
 */
export const STORAGE_KEYS = {
  SHIFT_SCHEDULE_WEEK: 'shiftScheduleWeek',
  THEME: 'theme',
  LAST_ACTIVE_PAGE: 'lastActivePage'
};

/**
 * Validation rules for form inputs
 * @constant {Object}
 */
export const VALIDATION_RULES = {
  ORDER: {
    USERNAME_MIN_LENGTH: 2,
    USERNAME_MAX_LENGTH: 100,
    DESCRIPTION_MIN_LENGTH: 5,
    DESCRIPTION_MAX_LENGTH: 1000
  },
  EMPLOYEE: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Default export - all constants in one object
 */
export default {
  // Employee & Task Data
  INITIAL_EMPLOYEES,
  CLEANING_TASKS_PAGI,
  CLOSING_TASKS_MALAM,
  MONTH_NAMES,
  DAY_NAMES,
  
  // Order Constants
  ORDER_STATUS,
  ORDER_PRIORITIES,
  ORDER_PLATFORMS,
  PLATFORM_CONFIG,
  PRIORITY_CONFIG,
  STATUS_CONFIG,
  
  // Shift Configuration
  SHIFT_CONFIG,
  
  // Attendance
  ATTENDANCE_STATUS,
  
  // Theme
  APP_THEMES,
  
  // App Config
  APP_CONFIG,
  TIMEOUTS,
  STORAGE_KEYS,
  VALIDATION_RULES
};
