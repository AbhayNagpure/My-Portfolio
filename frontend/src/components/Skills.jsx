export default function Skills({ skills }) {
  return (
    <section id="skills" className="bento-card h-full p-8 sm:p-12 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-8">Skills</h2>

      <div className="space-y-7">
        {skills.map((skill) => (
          <div key={skill.category}>
            <h3 className="text-sm font-semibold text-zinc-500 mb-3 uppercase tracking-wider">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span key={item} className="rounded-lg bg-zinc-800/60 border border-zinc-700/40 px-3 py-1.5 text-sm font-medium text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
