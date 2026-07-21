import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I'm <b className="purple">Jiten Kumar</b> from{" "}
            <b className="purple">Hyderabad, India</b>.
            <br />
            <br />
            I am a <b className="purple">Computer Science graduate</b> from{" "}
            <b className="purple">
              Jawaharlal Nehru Technological University Hyderabad
            </b>{" "}
            with a strong passion for{" "}
            <b className="purple">
              Artificial Intelligence, Machine Learning, and Data Science
            </b>
            .
            <br />
            <br />
            I enjoy building intelligent applications that solve real-world
            problems by combining AI with modern software development. My work
            spans healthcare, smart agriculture, travel planning, retail
            analytics, and Generative AI solutions, with a focus on creating
            impactful, scalable, and user-centric applications.
            <br />
            <br />
            Currently, I am exploring{" "}
            <b className="purple">
              Generative AI, Large Language Models (LLMs), and Agentic AI
            </b>{" "}
            while continuously expanding my knowledge through hands-on projects,
            hackathons, and open-source contributions.
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Building AI Projects
            </li>

            <li className="about-activity">
              <ImPointRight /> Participating in Hackathons
            </li>

            <li className="about-activity">
              <ImPointRight /> Contributing to Open Source
            </li>

            <li className="about-activity">
              <ImPointRight /> Gaming
            </li>

            <li className="about-activity">
              <ImPointRight /> Photography
            </li>

            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Turning ideas into intelligent solutions, one project at a time."
          </p>

          <footer className="blockquote-footer">Jiten Kumar</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;