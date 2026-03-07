import "../styles/Hero.css";
import gmail from "../assets/socials/gmail.png";
import github from "../assets/socials/github.png";
import linkedin from "../assets/socials/linkedin.png";

function Hero() {
  const stats = [
    { value: "8+", label: "Projects built" },
    { value: "3", label: "Core domains" },
    { value: "2026", label: "Internship ready" },
  ];

  return (
    <section className="section-shell hero-wrapper" id="home">
      <div className="hero">
        <div className="hero-text">
          <p className="hero-kicker">AI AND DATA SCIENCE STUDENT</p>
          <h1>Building practical software with Python, analytics, and React.</h1>
          <p>
            I am Saikiran Kotichintala, a Computer Science undergraduate focused
            on AI and Data Science. I design clean, reliable projects that solve
            real business and data problems.
          </p>

          <div className="hero-buttons">
            <a
              href="/Saikiran_Kotichintala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
            >
              View Resume
            </a>
            <a href="#projects" className="secondary">
              Explore Projects
            </a>
          </div>

          <div className="hero-stats">
            {stats.map((item) => (
              <div className="hero-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image">
          <div className="main-pic-wrap">
            <img
              src="/profile.png"
              alt="Portrait of Saikiran Kotichintala"
              className="main-pic"
            />
          </div>

          <div className="hero-socials">
            <a
              href="mailto:saikirankotichintala@gmail.com"
              aria-label="Send email"
            >
              <img src={gmail} alt="Email" />
            </a>
            <a
              href="https://github.com/saikirankotichintala"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
            >
              <img src={github} alt="GitHub" />
            </a>
            <a
              href="https://www.linkedin.com/in/saikirankotichintala/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
