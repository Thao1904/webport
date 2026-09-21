import React from "react";
import TableCell from "./TableCell";

interface TableProps {
  columns: any[];
  data: any[];
}

const AdminTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="bg-black">
          <tr>
            {columns.map((column) => (
              <th className="text-primary font-semibold text-sm" key={"header-" + column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              {columns.map((column) => (
                <td key={column.key}>
                  <TableCell column={column} row={row} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
