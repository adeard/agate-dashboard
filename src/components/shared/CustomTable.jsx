import React, { useMemo } from 'react';
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

  // Always show the first page
  pageButtons.push(
    <button
      key={0}
      className={`body-s-r w-7 h-7 !text-center mx-1 ${
        currentPage === 0
          ? 'bg-primary-2 text-white rounded-full'
          : 'text-color-2 hover:bg-primary-4 rounded-full'
      }`}
      onClick={() => table.setPageIndex(0)}
    >
      1
    </button>
  );

  // Show '...' if current page is far from the first page
  if (currentPage > 3) {
    pageButtons.push(
      <span key='start-ellipsis' className='px-2 mx-1'>
        ...
      </span>
    );
  }

  // Determine the start and end page index for the pagination buttons
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(pageCount - 2, currentPage + 1);

  // Add the buttons for the current range of pages
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`body-s-r w-7 h-7 !text-center mx-1 ${
          currentPage === i
            ? 'bg-primary-2 text-white rounded-full'
            : 'text-color-2 hover:bg-primary-4 rounded-full'
        }`}
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </button>
    );
  }

  // Show '...' if current page is far from the last page
  if (currentPage < pageCount - 4) {
    pageButtons.push(
      <span key='end-ellipsis' className='px-2 mx-1'>
        ...
      </span>
    );
  }

  // Always show the last page
  pageButtons.push(
    <button
      key={pageCount - 1}
      className={`body-s-r w-7 h-7 !text-center mx-1 ${
        currentPage === pageCount - 1
          ? 'bg-primary-2 text-white rounded-full'
          : 'text-color-2 hover:bg-primary-4 rounded-full'
      }`}
      onClick={() => table.setPageIndex(pageCount - 1)}
    >
      {pageCount}
    </button>
  );

  return pageButtons;
};

const CustomTable = ({
  dataTable,
  columns,
  footerData = null,
  showPagination = false,
  overflowX = 'auto',
  overflowY = 'hidden',
  minHeight = '75vh',
  loading,
}) => {
  const [data] = useMemo(() => [dataTable]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: showPagination ? getPaginationRowModel() : undefined,
    pageCount: showPagination ? Math.ceil(data.length / 10) : 1,
    initialState: {
      pagination: {
        pageSize: showPagination ? 10 : data.length,
      },
    },
  });

  return (
    <div>
      {loading ? (
        <div className='min-h-[60vh] flex w-full items-center justify-center'>
          <span className='loading loading-spinner loading-lg' />
        </div>
      ) : (
        <>
          {data?.length > 0 ? (
            <>
              <div
                style={{
                  overflowX: overflowX,
                  overflowY: overflowY,
                  minHeight: minHeight,
                }}
              >
                <table className='table h-full'>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} className='text-color-2'>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} className='tag-l !font-bold'>
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
                      <tr
                        key={row.id}
                        className='body-s-r group hover text-color-2'
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={`${
                              cell.column.columnDef.meta?.className || ''
                            }`}
                          >
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
                            className='!body-m-b !text-center !font-bold text-[#000000DE] tag-l'
                          >
                            {footerData[column.accessorKey]}
                          </td>
                        ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
              {showPagination && data.length > 10 && (
                <div className='inline-block min-w-full my-4'>
                  <div className='flex justify-end items-center gap-2 mr-4'>
                    <Button
                      variant='primary-outline'
                      className='!border-none'
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      <IoIosArrowBack className='text-xl' />
                    </Button>
                    <div className='flex justify-center'>
                      {renderPageButtons(table)}
                    </div>
                    <Button
                      variant='primary-outline'
                      className='!border-none'
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      <IoIosArrowForward className='text-xl' />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className='w-full min-h-[60vh] flex flex-col justify-center items-center gap-4'>
              <MdOutlineDoNotDisturbOn className='text-5xl' />
              <h3>No Data</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomTable;
