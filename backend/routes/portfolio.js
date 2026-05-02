import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hero: {
      name: "Abhay Nagpure",
      headline: "Hey, I'm Abhay, an engineer building the future of the web",
      description: "I'm a full-stack developer and student at IIT ISM Dhanbad. I specialize in building responsive, high-performance web applications. When I'm not coding or pushing my physical limits in the gym, I'm out capturing moments with the FotoFreaks photography club.",
      cta: "Let's Work Together",
    },
    about: {
      heading: "About Me",
      content: "I am a 2nd-year B.Tech student at IIT ISM Dhanbad with a deep passion for software development. I love the entire process of bringing an idea to life on the web—from designing intuitive user interfaces to architecting robust backend systems. Beyond the screen, I'm obsessed with hitting the gym and pushing my physical limits, and I also channel my creativity as an active member of the FotoFreaks photography club.",
      highlights: [
        "2nd-Year B.Tech at IIT ISM Dhanbad",
        "Full-Stack Developer (MERN Stack)",
        "Passionate about UI/UX and clean code",
        "Active member of FotoFreaks Photography Club",
        "Obsessed with the gym & pushing limits",
      ],
    },
    skills: [
      { category: "Frontend", items: ["React", "JavaScript", "HTML", "CSS", "Vite"] },
      { category: "Backend", items: ["Node.js", "Express", "MongoDB", "REST APIs"] },
      { category: "Tools", items: ["Git", "VS Code", "Postman", "Figma"] },
    ],
    services: [
      {
        icon: "🌐",
        title: "Landing Page",
        description: "A clean, fast, and conversion-optimised single page for your product or startup.",
        price: "Let's Talk",
      },
      {
        icon: "⚛️",
        title: "React Web App",
        description: "Full-featured interactive web applications built with React and a robust backend.",
        price: "Let's Talk",
      },
      {
        icon: "💼",
        title: "Portfolio Website",
        description: "A stunning, personalised portfolio to showcase your work and stand out online.",
        price: "Let's Talk",
      },
      {
        icon: "🛒",
        title: "E-commerce Store",
        description: "End-to-end online store with product management, cart, and payment integration.",
        price: "Let's Talk",
      },
    ],
    projects: [
      {
        title: "E-commerce App",
        description: "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "https://github.com/AbhayNagpure?tab=repositories",
      },
      {
        title: "Product Store",
        description: "An online store for various products with advanced search, filters, and shopping cart functionality.",
        techStack: ["React", "Express", "MongoDB"],
        link: "https://github.com/AbhayNagpure?tab=repositories",
      },
      {
        title: "Twitter Clone",
        description: "A social media platform clone with posting, following users, likes, and real-time updates.",
        techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
        link: "https://github.com/AbhayNagpure?tab=repositories",
      },
    ],
    contact: {
      heading: "Let's Work Together",
      description: "Got a project in mind? Whether it's a landing page, a full web app, or just a chat — I'm always open. Reach out directly or fill in the form below.",
      email: "abhaynagpure99@gmail.com",
      whatsapp: "919644135806",
    },
  });
});

export default router;

