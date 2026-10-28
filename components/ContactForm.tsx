"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";

// No server needed: the form opens the visitor's email app with the message filled in.
export default function ContactForm() {
  const t = useSearchParams().get("topic");
  const topic = t === "pilot" ? "Pilot a product" : t === "invest" ? "Investment" : t === "partner" ? "Partnership or manufacturing" : "General question";
  const [note, setNote] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${f.get("topic")}: ${f.get("name")}`;
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote("Opening your email app…");
  }
  return (
    <form className="form reveal" onSubmit={submit}>
      <label>Topic
        <select name="topic" defaultValue={topic}>
          <option>Investment</option>
          <option>Partnership or manufacturing</option>
          <option>Pilot a product</option>
          <option>General question</option>
          <option>Press</option>
        </select>
      </label>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Company<input name="company" autoComplete="organization" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Message<textarea name="message" required /></label>
      <button className="btn btn-dark" type="submit">Send</button>
      <p className="note" aria-live="polite">{note}</p>
    </form>
  );
}
