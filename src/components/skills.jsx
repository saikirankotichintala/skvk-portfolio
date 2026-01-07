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
    { name: "Python", icon: python },
    { name: "MySQL", icon: mysql },
    { name: "Dash", icon: dash },
    { name: "HTML", icon: html },
    { name: "CSS", icon: css },
    { name: "JavaScript", icon: js },
    { name: "Git", icon: git },
    { name: "GitHub", icon: github },
    

  ];

  return (
    <section className="skills" id="skills">

      <h2>My Skills</h2>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <img src={skill.icon} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
