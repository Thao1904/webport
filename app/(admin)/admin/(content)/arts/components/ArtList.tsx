import { IArt } from "@/server/models/Art";

export default function ArtList({ arts }: { arts: IArt[] }) {
  return (
    <div style={{ marginTop: 20 }}>
      {arts.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.medium}</p>
          <p>{p.year}</p>

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