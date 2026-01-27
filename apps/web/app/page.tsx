const steps = [
  {
    title: "Scout",
    detail: "Crawls Greenhouse/Lever + target list every 6-12h, captures snapshots, extracts fields."
  },
  {
    title: "Normalize & Score",
    detail: "Dedupes titles, computes fit score with weighted skills/visa/start-date factors."
  },
  {
    title: "Draft",
    detail: "Retrieves KB evidence first, drafts why-company + stories, then Compliance fact-checks."
  },
  {
    title: "Approve & Track",
    detail: "You approve materials, mark applied, and follow-up dates auto-schedule (D+7/D+14)."
  }
];

export default function HomePage() {
  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">asi:one Pro</p>
        <h1 className="text-4xl font-semibold">Autonomous Job Application Agent</h1>
        <p className="max-w-3xl text-slate-300">
          Continuous discovery, transparent scoring, evidence-backed drafting, and human-in-the-loop approvals for internships and new-grad roles.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.title} className="card p-4">
            <p className="text-sm text-slate-400">{step.title}</p>
            <p className="text-base text-slate-100">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="card space-y-3 p-6">
        <h2 className="text-xl font-semibold">Next actions</h2>
        <ul className="list-disc space-y-2 pl-5 text-slate-200">
          <li>Wire Postgres + Redis clients in shared package.</li>
          <li>Implement Scout cron + queue pipeline in worker.</li>
          <li>Create Inbox + Job detail views backed by fit scores.</li>
          <li>Import KB content from /kb for evidence-grounded drafting.</li>
        </ul>
      </section>
    </main>
  );
}
