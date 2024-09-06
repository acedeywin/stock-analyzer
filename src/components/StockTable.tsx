'use client';

import React, { useState } from 'react';
import { StockTableProps } from '@/types';
import { tableDefinition } from '@/utils/formDefinitions';
import { currentData, getColor } from '@/utils/helpers';
import Pagination from './Pagination';

const StockTable: React.FC<StockTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const stockTableData = currentData(data, currentPage, itemsPerPage);

  return (
    <>
      <table className="mt-8 min-w-full bg-white">
        <thead>
          <tr>
            {tableDefinition.map((th) => (
              <th className="py-2" key={th.header}>
                {th.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stockTableData.map((row) => (
            <tr key={row.Date} className="border-b text-center">
              {tableDefinition.map((td) => (
                <td className={`py-2 ${getColor(row, td.data)}`} key={td.data}>
                  {row[td.data]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        data={data}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default StockTable;
