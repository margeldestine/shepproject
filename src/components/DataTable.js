import React from "react";

// Generic table that supports per-column custom cell rendering.
// Preserves existing styles via `tableClassName`.
export default function DataTable({ columns, data, tableClassName = "simple-table" }) {
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
          <tr key={idx}>
            {columns.map((c) => (
              <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}