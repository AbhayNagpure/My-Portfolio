import { Link } from "react-router-dom";

export default function Header({ hero }) {
  return (
    <header className="flex flex-col gap-8">
      {/* Navigation Card */}
      <nav className="bento-card flex items-center justify-between px-8 py-5">
        <span className="font-bold text-2xl tracking-tight text-white capitalize">Portfolio</span>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#about" className="transition-colors hover:text-white">About</a>
          <a href="#projects" className="transition-colors hover:text-white">Projects</a>
          <Link to="/gallery" className="transition-colors hover:text-white">Gallery</Link>
          <a href="#contact" className="rounded-full bg-white text-black px-5 py-2.5 transition-transform hover:scale-105 font-bold shadow-xl">
            Let's Talk
          </a>
        </div>
      </nav>

      {/* Hero Card */}
      <section className="bento-card p-10 sm:p-16 lg:p-20 relative overflow-hidden flex flex-col justify-center min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center rounded-full bg-zinc-800/50 border border-zinc-700/50 px-4 py-1.5 text-sm font-medium text-zinc-400 mb-8">
            IIT Dhanbad · MERN-Stack Developer
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1]">
            {hero.headline.split("Abhay").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-rose-400">Abhay</span>}
              </span>
            ))}
          </h1>

          <p className="mt-8 text-xl sm:text-2xl text-zinc-400 font-medium max-w-2xl leading-relaxed">
            {hero.description}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-rose-500 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:bg-rose-400 shadow-[0_0_40px_rgba(244,63,94,0.3)]">
              {hero.cta} →
            </a>
            <a href="#projects" className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-zinc-300 transition-colors hover:bg-white/5 hover:text-white">
              Explore Work
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}
