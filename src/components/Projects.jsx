import "../styles/project.css";

function Projects() {
  const projects = [
    {
      title: "Grocery Shop Management System",
      summary:
        "A Python and MySQL solution for handling product, customer, and worker records through a structured console workflow.",
      tech: ["Python", "MySQL"],
      points: [
        "Implemented CRUD operations for operational records.",
        "Designed a normalized relational schema and query patterns.",
        "Integrated Python logic with persistent database storage.",
      ],
      link: "https://github.com/saikirankotichintala/GROCERY_STORE_MANAGEMENT",
    },
    {
      title: "Grocery Sales Analytics Dashboard",
      summary:
        "An interactive analytics dashboard that helps track trends, category performance, and product-level behavior.",
      tech: ["Python", "Dash"],
      points: [
        "Built dynamic filters and visual components for decision support.",
        "Cleaned and transformed source data for reliable reporting.",
        "Communicated insights through focused visual storytelling.",
      ],
      link: "https://github.com/saikirankotichintala/grocery-store-sales-analysis",
    },
    {
      title: "BPE Tokenizer",
      summary:
        "A from-scratch Byte Pair Encoding tokenizer project to understand text preprocessing and NLP tokenization mechanics.",
      tech: ["Python", "NLP"],
      points: [
        "Implemented merge operations and vocabulary building logic.",
        "Created encoding and decoding pipelines for sample corpora.",
        "Improved understanding of foundational language model tooling.",
      ],
      link: "https://github.com/saikirankotichintala/bpe_tokenizer",
    },
  ];

  return (
    <section className="section-shell projects" id="projects">
      <div className="section-heading">
        <p>Projects</p>
        <h2>Selected work that demonstrates execution from idea to delivery.</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            className="project-card"
            style={{ "--project-delay": `${index * 90}ms` }}
            key={project.title}
          >
            <h3>{project.title}</h3>
            <p className="project-summary">{project.summary}</p>

            <div className="project-tech">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <ul>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className="project-links">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Repository
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
