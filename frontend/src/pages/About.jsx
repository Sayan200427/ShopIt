import React from "react";

const About = () => {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px",
    background: "#18181b",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
  };

  const socialBtnStyle = {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    background: "#27272a",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt="Sayan Biswas"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #3b82f6",
          marginBottom: "20px",
          boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
        }}
      />

      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
          color: "#fff",
        }}
      >
        About Me
      </h2>

      <h3
        style={{
          fontSize: "1.5rem",
          color: "#3b82f6",
          marginBottom: "15px",
        }}
      >
        Sayan Biswas
      </h3>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.2rem",
          lineHeight: "1.8",
          maxWidth: "700px",
          margin: "0 auto 30px auto",
        }}
      >
        Hi! I'm <strong>Sayan Biswas</strong>, a passionate Full Stack Web
        Developer and Computer Science student. I enjoy building modern,
        responsive, and scalable web applications using the MERN Stack. I love
        solving programming problems, learning new technologies, and creating
        projects that make a real impact.
        <br />
        <br />
        I'm continuously improving my skills in React, Node.js, Express,
        MongoDB, C++, and Data Structures & Algorithms while exploring cloud
        technologies and software development best practices.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          💻 GitHub
        </a>

        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(59,130,246,0.2)",
            borderColor: "#3b82f6",
            color: "#3b82f6",
          }}
        >
          💼 LinkedIn
        </a>

        <a
          href="https://instagram.com/your-instagram"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(236,72,153,0.2)",
            borderColor: "#ec4899",
            color: "#ec4899",
          }}
        >
          📸 Instagram
        </a>

        <a
          href="https://x.com/your-x"
          target="_blank"
          rel="noreferrer"
          style={socialBtnStyle}
        >
          ✖️ X (Twitter)
        </a>

        <a
          href="mailto:your-email@gmail.com"
          style={{
            ...socialBtnStyle,
            background: "rgba(34,197,94,0.2)",
            borderColor: "#22c55e",
            color: "#22c55e",
          }}
        >
          📧 Email
        </a>

        <a
          href="https://your-portfolio.com"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(249,115,22,0.2)",
            borderColor: "#f97316",
            color: "#f97316",
          }}
        >
          🌐 Portfolio
        </a>
      </div>
    </div>
  );
};

export default About;