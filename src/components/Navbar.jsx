import { useState } from "react";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-nav-wrap">
      <nav className="navbar">
        <a className="navbar-logo" href="#home" onClick={closeMenu}>
          Saikiran
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a
            href="/Saikiran_Kotichintala_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            onClick={closeMenu}
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
