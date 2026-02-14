import { useState, useEffect, useRef } from "react";

// ─── DATA ───
const TYPING_TITLES = [
  "Data Analytics Engineer",
  "Business Intelligence Engineer",
  "Data Analyst",
  "Dashboard Storyteller",
];

const VALUE_PROPS = [
  { icon: "📊", title: "Dashboard Design", desc: "Crafting self-serve dashboards that drive decisions" },
  { icon: "⚙️", title: "Pipeline Engineering", desc: "Building reliable ETL/ELT pipelines at scale" },
  { icon: "🔍", title: "Data Modeling", desc: "Designing efficient schemas and medallion architectures" },
  { icon: "📈", title: "Insight Delivery", desc: "Translating complex data into actionable business insights" },
];


const SKILL_CATEGORIES = {
  "Programming & Scripting": ["SQL", "Python", "Pandas", "NumPy", "PySpark", "Matplotlib", "Plotly", "Jinja", "R"],
  "BI & Visualization": ["Tableau", "Power BI", "DAX", "Power Query", "Excel", "PivotTables"],
  "Data Warehousing": ["AWS Redshift", "Snowflake", "PostgreSQL", "MS SQL Server", "MySQL"],
  "Cloud & Engineering": ["dbt Cloud", "Databricks", "Delta Live Tables", "Autoloader", "Apache Spark"],
  "Modeling & Analytics": ["ETL/ELT", "Medallion Architecture", "Data Governance", "Git"],
  "Reporting Methods": ["Ad-hoc Analysis", "Data Validation", "Statistical Reporting", "Dashboard Automation"],
};

const EDUCATION = [
  { degree: "Master of Science, Data Analytics Engineering", school: "Northeastern University", location: "Boston, MA", period: "Sep 2023 – Dec 2025" },
  { degree: "Bachelor of Engineering, Computer Science", school: "University of Mumbai", location: "Mumbai, India", period: "Aug 2017 – Jun 2021" },
];

const EXPERIENCE = [
  {
    role: "Business Intelligence Engineer Co-op", company: "Sunny Benefits Inc.", period: "Jan 2025 – Aug 2025",
    tag: "Healthcare BI & Analytics",
    description: "Built scalable BI solutions and self-serve Tableau dashboards for healthcare benefits analytics, optimizing data pipelines with dbt Cloud and AWS Redshift.",
    stats: [{ value: 60, suffix: "%", label: "Faster Dashboards" }, { value: 2, suffix: "M+", label: "Records Processed" }],
  },
  {
    role: "Data Analyst", company: "Orient Technologies Pvt Ltd", period: "Aug 2021 – Jul 2023",
    tag: "Financial Analytics & BI",
    description: "Delivered 30+ Power BI dashboards and automated ETL workflows for finance and insurance clients, reducing manual workload and improving data reliability.",
    stats: [{ value: 30, suffix: "+", label: "Dashboards Built" }, { value: 80, suffix: "%", label: "Redundancy Cut" }],
  },
];

const PROJECTS = [
  { title: "Stock Market Data Pipeline Analysis", category: "Academic", tags: ["Databricks", "Spark Streaming", "Power BI"], description: "Real-time Databricks pipeline with Spark Structured Streaming, boosting cluster efficiency by 30%.", github: null },
  { title: "Readmission Analysis of Diabetes Patients", category: "Academic", tags: ["Python", "Random Forest", "Decision Trees"], description: "ML models classifying 30-day readmission risk with 89% accuracy.", github: "https://github.com/MallikaGaikwad/Readmission-Analysis-of-Diabetes-patients" },
  { title: "Healthcare Benefits Analytics", category: "Work", tags: ["dbt Cloud", "SQL", "Tableau", "AWS Redshift"], description: "EAV analytics layer unifying healthcare data, cutting dashboard load time by 60%.", github: null },
  { title: "Financial BI Reporting Suite", category: "Work", tags: ["Power BI", "DAX", "Python", "AWS EC2"], description: "30+ Power BI dashboards with automated ETL, cutting manual workload by 28%.", github: null },
  { title: "dbt Pipeline Optimization", category: "Work", tags: ["dbt Cloud", "Medallion Architecture", "AWS Redshift"], description: "Medallion architecture with 10+ models, reducing pipeline failures by 40%.", github: null },
  { title: "Data Inspector Project", category: "GitHub", tags: ["Python", "EDA", "Automation"], description: "Python tool for automated exploratory data analysis and quality checks.", github: "https://github.com/MallikaGaikwad/datainspector-project" },
  { title: "NoShow Analysis", category: "GitHub", tags: ["T-SQL", "Healthcare"], description: "Healthcare no-show pattern analysis using T-SQL for scheduling improvements.", github: "https://github.com/MallikaGaikwad/NoShow_Analysis" },
  { title: "Offense Rate Analysis", category: "GitHub", tags: ["Python", "Jupyter", "Visualization"], description: "EDA of offense rate data with statistical analysis and visualizations.", github: "https://github.com/MallikaGaikwad/Offense-Rate-Analysis" },
  { title: "MedScript – AI Diagnosis Assistant", category: "GitHub", tags: ["AI", "Healthcare", "ML"], description: "AI-powered medical diagnosis assistant for clinical decision-making.", github: "https://github.com/agirishkumar/MedScript" },
];

