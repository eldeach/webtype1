import { flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AutorenewIcon from '@mui/icons-material/Autorenew';


function TableHeader ({ header }) {
  const sortedUniqueValues = useMemo( () => Array.from(header.column.getFacetedUniqueValues().keys()).sort(), [ header.column ]);

  const onFilterChange = (value) => {
    if (value === "null") {
      header.column.setFilterValue( null );
    } else {
      header.column.setFilterValue( value );
    }
  };

  return (
    <th key={header.id} style={{border : '1px solid black', }}>
        <div
          width={header.getSize()}
          isSortable={header.column.getCanSort()}
          onClick={header.column.getToggleSortingHandler()}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          {
            {
              asc: <KeyboardDoubleArrowUpIcon />,
              desc: <KeyboardDoubleArrowDownIcon />
            }[header.column.getIsSorted()]
          }
          {header.column.getCanSort() && !header.column.getIsSorted() ? (
            <AutorenewIcon />
          ) : null}
        </div>
          {header.column.getCanFilter() ? (
            <div>
                <select
                onChange={({ currentTarget: { value } }) => onFilterChange(value)}
                >
                <option value="null">선택 안함</option>
                {sortedUniqueValues.map((value) => (
                    <option key={value}>{value}</option>
                ))}
                </select>
                <input onChange={({ currentTarget: { value } }) => onFilterChange(value)} />
            </div>
          ) : null}
    </th>
  );
}


export default TableHeader;
