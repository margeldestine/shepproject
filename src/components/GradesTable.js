import React, { useEffect, useState } from "react";
import { getAllGrades } from "../api/gradesApi";

export default function GradesTable({ rows, onRowClick }) {
  const [data, setData] = useState(rows || []);
  useEffect(() => {
    if (rows && rows.length) {
      setData(rows);
      return;
    }
    let mounted = true;
    getAllGrades()
      .then((list) => {
        if (!mounted) return;
        setData(Array.isArray(list) ? list : []);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [rows]);
  return (
    <table className="grades-table">
      <thead>
        <tr>
          <th>Learning Areas</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
          <th>Q4</th>
          <th>Final Grade</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr
            key={r.area}
            onClick={() => onRowClick(r.area)}
            title={`View ${r.area} details`}
          >
            <td>
              <span className="subject-name">
                <span className="chev">›</span>
                {r.area}
              </span>
            </td>
            <td>{r.q1}</td>
            <td>{r.q2}</td>
            <td>{r.q3}</td>
            <td>{r.q4}</td>
            <td>{r.final}</td>
            <td className="remark-pass">{r.remark}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
