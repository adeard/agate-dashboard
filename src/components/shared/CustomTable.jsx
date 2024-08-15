import React, { useEffect, useMemo } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdOutlineDoNotDisturbOn } from 'react-icons/md';

import Button from './Button';

const renderPageButtons = (table) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const pageButtons = [];

  // Determine the start and end page index for the pagination buttons
  const startPage = Math.max(0, currentPage - 1);
  const endPage = Math.min(pageCount - 1, currentPage + 1);

  // Add the buttons for the current range of pages
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`body-s-r w-7 h-7 !text-center mx-1 ${
          currentPage === i
            ? 'bg-primary-2 text-white rounded-full'
            : 'text-color-2'
        }`}
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </button>
    );
  }

  return pageButtons;
};

const CustomTable = ({
  dataTable,
  columns,
  footerData = null,
  showPagination = false,
}) => {
  const [data] = useMemo(() => [dataTable]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / 10),
  });

  return (
    <div>
      {data?.length > 0 ? (
        <>
          <table className='table h-full'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className='text-color-2'>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className='tag-l'
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='body-s-r group hover text-color-2'>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className='bg-primary-5'>
                {footerData &&
                  columns.map((column, index) => (
                    <td
                      key={index}
                      className='!body-m-b text-center text-[#000000DE]'
                    >
                      {footerData[column.accessorKey] || '-'}
                    </td>
                  ))}
              </tr>
            </tfoot>
          </table>
          {showPagination && data.length > 10 && (
            <div className='flex justify-end items-center mt-4'>
              <Button
                variant='primary-outline'
                className='!border-none'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <IoIosArrowBack className='text-xl' />
              </Button>
              {renderPageButtons(table)}
              <Button
                variant='primary-outline'
                className='!border-none'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <IoIosArrowForward className='text-xl' />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className='w-full min-h-[60vh] flex flex-col justify-center items-center gap-4'>
          <MdOutlineDoNotDisturbOn className='text-5xl' />
          <h3>No Data</h3>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
