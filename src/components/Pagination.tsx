'use client';

import React from 'react';
import { calculatePaginationWindow } from '@/utils/helpers';
import { Paginationrops } from '@/types';

const Pagination: React.FC<Paginationrops> = ({
  data,
  setCurrentPage,
  itemsPerPage,
  currentPage,
}) => {
  /**
   * Handle page change.
   *
   * @function handlePageChange
   * @param {Number} pageNumber - The page number to navigate to
   */
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  /**
   * Calculate the total number of pages.
   *
   * @returns {Number} The total number of pages
   */
  const totalPages = (): number => Math.ceil(Object.keys(data).length / itemsPerPage);

  return (
    <div className="mt-4 flex justify-center">
      {calculatePaginationWindow(totalPages, currentPage).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`mx-1 rounded border px-3 py-1 ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