const CERTIFICATIONS = [
  { name: "Tableau Desktop Specialist", issuer: "Tableau", year: "2024", icon: "📊" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", icon: "☁️" },
  { name: "dbt Fundamentals", issuer: "dbt Labs", year: "2025", icon: "🔧" },
  { name: "Python for Data Science", issuer: "IBM", year: "2023", icon: "🐍" },
];

const LEARNING = ["Snowflake", "Microsoft Fabric", "LeetCode SQL", "Data Lemur Challenges", "Advanced dbt Patterns"];

const FUN_FACTS = [
  { icon: "🌍", text: "Worked across 2 countries — India & USA" },
  { icon: "📚", text: "Lifelong learner — always upskilling on weekends" },
  { icon: "🍜", text: "Love exploring new cuisines and restaurants" },
  { icon: "🧩", text: "Enjoy solving SQL puzzles on Data Lemur" },
  { icon: "✈️", text: "Passionate about traveling and new cultures" },
];

const CATEGORIES = ["All", "Work", "Academic", "GitHub", "Tableau"];
const NAV_LINKS = ["About", "Skills", "Education", "Experience", "Projects", "Contact"];

// ─── HOOKS ───
function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useAnimatedCounter(end, suffix = "", duration = 1500, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, end, duration]);
  return val + suffix;
}

// ─── COMPONENTS ───
function FadeIn({ children, delay = 0 }) {
  const ref = useRef();
  const visible = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100, background: "#e5e5e5" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.1s ease" }} />
    </div>
  );
}

function TypingHero({ titles }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = titles[idx];
    const timeout = deleting ? 40 : 80;
    if (!deleting && text === current) {
      setTimeout(() => setDeleting(true), 1800);
      return;
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % titles.length);
      return;
    }
    const timer = setTimeout(() => {
      setText(deleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
    }, timeout);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, titles]);
  return (
    <span>
      {text}
      <span style={{ borderRight: "2px solid #6366f1", marginLeft: 2, animation: "blink 1s infinite" }} />
      <style>{`@keyframes blink { 0%,50% { opacity:1 } 51%,100% { opacity:0 } }`}</style>
    </span>
  );
}

function AnimatedStat({ end, suffix, label }) {
  const ref = useRef();
  const visible = useInView(ref, 0.3);
  const val = useAnimatedCounter(end, suffix, 1200, visible);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: "#6366f1" }}>{val}</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{label}</div>
    </div>
  );
}


