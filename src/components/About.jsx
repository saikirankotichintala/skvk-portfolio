import "../styles/about.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-card">
        <h2>About Me</h2>

        <p>
          I am <strong>Saikiran Kotichintala</strong>, a Computer Science and
          Engineering student specializing in{" "}
          <strong>AI & Data Science</strong>. I enjoy building practical
          applications using <strong>Python</strong>,{" "}
          <strong>Data Analysis</strong>, and{" "}
          <strong>Machine Learning</strong>.
        </p>

        <p>
          I have worked on projects such as a{" "}
          <strong>Grocery Store Management System</strong>, a{" "}
          <strong>Sales Analytics Dashboard</strong>, and a{" "}
          <strong>Byte Pair Encoding (BPE) Tokenizer</strong>, which helped me
          strengthen my problem-solving and data-handling skills.
        </p>

        {/* Current Focus Box */}
        <div className="about-focus">
          <h3>Current Focus</h3>
          <ul>
            <li>📊 Data Analysis & Visualization</li>
            <li>🤖 Machine Learning Fundamentals</li>
            <li>🌐 Web Development (React)</li>
            <li>🧠 Problem Solving with Python</li>
          </ul>
        </div>

        <p>
          I am actively seeking <strong>internship opportunities</strong> where
          I can apply my skills, gain real-world experience, and grow into a
          skilled <strong>AI Engineer</strong>.
        </p>
      </div>
    </section>
  );
}

export default About;
