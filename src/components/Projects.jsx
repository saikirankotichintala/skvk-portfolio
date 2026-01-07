import "../styles/project.css";

function Projects() {
  const projects = [
    {
      title: "Grocery Shop Management System",
      tech: ["Python", "MySQL"],
      points: [
        "Developed a console-based grocery shop management system using Python and MySQL.",
        "Implemented CRUD operations to manage customer, product, and worker records.",
        "Designed a relational database schema and integrated it with Python.",
        "Strengthened understanding of SQL queries and database connectivity."
      ],
      link: "https://github.com/saikirankotichintala/GROCERY_STORE_MANAGEMENT"
    },
    {
      title: "Grocery Sales Analytics Dashboard",
      tech: ["Python", "Dash"],
      points: [
        "Built an interactive dashboard to visualize grocery sales data.",
        "Created dynamic charts and filters to analyze sales trends and product performance.",
        "Processed and cleaned data to ensure accurate visual insights.",
        "Improved skills in data analysis and dashboard development."
      ],
      link: "https://github.com/saikirankotichintala/grocery-store-sales-analysis"
    },
    {
      title: "BPE Tokenizer",
      tech: ["Python", "NLP"],
      points: [
        "Implemented a Byte Pair Encoding (BPE) tokenizer from scratch using Python.",
        "Developed encoding and decoding logic for text preprocessing.",
        "Gained hands-on experience with basic NLP concepts and tokenization.",
        "Enhanced understanding of text processing techniques used in language models."
      ],
      link: "https://github.com/saikirankotichintala/bpe_tokenizer"
    }
  ];

  return (
    <section className="projects" id="projects">
      <h2>Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>

            {/* TECH / SKILLS TAGS */}
            <div className="project-tech">
              {project.tech.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>

            {/* BULLET POINTS */}
            <ul>
              {project.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {/* PROJECT LINK */}
            <div className="project-links">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
