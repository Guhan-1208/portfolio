import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Certificates", "Contact"];

const SKILLS = [
  { category: "Languages", items: ["HTML", "CSS", "JavaScript", "Python"], icon: "⌨️" },
  { category: "Frameworks", items: ["React", "Node.js"], icon: "⚛️" },
  { category: "Tools", items: ["Adobe After Effects", "CapCut", "Figma"], icon: "🛠️" },
  { category: "Databases", items: ["MongoDB"], icon: "🗄️" },
  { category: "Cloud & AI", items: ["IBM Cloud", "Google AI/ML"], icon: "☁️" },
  { category: "Design", items: ["UI/UX", "Wireframing", "Prototyping"], icon: "🎨" },
];

const PROJECTS = [
  {
    title: "Esports Registration Frontend",
    desc: "A dynamic player registration form with real-time validation and preview for esports tournaments.",
    tag: "Frontend",
    color: "#00d4ff",
    link: "./webpage/gamepg.html",
    linkLabel: "View Webpage",
    emoji: "🎮",
  },
  {
    title: "Soil Nutrition Monitoring",
    desc: "IoT-based dashboard hosted on Blynk for sustainable agriculture monitoring.",
    tag: "IoT",
    color: "#00ff9d",
    link: "./projects/IoT based soil nutrition monitoring system.pdf",
    linkLabel: "View Report",
    emoji: "🌱",
  },
  {
    title: "Figma Portfolio Design",
    desc: "A clean and modern portfolio UI/UX design created in Figma with structured layout and smooth navigation.",
    tag: "UI/UX",
    color: "#a78bfa",
    link: "https://www.figma.com/proto/dLdik9a5HmeClfbPBs5JjP/Portfolio?page-id=0%3A1&node-id=3-2",
    linkLabel: "View Design",
    emoji: "✏️",
  },
  {
    title: "Student Marks App",
    desc: "A web application to manage and calculate student marks with an intuitive UI for result tracking.",
    tag: "Full Stack",
    color: "#f59e0b",
    link: "https://github.com/Guhan-1208/student-marks-app.git",
    linkLabel: "View on GitHub",
    emoji: "📊",
  },
];

