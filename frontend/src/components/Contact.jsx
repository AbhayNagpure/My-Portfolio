import { useState } from "react";
import { sendContactMessage } from "../api";

export default function Contact({ contact }) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");
    try {
      await sendContactMessage(formState);
      setFormStatus("Message sent! I'll get back to you soon.");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus(`Error: ${error.message}`);
    }
  };

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=Hey%20Abhay%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20work%20together!`;
  const mailtoUrl = `mailto:${contact.email}`;

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="bento-card p-10 sm:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="grid gap-12 lg:grid-cols-2 relative z-10">

          {/* Left: Direct contact */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-5">
                {contact.heading}
              </h2>
              <p className="text-zinc-400 leading-relaxed text-lg max-w-sm">
                {contact.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 bento-card bento-card-hover px-6 py-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="text-white font-bold">+91 96441 35806</p>
                </div>
                <span className="ml-auto text-zinc-600 group-hover:text-white transition-colors text-xl">→</span>
              </a>

              {/* Email */}
              <a
                href={mailtoUrl}
                className="group flex items-center gap-5 bento-card bento-card-hover px-6 py-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 transition-colors">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-white font-bold">{contact.email}</p>
                </div>
                <span className="ml-auto text-zinc-600 group-hover:text-white transition-colors text-xl">→</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
                className="col-span-1 bg-zinc-800/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all placeholder-zinc-600 font-medium"
              />
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                placeholder="Your email"
                className="col-span-1 bg-zinc-800/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all placeholder-zinc-600 font-medium"
              />
            </div>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              rows="6"
              required
              placeholder="Tell me about your project..."
              className="bg-zinc-800/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all resize-none placeholder-zinc-600 font-medium flex-grow"
            />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              {formStatus ? (
                <p className={`text-sm font-medium ${formStatus.includes("Error") ? "text-red-400" : "text-green-400"}`}>
                  {formStatus}
                </p>
              ) : (
                <p className="text-zinc-500 text-sm">I typically respond within 24 hours.</p>
              )}
              <button
                type="submit"
                className="rounded-full bg-white text-black px-8 py-4 font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                Send Message →
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
