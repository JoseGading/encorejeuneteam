/**
 * Task Distribution Utilities
 * Handles fair distribution of tasks across employees
 */

import { CLEANING_TASKS_PAGI, CLOSING_TASKS_MALAM } from '../config'; // ✅ Unified import

/**
 * Shuffle array with seed for consistent randomization
 * @param {Array} array - Array to shuffle
 * @param {number} seed - Seed for randomization
 * @returns {Array} Shuffled array
 */
export const shuffleWithSeed = (array, seed) => {
  const arr = [...array];
  let currentIndex = arr.length;
  
  const seededRandom = (max, s) => {
    const x = Math.sin(s++) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };
  
  while (currentIndex > 0) {
    const randomIndex = seededRandom(currentIndex, seed++);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  
  return arr;
};

/**
 * Distribute tasks evenly across employees
 * @param {string} shift - Shift type ('pagi' or 'malam')
 * @param {number} totalEmployees - Total number of employees
 * @returns {Array<Array<string>>} Array of task arrays per employee
 */
export const distributeTasks = (shift, totalEmployees) => {
  const today = new Date().toDateString();
  const seed = new Date(today).getTime();
  
  let tasks = [];
  if (shift === 'pagi') {
    tasks = shuffleWithSeed(CLEANING_TASKS_PAGI, seed);
  } else if (shift === 'malam') {
    tasks = [...CLOSING_TASKS_MALAM];
  }
  
  const tasksPerEmployee = Math.ceil(tasks.length / totalEmployees);
  const distributed = [];
  
  for (let i = 0; i < totalEmployees; i++) {
    const start = i * tasksPerEmployee;
    const end = start + tasksPerEmployee;
    distributed.push(tasks.slice(start, end));
  }
  
  return distributed;
};

/**
 * Calculate task completion percentage
 * @param {Array} tasks - Array of tasks
 * @returns {number} Completion percentage (0-100)
 */
export const getTaskCompletionRate = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
};

/**
 * Get task priority color
 * @param {string} priority - Task priority
 * @returns {string} Tailwind color class
 */
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-blue-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    urgent: 'text-red-500'
  };
  return colors[priority] || colors.medium;
};

/**
 * Get task priority badge color
 * @param {string} priority - Task priority
 * @returns {string} Tailwind badge color class
 */
export const getPriorityBadge = (priority) => {
  const badges = {
    low: 'bg-blue-100 text-blue-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700'
  };
  return badges[priority] || badges.medium;
};

/**
 * Sort tasks by priority
 * @param {Array} tasks - Array of tasks
 * @returns {Array} Sorted tasks
 */
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  return [...tasks].sort((a, b) => {
    const aPriority = priorityOrder[a.priority] ?? 2;
    const bPriority = priorityOrder[b.priority] ?? 2;
    return aPriority - bPriority;
  });
};
