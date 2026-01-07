import "../styles/hero.css";
import gmail from "../assets/socials/gmail.png";
import github from "../assets/socials/github.png";
import linkedin from "../assets/socials/linkedin.png";

function Hero() {
  return (
    <section className="hero-wrapper" id="home">
      
      {/* 1. Added the flex container class 'hero' */}
      <div className="hero"> 

        {/* --- LEFT SIDE: TEXT --- */}
        <div className="hero-text">
          <h1>
            Hi, I’m <span>Saikiran Kotichintala</span>
          </h1>
          <h2>CSE (AI & Data Science) Student</h2>
          <p>
            I build beginner-friendly Python and Data Analytics projects
            and I am learning to become an AI Engineer.
          </p>

          <div className="hero-buttons">
            <a
              href="/Saikiran_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="primary"
            >
              View Resume
            </a>

            <a
              href="/Saikiran_Resume.pdf"
              download
              className="secondary"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* --- RIGHT SIDE: IMAGE & SOCIALS --- */}
        <div className="hero-image">
          {/* 2. Added specific class 'main-pic' to match CSS */}
          <img src="/profile.png" alt="profile" className="main-pic" />

          {/* 3. Moved Socials INSIDE hero-image so they sit below the photo */}
          <div className="hero-socials">
            <a href="mailto:saikirankotichintala@gmail.com">
              <img src={gmail} alt="Email" />
            </a>

            <a
              href="https://github.com/saikirankotichintala"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} alt="GitHub" />
            </a>

            <a
              href="https://www.linkedin.com/in/saikirankotichintala"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>
      
      </div> {/* End of .hero */}

    </section>
  );
}

export default Hero;