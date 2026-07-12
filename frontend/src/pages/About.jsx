import React, { useState } from "react";

const technologies = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT",
  "REST API",
  "CSS3",
];

const About = () => {
  const [dpError, setDpError] = useState(false);
  const [hovered, setHovered] = useState("");

  const buttonStyle = {
    padding: "14px 26px",
    background: "#fff",
    border: "1px solid #dbeafe",
    borderRadius: "14px",
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all .3s ease",
    boxShadow: "0 8px 20px rgba(15,23,42,.06)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "70px 20px",
        background: "linear-gradient(180deg,#f8fafc,#eef6ff)",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "auto",
          background: "#fff",
          borderRadius: "30px",
          padding: "55px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 50px rgba(15,23,42,.08)",
          textAlign: "center",
        }}
      >
        {/* Profile */}

        <div
          style={{
            width: "170px",
            height: "170px",
            margin: "0 auto 25px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #dbeafe",
            background: "linear-gradient(135deg,#2563eb,#06b6d4)",
            boxShadow: "0 15px 40px rgba(37,99,235,.20)",
          }}
        >
          {dpError ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontSize: "65px",
                fontWeight: "800",
              }}
            >
              FN
            </div>
          ) : (
            <img
              src="/dp.jpg"
              alt="Faiz Nagpurwala"
              onError={() => setDpError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        {/* Heading */}

        <h1
          style={{
            fontSize: "3rem",
            color: "#0f172a",
            marginBottom: "10px",
          }}
        >
          About <span style={{ color: "#2563eb" }}>FizCart</span>
        </h1>

        <h3
          style={{
            color: "#06b6d4",
            marginBottom: "25px",
          }}
        >
          Developed by Faiz Nagpurwala
        </h3>

        {/* Description */}

        <p
          style={{
            color: "#64748b",
            lineHeight: "1.9",
            fontSize: "17px",
            maxWidth: "720px",
            margin: "0 auto 25px",
          }}
        >
          FizCart is a modern MERN Stack e-commerce platform built to provide
          a fast, secure, and seamless online shopping experience. Browse
          products, search instantly, manage your cart, checkout securely,
          and track your orders with ease.
        </p>

        <p
          style={{
            color: "#64748b",
            lineHeight: "1.9",
            maxWidth: "700px",
            margin: "0 auto 45px",
          }}
        >
          This project was developed to strengthen my Full Stack Development
          skills using React.js, Node.js, Express.js, and MongoDB while
          building a professional e-commerce platform with modern UI and
          secure authentication.
        </p>

        {/* Technologies */}

        <h2
          style={{
            color: "#0f172a",
            marginBottom: "20px",
          }}
        >
          Technologies Used
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "45px",
          }}
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              style={{
                padding: "10px 20px",
                borderRadius: "30px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#2563eb",
                fontWeight: "600",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Connect */}

        <h2
          style={{
            color: "#0f172a",
            marginBottom: "20px",
          }}
        >
          Connect With Me
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          <a
            href="https://github.com/Faiz1231234"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered("github")}
            onMouseLeave={() => setHovered("")}
            style={{
              ...buttonStyle,
              background: hovered === "github" ? "#2563eb" : "#fff",
              color: hovered === "github" ? "#fff" : "#2563eb",
              transform:
                hovered === "github"
                  ? "translateY(-3px)"
                  : "translateY(0)",
              boxShadow:
                hovered === "github"
                  ? "0 15px 30px rgba(37,99,235,.25)"
                  : "0 8px 20px rgba(15,23,42,.06)",
            }}
          >
            💻 GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/faiz-nagpurwala-83aa33258/"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setHovered("linkedin")}
            onMouseLeave={() => setHovered("")}
            style={{
              ...buttonStyle,
              background: hovered === "linkedin" ? "#0A66C2" : "#fff",
              color: hovered === "linkedin" ? "#fff" : "#0A66C2",
              border:
                hovered === "linkedin"
                  ? "1px solid #0A66C2"
                  : "1px solid #dbeafe",
              transform:
                hovered === "linkedin"
                  ? "translateY(-3px)"
                  : "translateY(0)",
              boxShadow:
                hovered === "linkedin"
                  ? "0 15px 30px rgba(10,102,194,.25)"
                  : "0 8px 20px rgba(15,23,42,.06)",
            }}
          >
            💼 LinkedIn
          </a>

          <a
            href="mailto:faizriyaz2004@email.com"
            onMouseEnter={() => setHovered("email")}
            onMouseLeave={() => setHovered("")}
            style={{
              ...buttonStyle,
              background: hovered === "email" ? "#ef4444" : "#fff",
              color: hovered === "email" ? "#fff" : "#ef4444",
              border:
                hovered === "email"
                  ? "1px solid #ef4444"
                  : "1px solid #dbeafe",
              transform:
                hovered === "email"
                  ? "translateY(-3px)"
                  : "translateY(0)",
              boxShadow:
                hovered === "email"
                  ? "0 15px 30px rgba(239,68,68,.25)"
                  : "0 8px 20px rgba(15,23,42,.06)",
            }}
          >
            📧 Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;