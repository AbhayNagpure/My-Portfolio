export default function Services({ services }) {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white">Things I build.</h2>
        <p className="text-zinc-500 mt-3 text-base max-w-lg">
          Here's what I can help you with. If you have something else in mind, just reach out.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.title}
            className="bento-card bento-card-hover p-7 flex flex-col gap-5 group"
          >
            <div className="text-3xl">{service.icon}</div>

            <div className="flex-grow">
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
