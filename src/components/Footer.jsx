const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <h3>Saikiran Kotichintala</h3>
        <p>AI and Data Science Student</p>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a
            href="/Saikiran_Kotichintala_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        <p className="footer-copy">(c) {year} Saikiran Kotichintala</p>
      </div>
    </footer>
  );
};

export default Footer;
