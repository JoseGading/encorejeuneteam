// 🎨 THEME CONSTANTS
export const THEMES = {
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

// ⏰ SHIFT CONSTANTS
export const SHIFT_CONFIG = {
  pagi: {
    name: 'Shift Pagi',
    start: 9,
    end: 17,
    maxCheckIn: 9,
    color: 'from-yellow-500 to-orange-500'
  },
  malam: {
    name: 'Shift Malam',
    start: 17,
    end: 1,
    maxCheckIn: 17,
    color: 'from-purple-500 to-indigo-500'
  }
};

// 📦 ORDER CONSTANTS
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESS: 'process',
  COMPLETED: 'completed'
};

export const ORDER_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const ORDER_PLATFORMS = {
  WA: 'wa',
  TELEGRAM: 'tele',
  SHOPEE_MEDIA: 'shopee_media',
  SHOPEE_ACC: 'shopee_acc'
};

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

// 📅 ATTENDANCE CONSTANTS
export const ATTENDANCE_STATUS = {
  HADIR: 'hadir',
  TELAT: 'telat',
  LIBUR: 'libur',
  IZIN: 'izin',
  SAKIT: 'sakit',
  ALPHA: 'alpha',
  LEMBUR: 'lembur'
};

// 📋 TASK CONSTANTS
export const TASK_TYPES = {
  WORK: 'work',
  CLEANING: 'cleaning'
};

// 🔔 NOTIFICATION TYPES
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  URGENT: 'urgent'
};

// ⚙️ APP CONSTANTS
export const APP_CONFIG = {
  AUTO_SAVE_DELAY: 500, // ms
  NOTIFICATION_DURATION: 5000, // ms
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes
  ATTENDANCE_CHECK_INTERVAL: 60000, // 1 minute
  PAUSE_REMINDER_CHECK_INTERVAL: 60000 // 1 minute
};

// 🎯 VALIDATION RULES
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

// 📊 LEADERBOARD PERIODS
export const LEADERBOARD_PERIODS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month'
};

// 🔑 LOCAL STORAGE KEYS
export const STORAGE_KEYS = {
  SHIFT_SCHEDULE_WEEK: 'shiftScheduleWeek',
  THEME: 'theme',
  LAST_ACTIVE_PAGE: 'lastActivePage'
};

export default {
  THEMES,
  SHIFT_CONFIG,
  ORDER_STATUS,
  ORDER_PRIORITIES,
  ORDER_PLATFORMS,
  PLATFORM_CONFIG,
  PRIORITY_CONFIG,
  STATUS_CONFIG,
  ATTENDANCE_STATUS,
  TASK_TYPES,
  NOTIFICATION_TYPES,
  APP_CONFIG,
  VALIDATION_RULES,
  LEADERBOARD_PERIODS,
  STORAGE_KEYS
};
