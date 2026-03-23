export default function ProjectList({ projects }: { projects: any[] }) {
  return (
    <div style={{ marginTop: 20 }}>
      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>

          <img
            src={p.imageUrl}
            alt=""
            style={{ width: 200 }}
          />

          <br />
          <a href={p.refLink} target="_blank">
            Visit
          </a>
        </div>
      ))}
    </div>
  )
}