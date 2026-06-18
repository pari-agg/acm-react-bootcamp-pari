import { useState, useMemo } from 'react';
import './DataTable.css';

export const DataTable = ({ columns = [], data = [] }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return [...data];

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'ascending'
          ? aValue - bValue
          : bValue - aValue;
      }

      const result = String(aValue).localeCompare(String(bValue));

      return sortConfig.direction === 'ascending'
        ? result
        : -result;
    });
  }, [data, sortConfig]);

  const handleSort = (key) => {
    let direction = 'ascending';

    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const getAriaSort = (key) => {
    if (sortConfig.key !== key) return 'none';
    return sortConfig.direction;
  };

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              aria-sort={getAriaSort(column.key)}
              onClick={() => handleSort(column.key)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.key}>
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};