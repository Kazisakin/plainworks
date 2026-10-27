"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";

// No server needed: the form opens the visitor's email app with the message filled in.
export default function ContactForm() {
  const topic = useSearchParams().get("topic") === "pilot" ? "PrepLabel pilot" : "General question";
  const [note, setNote] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${f.get("topic")}: ${f.get("name")}`;
    const body = `Name: ${f.get("name")}\nRestaurant / company: ${f.get("company")}\nEmail: ${f.get("email")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote("Opening your email app…");
  }
  return (
    <form className="form reveal" onSubmit={submit}>
      <label>Topic
        <select name="topic" defaultValue={topic}>
          <option>PrepLabel pilot</option>
          <option>General question</option>
          <option>Press or partnership</option>
        </select>
      </label>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Restaurant or company<input name="company" autoComplete="organization" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Message<textarea name="message" required /></label>
      <button className="btn btn-dark" type="submit">Send</button>
      <p className="note" aria-live="polite">{note}</p>
    </form>
  );
}
