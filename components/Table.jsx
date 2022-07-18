import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'


function Table({ columns, data }) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
    
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable({
        columns,
        data,
      },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination,  // new
      )
  
    return (
      <>
        {/* global search and filter */}
        {/* table */}
        <div className="mt-2 flex flex-col w-[90%] overflow-hidden mx-auto">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          // Add the sorting props to control sorting. For this example
                          // we can add them into the header props
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                          >
                            {column.render('Header')}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' ▼'
                                  : ' ▲'
                                : ''}
                            </span>
                          </th>
                        ))}
                        <th></th>
                      </tr>
                    ))}
                  </thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                  >
                    {page.map((row, i) => {  // new
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map(cell => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {cell.render('Cell')} {/* {id[i]} */}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}
      </>
    )
  }

export default Table;