import React from "react";

export default function SimpleTable({ columns, data, onRowClick, tableClassName = "simple-table" }) {
  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} onClick={onRowClick ? () => onRowClick(row) : undefined}>
            {columns.map((c) => (
              <td key={c.key}>{row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}