import React from 'react';
import { useState, useEffect } from 'react';
import { getCoreRowModel, useReactTable, createColumnHelper, flexRender, getFilteredRowModel, getFacetedUniqueValues, getSortedRowModel } from "@tanstack/react-table";
import axios from 'axios';

import TableHeader from './TableHeader';

function TableType1(props) {


  const tableData = [
    {
      name: "김땡땡1",
      phone: "01012345678",
      birth: "830309",
      register_date: "2022-04-06",
      last_edit_date: "2022-08-24",
    },
    {
      name: "김땡땡2",
      phone: "01012345678",
      birth: "830309",
      register_date: "2022-04-06",
      last_edit_date: "2022-08-24",
    },
    {
      name: "김땡땡3",
      phone: "01012345678",
      birth: "830309",
      register_date: "2022-04-06",
      last_edit_date: "2022-08-24",
    }
    /* ... */
  ]

  const [data, setData] = useState([...tableData])

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", { header: "권한코드", enableColumnFilter: true, footer: info => info.column.id, size: 50 }),
    columnHelper.accessor("phone", { header: "시스템", footer: info => info.column.id, cell: renderValue => <div style={{ color: 'red', fontWeight: 'bold', borderRadius: '4px', border: '1px solid red', background: 'blue' }}>{renderValue.getValue()}</div>, size: 200, }),
    columnHelper.accessor("birth", { header: "권한명", footer: info => info.column.id, size: 200 }),
    columnHelper.accessor("register_date", { header: "설명", footer: info => info.column.id, size: 200 }),
    columnHelper.accessor("last_edit_date", { header: "경로", footer: info => info.column.id, size: 200 }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  //   const fetchData = async function () {
  //     await axios.get('/selecttest').
  //     then((res) => {
  //         console.log([...res.data])
  //         setData(res.data)
  //     })

  //   }

  useEffect(() => {
    // fetchData()
  }, [])
  return (
    <div style={{ maxHeight: '100px', overflow: 'auto' }}>
      <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 1, border: '1px solid black' }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ border: '1px solid black' }}>
              {headerGroup.headers.map((header) => (
                //     <th key={header.id} style={{ width: header.getSize(), border : '1px solid black' }}>
                //     {header.isPlaceholder
                //       ? null
                //     : flexRender(
                //       header.column.columnDef.header,
                //       header.getContext()
                //     )}
                //   </th>
                <TableHeader header={header} key={header.id} /> // 정렬, 필터 추가한 Custom Header
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ border: '1px solid black' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )

}

export default TableType1;