import "../styles/about.css";

function About() {
  return (
    <section className="section-shell about-section" id="about">
      <div className="section-heading">
        <p>About</p>
        <h2>Turning data-driven ideas into practical software solutions.</h2>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <p>
            I am <strong>Saikiran Kotichintala</strong>, a Computer Science and
            Engineering student specializing in <strong>AI and Data Science</strong>.
            My work centers on Python development, analytics, and building
            clean user-facing interfaces with React.
          </p>
          <p>
            Through projects like a grocery management platform, a sales
            dashboard, and a tokenizer implementation, I have developed strong
            fundamentals in problem solving, data modeling, and iterative
            product development.
          </p>
          <p>
            I am currently seeking internship opportunities where I can
            contribute to real products, learn from experienced teams, and grow
            into a dependable AI engineer.
          </p>
        </article>

        <aside className="about-focus">
          <h3>Current Focus</h3>
          <ul>
            <li>Data analysis and visualization</li>
            <li>Machine learning fundamentals</li>
            <li>React-based web development</li>
            <li>Python problem solving</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default About;
