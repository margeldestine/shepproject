import React from "react";

export default function DataTable({ columns, data, tableClassName = "simple-table", onRowClick }) {
  const hasWidths = Array.isArray(columns) && columns.some((c) => c.width);
  return (
    <table className={tableClassName}>
      {hasWidths && (
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
      )}
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} style={c.align ? { textAlign: c.align } : undefined}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr 
            key={idx} 
            onClick={() => onRowClick && onRowClick(row)}
            style={onRowClick ? { cursor: 'pointer' } : undefined}
            className={onRowClick ? "clickable-row" : ""}
          >
            {columns.map((c) => (
              <td key={c.key} style={c.align ? { textAlign: c.align } : undefined}>
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
