import "../styles/contact.css";

function Contact() {
  const contacts = [
    {
      label: "Email",
      value: "saikirankotichintala@gmail.com",
      href: "mailto:saikirankotichintala@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/saikirankotichintala",
      href: "https://github.com/saikirankotichintala",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/saikirankotichintala",
      href: "https://www.linkedin.com/in/saikirankotichintala/",
    },
  ];

  return (
    <section className="section-shell contact-section" id="contact">
      <div className="contact-card">
        <div className="section-heading section-heading-left">
          <p>Contact</p>
          <h2>Open to internships, projects, and meaningful collaborations.</h2>
        </div>

        <p className="contact-text">
          If you are looking for an intern who can contribute with discipline,
          curiosity, and strong fundamentals, feel free to reach out.
        </p>

        <a className="contact-primary" href="mailto:saikirankotichintala@gmail.com">
          Start a conversation
        </a>

        <div className="contact-links">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
