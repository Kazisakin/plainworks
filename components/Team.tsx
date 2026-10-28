import { team } from "@/lib/content";

export default function Team({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`team ${dark ? "team-dark" : ""}`}>
      {team.map((m, i) => (
        <article className="member reveal tilt" key={m.name} style={{ transitionDelay: `${i * 0.08}s` }}>
          <div className="avatar" style={{ ["--hue" as string]: m.hue }} aria-hidden="true"><span>{m.initials}</span></div>
          <h3>{m.name}</h3>
          <p className="role">{m.role}</p>
          <p className="focus">{m.focus}</p>
        </article>
      ))}
    </div>
  );
}
