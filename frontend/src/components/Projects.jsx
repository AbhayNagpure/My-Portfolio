export default function Projects({ projects }) {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">Projects.</h2>
        <p className="text-zinc-500 mt-3 text-base max-w-lg">
          Some things I've built. Most of my work lives on GitHub.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="bento-card bento-card-hover p-8 flex flex-col h-full group">
            <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-zinc-500 leading-relaxed flex-grow text-sm">{project.description}</p>

            <div className="mt-8 pt-5 border-t border-white/5">
              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-md bg-zinc-800/60 border border-zinc-700/40 px-2 py-1 text-xs font-medium text-zinc-400">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group-hover:translate-x-1"
              >
                View on GitHub →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
