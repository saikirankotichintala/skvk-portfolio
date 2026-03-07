import "../styles/skills.css";

import python from "../assets/skills/python.png";
import dash from "../assets/skills/dash.png";
import mysql from "../assets/skills/mysql.png";
import html from "../assets/skills/html.png";
import css from "../assets/skills/css.png";
import js from "../assets/skills/javascript.png";
import git from "../assets/skills/git.png";
import github from "../assets/skills/github.png";

function Skills() {
  const skills = [
    { name: "Python", icon: python, context: "Automation and data workflows" },
    { name: "MySQL", icon: mysql, context: "Database design and querying" },
    { name: "Dash", icon: dash, context: "Interactive analytics dashboards" },
    { name: "HTML", icon: html, context: "Semantic page structure" },
    { name: "CSS", icon: css, context: "Responsive visual systems" },
    { name: "JavaScript", icon: js, context: "Client-side interaction logic" },
    { name: "Git", icon: git, context: "Version control fundamentals" },
    { name: "GitHub", icon: github, context: "Collaboration and deployment" },
  ];

  return (
    <section className="section-shell skills" id="skills">
      <div className="section-heading">
        <p>Skills</p>
        <h2>Technologies I use to build reliable, user-friendly applications.</h2>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <article
            className="skill-card"
            style={{ "--card-delay": `${index * 75}ms` }}
            key={skill.name}
          >
            <img src={skill.icon} alt={skill.name} />
            <h3>{skill.name}</h3>
            <p>{skill.context}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