const CERTIFICATES = [
  { name: "Bharatiya Antariksh Hackathon 2025", org: "Hack2Skill & ISRO", emoji: "🚀" },
  { name: "Full Stack Development Internship", org: "RKS Infotech, Puducherry", emoji: "💼" },
  { name: "Web Development Internship", org: "Layercodes Technologies", emoji: "🌐" },
  { name: "AICTE-Google AI/ML Virtual Internship", org: "EduSkills", emoji: "🤖" },
  { name: "HTML5 Application Development", org: "CertNexus", emoji: "📄" },
  { name: "Journey to Cloud", org: "IBM SkillsBuild", emoji: "☁️" },
  { name: "Introduction to MongoDB", org: "MongoDB, Inc.", emoji: "🗄️" },
  { name: "React Certification", org: "Online Platform", emoji: "⚛️" },
  { name: "Cybersecurity Internship", org: "Industry Partner", emoji: "🔐" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,0.9,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(5,8,20,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
      transition: "all 0.4s ease",
      padding: "1rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.4rem", fontWeight: 700, color: "#00d4ff", letterSpacing: "2px" }}>
        GK<span style={{ color: "#fff", opacity: 0.3 }}>.</span>
      </span>

      {/* Desktop */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => scrollTo(link)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === link ? "#00d4ff" : "rgba(255,255,255,0.6)",
              fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 500,
              letterSpacing: "1px", textTransform: "uppercase",
              borderBottom: active === link ? "1px solid #00d4ff" : "1px solid transparent",
              paddingBottom: "4px",
              transition: "all 0.3s ease",
            }}
          >{link}</button>
        ))}
        <a href="https://www.figma.com/proto/dLdik9a5HmeClfbPBs5JjP/Portfolio" target="_blank" rel="noreferrer"
          style={{
            padding: "0.4rem 1rem", border: "1px solid #00d4ff", borderRadius: "4px",
            color: "#00d4ff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem",
            textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "#00d4ff"; e.target.style.color = "#050814"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#00d4ff"; }}
        >Figma</a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMobileOpen(!mobileOpen)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#00d4ff", fontSize: "1.5rem", display: "none" }}
        className="hamburger">☰</button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0,
          background: "rgba(5,8,20,0.97)", backdropFilter: "blur(20px)",
          padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem",
          borderBottom: "1px solid rgba(0,212,255,0.2)",
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === link ? "#00d4ff" : "rgba(255,255,255,0.7)",
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem",
                textAlign: "left", textTransform: "uppercase", letterSpacing: "2px",
              }}
            >{link}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const words = useRef(["Front-end Developer", "Creative Video Editor", "UI/UX Enthusiast", "Full-Stack Builder"]);
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
  const wordList = words.current;          // ← read from ref
  const word = wordList[wIdx];             // ← use local var
  const timeout = setTimeout(() => {
    if (!deleting) {
      setTyped(word.slice(0, typed.length + 1));
      if (typed.length + 1 === word.length) setTimeout(() => setDeleting(true), 1500);
    } else {
      setTyped(word.slice(0, typed.length - 1));
      if (typed.length === 0) { setDeleting(false); setWIdx((wIdx + 1) % wordList.length); }
    }
  }, deleting ? 50 : 90);
  return () => clearTimeout(timeout);
}, [typed, deleting, wIdx]);  // ← no `words` needed here

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "0 2rem", position: "relative", overflow: "hidden",
    }}>
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "1.5rem", animation: "fadeSlideUp 0.8s ease forwards" }}>
          <span style={{
            display: "inline-block", padding: "0.3rem 1rem",
            border: "1px solid rgba(0,212,255,0.3)", borderRadius: "20px",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem",
            color: "#00d4ff", letterSpacing: "3px", textTransform: "uppercase",
            background: "rgba(0,212,255,0.05)",
          }}>Welcome to my portfolio</span>
        </div>

        <h1 style={{
          fontFamily: "'Orbitron', monospace", fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
          fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem",
          background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #a78bfa 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "fadeSlideUp 0.8s ease 0.2s forwards", opacity: 0,
        }}>
          Hi, I'm<br />Guhan K
        </h1>

        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          color: "rgba(255,255,255,0.7)", marginBottom: "3rem", height: "2rem",
          animation: "fadeSlideUp 0.8s ease 0.4s forwards", opacity: 0,
        }}>
          <span style={{ color: "#00d4ff" }}>{typed}</span>
          <span style={{ animation: "blink 1s infinite", color: "#00d4ff" }}>|</span>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeSlideUp 0.8s ease 0.6s forwards", opacity: 0 }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "0.8rem 2rem", background: "linear-gradient(135deg, #00d4ff, #a78bfa)",
              border: "none", borderRadius: "6px", cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: "0.9rem", color: "#050814", letterSpacing: "1px", textTransform: "uppercase",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 25px rgba(0,212,255,0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
          >See My Work</button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "0.8rem 2rem", background: "transparent",
              border: "1px solid rgba(0,212,255,0.5)", borderRadius: "6px", cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: "0.9rem", color: "#00d4ff", letterSpacing: "1px", textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(0,212,255,0.1)"; e.target.style.borderColor = "#00d4ff"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(0,212,255,0.5)"; }}
          >Get in Touch</button>
        </div>

        {/* Social links */}
        <div style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", justifyContent: "center", animation: "fadeSlideUp 0.8s ease 0.8s forwards", opacity: 0 }}>
          {[
            { label: "LinkedIn", url: "https://www.linkedin.com/in/guhan1208/" },
            { label: "GitHub", url: "https://github.com/Guhan-1208" },
            { label: "Instagram", url: "https://www.instagram.com/guhan.insta/" },
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "1px", textDecoration: "none", transition: "color 0.3s ease" }}
              onMouseEnter={e => e.target.style.color = "#00d4ff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
            >{s.label}</a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, #00d4ff)", margin: "0 auto" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "4px", color: "#00d4ff", textTransform: "uppercase" }}>Who I Am</span>
        </div>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", marginBottom: "3rem", color: "#fff" }}>About Me</h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="about-grid">
        <FadeIn direction="left" delay={100}>
          <div style={{
            padding: "2.5rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: "16px",
            position: "relative",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ position: "absolute", top: "-1px", left: "2rem", right: "2rem", height: "2px", background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0 }}>
              Hey there! I'm <span style={{ color: "#00d4ff", fontWeight: 700 }}>Guhan</span>, a passionate full-stack developer currently pursuing my B.Tech.
              I enjoy crafting dynamic web applications and combining technology with creativity.
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginTop: "1rem", marginBottom: 0 }}>
              When I'm not coding, I love exploring new tools and creative arts. I've interned at <span style={{ color: "#a78bfa" }}>RKS Infotech</span> and participated in national-level hackathons like the <span style={{ color: "#00ff9d" }}>Bharatiya Antariksh Hackathon 2025</span>. Let's build something awesome!
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={200}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "B.Tech Student", icon: "🎓" },
              { label: "Full-Stack Developer", icon: "💻" },
              { label: "Creative Video Editor", icon: "🎬" },
              { label: "ISRO Hackathon Participant", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem 1.5rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(0,212,255,0.1)",
                borderRadius: "10px",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.background = "rgba(0,212,255,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", fontWeight: 500 }}>{item.label}</span>
                <span style={{ marginLeft: "auto", color: "#00d4ff", fontSize: "0.8rem" }}>→</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr !important;gap:2rem !important;}}`}</style>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "4px", color: "#00d4ff", textTransform: "uppercase" }}>What I Know</span>
        </div>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", marginBottom: "3rem", color: "#fff" }}>Skills</h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {SKILLS.map((skill, i) => (
          <FadeIn key={skill.category} delay={i * 80} direction="up">
            <div style={{
              padding: "2rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,212,255,0.12)",
              borderRadius: "14px",
              backdropFilter: "blur(10px)",
              transition: "all 0.4s ease",
              cursor: "default",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                e.currentTarget.style.background = "rgba(0,212,255,0.04)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,212,255,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.12)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)" }} />
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{skill.icon}</div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.9rem", color: "#00d4ff", letterSpacing: "2px", marginBottom: "1rem", textTransform: "uppercase" }}>{skill.category}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skill.items.map(item => (
                  <span key={item} style={{
                    padding: "0.3rem 0.8rem", background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.2)", borderRadius: "20px",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.8)",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "4px", color: "#00d4ff", textTransform: "uppercase" }}>What I've Built</span>
        </div>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", marginBottom: "3rem", color: "#fff" }}>Projects</h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {PROJECTS.map((proj, i) => (
          <FadeIn key={proj.title} delay={i * 100} direction="up">
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: "16px",
              overflow: "hidden",
              transition: "all 0.4s ease",
              cursor: "pointer",
              position: "relative",
              display: "flex", flexDirection: "column",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = proj.color + "44";
                e.currentTarget.style.boxShadow = `0 25px 50px ${proj.color}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Top accent */}
              <div style={{ height: "3px", background: `linear-gradient(90deg, ${proj.color}, transparent)` }} />

              <div style={{ padding: "2rem", flex: 1 }}>
                {/* Emoji + tag */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                  <span style={{ fontSize: "2.5rem" }}>{proj.emoji}</span>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    background: `${proj.color}15`,
                    border: `1px solid ${proj.color}40`,
                    borderRadius: "20px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.72rem", color: proj.color, letterSpacing: "1px",
                  }}>{proj.tag}</span>
                </div>

                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1rem", color: "#fff", marginBottom: "0.75rem", lineHeight: 1.4 }}>{proj.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{proj.desc}</p>
              </div>

              <div style={{ padding: "0 2rem 2rem" }}>
                <a href={proj.link} target="_blank" rel="noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.6rem 1.3rem",
                    background: `${proj.color}18`,
                    border: `1px solid ${proj.color}50`,
                    borderRadius: "6px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.82rem", color: proj.color,
                    textDecoration: "none", fontWeight: 600,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = proj.color + "30"; e.currentTarget.style.borderColor = proj.color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = proj.color + "18"; e.currentTarget.style.borderColor = proj.color + "50"; }}
                >
                  {proj.linkLabel} <span>↗</span>
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Certificates() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? CERTIFICATES : CERTIFICATES.slice(0, 4);

  return (
    <section id="certificates" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "4px", color: "#00d4ff", textTransform: "uppercase" }}>Credentials</span>
        </div>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", marginBottom: "3rem", color: "#fff" }}>Certificates</h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.2rem" }}>
        {visible.map((cert, i) => (
          <FadeIn key={cert.name} delay={i * 60} direction="up">
            <div style={{
              padding: "1.5rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(0,212,255,0.1)",
              borderRadius: "12px",
              display: "flex", gap: "1rem", alignItems: "flex-start",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.35)"; e.currentTarget.style.background = "rgba(0,212,255,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
            >
              <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{cert.emoji}</span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#fff", margin: 0, marginBottom: "0.25rem", lineHeight: 1.4 }}>{cert.name}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#00d4ff", margin: 0 }}>{cert.org}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <button onClick={() => setShowAll(!showAll)}
          style={{
            padding: "0.75rem 2rem",
            background: "transparent",
            border: "1px solid rgba(0,212,255,0.4)",
            borderRadius: "6px", cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.9rem", color: "#00d4ff", fontWeight: 600,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => { e.target.style.background = "rgba(0,212,255,0.1)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; }}
        >{showAll ? "Show Less" : `Load More (${CERTIFICATES.length - 4} more)`}</button>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_key: "91e86fe4-c80d-4c31-93d0-f205f1a5721a", ...form }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ padding: "6rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", letterSpacing: "4px", color: "#00d4ff", textTransform: "uppercase" }}>Let's Talk</span>
        </div>
        <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", marginBottom: "0.5rem", color: "#fff" }}>Contact Me</h2>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", textAlign: "center", color: "rgba(255,255,255,0.5)", marginBottom: "3rem" }}>Got a project in mind? Let's make it happen.</p>
      </FadeIn>

      <FadeIn direction="up" delay={150}>
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,212,255,0.15)",
          borderRadius: "20px",
          padding: "2.5rem",
          backdropFilter: "blur(10px)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-1px", left: "3rem", right: "3rem", height: "2px", background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
              { id: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
            ].map(field => (
              <div key={field.id}>
                <label style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "#00d4ff", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>{field.label}</label>
                <input
                  type={field.type} required placeholder={field.placeholder}
                  value={form[field.id]} onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                  style={{
                    width: "100%", padding: "0.85rem 1rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    borderRadius: "8px", color: "#fff", outline: "none",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem",
                    transition: "border-color 0.3s",
                    boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = "#00d4ff"}
                  onBlur={e => e.target.style.borderColor = "rgba(0,212,255,0.2)"}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.82rem", color: "#00d4ff", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>Message</label>
              <textarea required rows={5} placeholder="Write your message here..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{
                  width: "100%", padding: "0.85rem 1rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: "8px", color: "#fff", outline: "none",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem",
                  resize: "vertical", transition: "border-color 0.3s",
                  boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = "#00d4ff"}
                onBlur={e => e.target.style.borderColor = "rgba(0,212,255,0.2)"}
              />
            </div>

            <button type="submit" disabled={status === "sending"}
              style={{
                padding: "0.9rem 2rem",
                background: status === "sent" ? "linear-gradient(135deg,#00ff9d,#00d4ff)" : "linear-gradient(135deg,#00d4ff,#a78bfa)",
                border: "none", borderRadius: "8px", cursor: status === "sending" ? "wait" : "pointer",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: "0.95rem", color: "#050814", letterSpacing: "1px", textTransform: "uppercase",
                transition: "all 0.3s ease",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "✓ Message Sent!" : "Send Message"}
            </button>
            {status === "error" && <p style={{ color: "#ff4d6d", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", margin: 0 }}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={250}>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {[
            { label: "LinkedIn", url: "https://www.linkedin.com/in/guhan1208/" },
            { label: "GitHub", url: "https://github.com/Guhan-1208" },
            { label: "Instagram", url: "https://www.instagram.com/guhan.insta/" },
            { label: "WhatsApp", url: "https://wa.me/+916385233472" },
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", textDecoration: "none", letterSpacing: "1px", transition: "color 0.3s ease", borderBottom: "1px solid transparent" }}
              onMouseEnter={e => { e.target.style.color = "#00d4ff"; e.target.style.borderColor = "#00d4ff"; }}
              onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.4)"; e.target.style.borderColor = "transparent"; }}
            >{s.label}</a>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: 0.4 });
    NAV_LINKS.forEach(link => { const el = document.getElementById(link.toLowerCase()); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050814; color: #fff; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #050814; }
        ::-webkit-scrollbar-thumb { background: #00d4ff40; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3) !important; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>

      <Navbar active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />

      <footer style={{
        textAlign: "center", padding: "2rem",
        borderTop: "1px solid rgba(0,212,255,0.08)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.82rem", color: "rgba(255,255,255,0.25)",
        letterSpacing: "1px",
      }}>
        © 2025 Guhan K — Built with ❤️ and React
      </footer>
    </>
  );
}
