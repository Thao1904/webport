import React from "react";
import TableCell from "./TableCell";

interface TableProps {
  columns: any[];
  data: any[];
  pagination: any;
  setPagination: React.Dispatch<React.SetStateAction<any>>;
}

const AdminTable: React.FC<TableProps> = ({
  columns,
  data,
  pagination,
  setPagination,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead className="bg-black">
          <tr>
            {columns.map((column) => (
              <th
                className="text-primary font-semibold text-sm"
                key={"header-" + column.key}
              >
                {column.label}
              </th>
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
      <div className="flex justify-center">
        <div className="flex gap-2 items-center">
          <button
            className={`btn ${!pagination.hasPrevPage ? "btn-disabled" : ""}`}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
          >
            Previous
          </button>

          {Array.from(
            { length: pagination.totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              key={page}
              className={`btn ${pagination.page === page ? "btn-primary" : ""}`}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page,
                }))
              }
            >
              {page}
            </button>
          ))}

          <button
            className={`btn ${!pagination.hasNextPage ? "btn-disabled" : ""}`}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
