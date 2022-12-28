import React, { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Pagination from "react-js-pagination";

const TableComp = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);

  const styles = {
    tableHeader: {
      borderTop: "4px solid #06538A",
      background: "#E8ECF4",
      color: "#06538F",
    },
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const displayPaginationJs = (
    <Pagination
      activePage={table.getState().pagination.pageIndex + 1}
      itemsCountPerPage={table.getState().pagination.pageSize}
      totalItemsCount={data.length}
      pageRangeDisplayed={5}
      onChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
      itemClass="page-item"
      linkClass="page-link"
      nextPageText=">"
      prevPageText="<"
    />
  );

  const displaylimitResults = (
    <div className="d-flex align-items-center">
      <span>Row per page :</span>
      <select
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        value={table.getState().pagination.pageSize}
        className="mx-2 form-select"
        style={{ width: "fit-content" }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
        <option value={50}>50</option>
      </select>
    </div>
  );

  return (
    <div className="w-100">
      <div style={{ overflowX: "auto" }}>
        <table className="main-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="text-nowrap">
                      {header.isPlaceholder ? null : (
                        <>
                          {header.column.columnDef.sort ? (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: "⬆",
                                desc: "⬇",
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          ) : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="d-flex align-items-center">
        {displaylimitResults}
        {displayPaginationJs}
      </div> */}
    </div>
  );
};

export default TableComp;