function LearningTicker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 18 }}>📚</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "1.5px" }}>Currently Learning</span>
        <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
      </div>
      <div style={{ overflow: "hidden", padding: "14px 0", background: "#fff", borderRadius: 10, border: "1px solid #eee" }}>
        <div style={{ display: "flex", gap: 40, animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ fontSize: 14, fontWeight: 600, color: "#555", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: "pulse 2s infinite" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } } @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.3 } }`}</style>
    </div>
  );
}

function TableauSection() {
  return (
    <FadeIn>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8", overflow: "hidden", textAlign: "center" }}>
        <div style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", padding: "48px 32px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>My Tableau Public Portfolio</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", margin: 0 }}>Interactive dashboards & data visualizations</p>
        </div>
        <div style={{ padding: "36px 32px" }}>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 28px" }}>
            Explore my Tableau dashboards across healthcare, finance, and business analytics — designed to deliver clear, actionable insights.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {["Healthcare Analytics", "Financial KPIs", "Business Dashboards", "Data Storytelling"].map((t) => (
              <span key={t} style={{ fontSize: 12, padding: "6px 14px", background: "#ede9fe", color: "#6366f1", borderRadius: 20, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
          <a href="https://public.tableau.com/app/profile/mallika.gaikwad/vizzes" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 36px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >📊 View on Tableau Public →</a>
        </div>
      </div>
    </FadeIn>
  );
}

function ProjectCard({ p, i }) {
  return (
    <FadeIn delay={i * 0.08}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #e8e8e8", transition: "transform 0.2s, box-shadow 0.2s", height: "100%", display: "flex", flexDirection: "column" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10 }}>{p.category}</span>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, flex: 1 }}>{p.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {p.tags.map((t) => (
            <span key={t} style={{ fontSize: 11, padding: "4px 10px", background: "#ede9fe", color: "#6366f1", borderRadius: 4, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: 13, fontWeight: 600, color: "#6366f1", textDecoration: "none", padding: "6px 14px", border: "1px solid #e0e0e0", borderRadius: 6, transition: "background 0.2s, border-color 0.2s", alignSelf: "flex-start" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ede9fe"; e.currentTarget.style.borderColor = "#6366f1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
          >⌨ View on GitHub</a>
        )}
      </div>
    </FadeIn>
  );
}

function ExpAnimatedStat({ end, suffix, label }) {
  const ref = useRef();
  const visible = useInView(ref, 0.3);
  const val = useAnimatedCounter(end, suffix, 1200, visible);
  return (
    <div ref={ref}>
      <div style={{ fontSize: 26, fontWeight: 800, color: "#6366f1" }}>{val}</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{label}</div>
    </div>
  );
}

// ─── MAIN ───
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: "#1a1a1a", background: "#fafafa" }}>
      <ScrollProgress />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 3, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e5e5e5" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            M<span style={{ color: "#6366f1" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map((l) => (
              <span key={l} onClick={() => scrollTo(l.toLowerCase())}
                style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#555", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#6366f1")}
                onMouseLeave={(e) => (e.target.style.color = "#555")}
              >{l}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}>
        <div style={{ textAlign: "center", maxWidth: 700 }}>
          <FadeIn>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#6366f1", marginBottom: 12, letterSpacing: "2px", textTransform: "uppercase", minHeight: 22 }}>
              <TypingHero titles={TYPING_TITLES} />
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: "-1.5px" }}>
              Hi, I'm <span style={{ color: "#6366f1" }}>Mallika</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: "#666", lineHeight: 1.7, margin: "0 0 36px" }}>
              Building business intelligence solutions across finance and healthtech. I specialize in analytical reporting, data modeling, and dashboard automation — turning complex data into clear, actionable insights.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")}
                style={{ padding: "14px 32px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(99,102,241,0.3)"; }}
                onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
              >View Projects</button>
              <a href="#resume" target="_blank" rel="noopener noreferrer"
                style={{ padding: "14px 32px", background: "transparent", color: "#1a1a1a", border: "2px solid #d4d4d4", borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d4d4d4")}
              >📄 Download Resume</a>
              <button onClick={() => scrollTo("contact")}
                style={{ padding: "14px 32px", background: "transparent", color: "#1a1a1a", border: "2px solid #d4d4d4", borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.borderColor = "#6366f1")}
                onMouseLeave={(e) => (e.target.style.borderColor = "#d4d4d4")}
              >Get in Touch</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>About Me</h2>
          <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 32 }} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            <div style={{ fontSize: 16, color: "#444", lineHeight: 1.8 }}>
              <p>I'm a Data Analytics & BI Engineer with ~3 years of experience building business intelligence solutions across finance and healthtech domains. I'm proficient in SQL, Python, dbt Cloud, AWS Redshift, Tableau and Power BI.</p>
              <p style={{ marginTop: 16 }}>I recently graduated with my <strong>Master's in Data Analytics Engineering</strong> from Northeastern University, Boston (Dec 2025). I also hold a <strong>Bachelor's in Computer Science</strong> from the University of Mumbai.</p>
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: "1px solid #e8e8e8" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <AnimatedStat end={3} suffix="+ Yrs" label="Experience" />
                <AnimatedStat end={2} suffix="+" label="Industries" />
                <AnimatedStat end={33} suffix="%" label="Pipeline Efficiency" />
                <AnimatedStat end={95} suffix="%" label="Reporting Accuracy" />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* WHAT I BRING */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px", textAlign: "center" }}>What I Bring to the Table</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, margin: "0 auto 40px" }} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {VALUE_PROPS.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div style={{ textAlign: "center", padding: "32px 20px", background: "#fafafa", borderRadius: 12, border: "1px solid #eee", transition: "transform 0.2s, box-shadow 0.2s", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 200 }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{v.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS - Interactive Bars + Tags */}
      <section id="skills" style={{ padding: "100px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Technical Skills</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 40 }} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {Object.entries(SKILL_CATEGORIES).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.08}>
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #eee", height: "100%" }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>{cat}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map((s) => (
                      <span key={s} style={{ fontSize: 13, padding: "6px 12px", background: "#fafafa", borderRadius: 6, border: "1px solid #e5e5e5", color: "#333", fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          {/* Currently Learning Ticker */}
          <LearningTicker items={LEARNING} />
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Education</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 40 }} />
          </FadeIn>
          <div style={{ position: "relative", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: "#e5e5e5" }} />
            {EDUCATION.map((edu, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ marginBottom: 32, position: "relative" }}>
                  <div style={{ position: "absolute", left: -29, top: 6, width: 16, height: 16, borderRadius: "50%", background: "#6366f1", border: "3px solid #fff" }} />
                  <div style={{ background: "#fafafa", borderRadius: 12, padding: 28, border: "1px solid #e8e8e8" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{edu.degree}</h3>
                        <p style={{ fontSize: 15, color: "#6366f1", fontWeight: 600, margin: "4px 0 0" }}>{edu.school}</p>
                        <p style={{ fontSize: 13, color: "#999", margin: "2px 0 0" }}>{edu.location}</p>
                      </div>
                      <span style={{ fontSize: 13, color: "#888", fontWeight: 500, background: "#fff", padding: "4px 12px", borderRadius: 20 }}>{edu.period}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px", color: "#1a1a1a" }}>Experience</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 60 }} />
          </FadeIn>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "#e5e5e5", transform: "translateX(-1px)" }} />
            {EXPERIENCE.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <FadeIn key={i} delay={i * 0.2}>
                  <div style={{ display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end", position: "relative", marginBottom: 64 }}>
                    <div style={{ position: "absolute", left: "50%", top: 32, transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: "#fafafa", border: "2px solid #6366f1", zIndex: 2 }} />
                    <div style={{ width: "44%", background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e8e8e8", transition: "transform 0.3s, box-shadow 0.3s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 2px" }}>{exp.company}</h3>
                      <p style={{ fontSize: 14, color: "#888", margin: "0 0 14px" }}>{exp.role} · {exp.period}</p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#6366f1", background: "#ede9fe", padding: "5px 14px", borderRadius: 20, border: "1px solid #ddd5fe", marginBottom: 16 }}>
                        ✦ {exp.tag}
                      </span>
                      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: "0 0 20px" }}>{exp.description}</p>
                      <div style={{ display: "flex", gap: 32 }}>
                        {exp.stats.map((s) => (
                          <ExpAnimatedStat key={s.label} end={s.value} suffix={s.suffix} label={s.label} />
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Certifications</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 40 }} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {CERTIFICATIONS.map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.1}>
                <div style={{ background: "#fafafa", borderRadius: 12, padding: 24, border: "1px solid #eee", textAlign: "center", transition: "transform 0.2s", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 160 }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: "#1a1a1a" }}>{c.name}</h3>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{c.issuer} · {c.year}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Projects</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 32 }} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setActiveFilter(c)}
                  style={{ padding: "8px 20px", borderRadius: 20, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeFilter === c ? "#6366f1" : "#e8e8e8", color: activeFilter === c ? "#fff" : "#555", transition: "all 0.2s" }}
                >{c}</button>
              ))}
            </div>
          </FadeIn>
          {activeFilter === "Tableau" ? <TableauSection /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {filtered.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Certifications</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, marginBottom: 40 }} />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {CERTIFICATIONS.map((c, i) => (
              <FadeIn key={c.name} delay={i * 0.1}>
                <div style={{ background: "#fafafa", borderRadius: 12, padding: 24, border: "1px solid #eee", textAlign: "center", transition: "transform 0.2s", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 160 }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: "#1a1a1a" }}>{c.name}</h3>
                  <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{c.issuer} · {c.year}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FUN FACTS */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px", textAlign: "center" }}>Beyond the Data</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, margin: "0 auto 40px" }} />
          </FadeIn>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {FUN_FACTS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: "#fafafa", borderRadius: 12, padding: "16px 24px", border: "1px solid #eee", display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#444", fontWeight: 500, transition: "transform 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <span style={{ fontSize: 22 }}>{f.icon}</span> {f.text}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>Let's Connect</h2>
            <div style={{ width: 48, height: 4, background: "#6366f1", borderRadius: 4, margin: "0 auto 24px" }} />
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 12 }}>
              I'm actively looking for full-time Data Analyst, BI Engineer, and Analytics Engineer roles starting January 2026.
            </p>
            <p style={{ fontSize: 15, color: "#888", marginBottom: 36 }}>(857) 701-2312</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { label: "Email", href: "mailto:mallikagaikwad12@gmail.com", icon: "✉" },
                { label: "LinkedIn", href: "https://linkedin.com/in/mallika-gaikwad/", icon: "in" },
                { label: "GitHub", href: "https://github.com/MallikaGaikwad", icon: "⌨" },
                { label: "Tableau", href: "https://public.tableau.com/app/profile/mallika.gaikwad/vizzes", icon: "📊" },
              ].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, color: "#333", textDecoration: "none", fontWeight: 600, fontSize: 14, transition: "border-color 0.2s, transform 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e5e5"; e.currentTarget.style.transform = "translateY(0)"; }}
                ><span style={{ fontSize: 16 }}>{l.icon}</span> {l.label}</a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid #e8e8e8", background: "#fff" }}>
        <p style={{ fontSize: 13, color: "#aaa" }}>© 2025 Mallika Satish Gaikwad. Built with passion for data.</p>
      </footer>
    </div>
  );
}