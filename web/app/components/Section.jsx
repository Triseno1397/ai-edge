import { SectionLabel } from "./ui";
import Markdown from "./Markdown";

// Renders one parsed briefing section: a mono section label + the section's
// markdown. The Markdown renderer handles the structure — bold headlines, boxed
// "Why it's big:" / "→ For you:" callouts, styled links, and `---` dividers
// between items — so no fragile manual splitting is needed.
export default function Section({ heading, content, index, label }) {
  if (!content) return null;
  return (
    <section className="mt-7">
      {heading ? <SectionLabel index={index}>{label || heading}</SectionLabel> : null}
      <Markdown>{content}</Markdown>
    </section>
  );
}
