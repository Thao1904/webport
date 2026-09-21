type Column = {
  key: String;
  type: String;
  mapping: any;
  actions: any[];
}

interface TableCellProps {
  column: Column;
  row: any;
}

const TableCell: React.FC<TableCellProps> = ({ column, row }) => {
  const value = row[column.key];

  switch (column.type) {
    case "actions":
      return (
        <div>
          {column.actions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.onClick(row)}
            >
              {action.label}
            </button>
          ))}
        </div>
      );

    case "title":
      return (
        <p className="font-semibold text-lg">{value}</p>
      )  
    
    case "tags":
      return (
        <div className="flex gap-2">
          {value.map((item: any) => (
            <div className="border bg-primary pl-2 pr-3 py-1 text-secondary font-semibold text-xs" key={item._id}>{item.name}</div>
          ))}
        </div>
      )

    case "box": {
      const label = column.mapping?.[String(value)];
      
      return (     
        <div className="border bg-primary pl-2 pr-6 py-1 text-secondary font-semibold text-sm">
          {label}
        </div>
      )
    }

    case "datetime":
      return new Date(value).toLocaleString("US");

    case "text":
    default:
      return value;
  }
}

export default TableCell;
