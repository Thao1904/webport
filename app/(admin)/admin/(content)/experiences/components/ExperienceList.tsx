"use client"

type Experience = {
  _id: string
  jobTitle: string
  year: string
  position: string
  shortDescription: string
  responsibilities: string[]
  achievements: string[]
}

export default function ExperienceList({
  experiences,
}: {
  experiences: Experience[]
}) {
  return (
    <div style={{ marginTop: 20 }}>
      {experiences.map((exp) => (
        <div
          key={exp._id}
          style={{
            border: "1px solid #ccc",
            padding: 16,
            marginBottom: 16,
            borderRadius: 8,
          }}
        >
          <h3>{exp.jobTitle}</h3>
          <p>
            <strong>Year:</strong> {exp.year}
          </p>
          <p>
            <strong>Position:</strong> {exp.position}
          </p>
          <p>{exp.shortDescription}</p>

          <div style={{ marginTop: 12 }}>
            <strong>Responsibilities</strong>
            <ul>
              {exp.responsibilities?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 12 }}>
            <strong>Achievements</strong>
            <ul>
              {exp.achievements?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}