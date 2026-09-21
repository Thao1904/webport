import AdminTable from "@/component/admin/Table";

export default function ProjectList({ projects }: { projects: any[] }) {
  const columns = [
  {
    key: "title",
    label: "TITLE / TYPE",
    type: "title",
  },
  {
    key: "categories",
    label: "TAGS",
    type: "tags",
  },
  {
    key: "is_publish",
    label: "STATUS",
    type: "box",
    mapping: {
      true: "Published",
      false: "Draft"
    }
  },
  {
    key: "is_private",
    label: "VISIBILITY",
    type: "box",
    mapping: {
      true: "Private",
      false: "Public"
    }
  },
  {
    key: "viewed",
    label: "VIEW",
    type: "text",
  },
  {
    key: "updatedAt",
    label: "UPDATED",
    type: "datetime",
  },
  {
    key: "actions",
    label: "ACTIONS",
    type: "actions",
    actions: [
      {
        label: "Edit",
        onClick: (row: any) => console.log("Edit", row),
      },
      {
        label: "Delete",
        onClick: (row: any) => console.log("Delete", row),
      },
    ],
  },
];

  return (
    <AdminTable columns={columns} data={projects} />
  )
}