export default function About({ about }) {
  return (
    <section id="about" className="bento-card h-full p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
      <div>
        <h2 className="text-3xl font-bold text-white mb-5">{about.heading}</h2>
        <p className="text-zinc-400 text-lg leading-relaxed">
          {about.content}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {about.highlights.map((highlight) => (
          <div key={highlight} className="rounded-full bg-zinc-800/60 border border-zinc-700/40 px-4 py-2 text-sm text-zinc-300">
            {highlight}
          </div>
        ))}
      </div>
    </section>
  );
}
