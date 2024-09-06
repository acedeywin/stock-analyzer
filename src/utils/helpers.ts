import { StockReturn } from '@/types';
/**
 * Determines the color class for each cell based on the given rules.
 *
 * @function getColor
 * @param {StockReturn} data - The data for the current date.
 * @param {string} item - The current item being evaluated.
 * @returns {string} The color class to apply.
 *
 * Add colors to the table data with the below rules:
 * If 'open' >= 'high' then both should be green else 'open' should be red
 * '3. low' should always be red
 * if 'close' >= 'high' then 'close' should be green else red.
 * if 'dailyReturn' > 0 then it should be green else red
 */

export const getColor = (data: StockReturn, item: string | number): string => {
  const open = data.open;
  const high = data.high;
  const close = data.close;
  const dailyReturn = data.dailyReturn;

  switch (item) {
    case 'open':
      return open >= high ? 'text-green-500' : 'text-red-500';
    case 'high':
      return 'text-green-500';
    case 'low':
      return 'text-red-500';
    case 'close':
      return close >= high ? 'text-green-500' : 'text-red-500';
    case 'volume':
      return 'text-gray-500';
    case 'dailyReturn':
      return dailyReturn > 0 ? 'text-green-500' : 'text-red-500';
    default:
      return '';
  }
};

/**
 * Calculates the pagination window for displaying page numbers.
 *
 * @function calculatePaginationWindow
 * @returns {Array<number>} An array of page numbers for the pagination window.
 */
export const calculatePaginationWindow = (
  totalPages: () => number,
  currentPage: number,
): Array<number> => {
  const total = totalPages(); // Total number of pages
  const windowSize = 10; // Maximum number of page numbers to display in the window
  const halfWindow = Math.floor(windowSize / 2); // Half of the window size
  let start = currentPage - halfWindow; // Start of the pagination window
  let end = currentPage + halfWindow; // End of the pagination window

  // Adjust start and end if they go beyond the total pages
  if (start < 1) {
    start = 1;
    end = Math.min(windowSize, total);
  } else if (end > total) {
    end = total;
    start = Math.max(1, total - windowSize + 1);
  }

  // Create an array of page numbers for the pagination window
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Calculate the current page data.
 *
 * @returns {Array} The data for the current page
 */
export const currentData = (
  data: StockReturn[],
  currentPage: number,
  itemsPerPage: number,
): Array<StockReturn> => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};
