import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />

      <Container>
        {/* About Me */}
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1
              className="project-heading"
              style={{ fontSize: "2.3em", paddingBottom: "15px" }}
            >
              Who <strong className="purple">Am I?</strong>
            </h1>

            <p
              style={{
                textAlign: "center",
                color: "#cfcfcf",
                marginBottom: "30px",
              }}
            >
              Passionate about building AI-powered solutions that solve
              real-world problems through Artificial Intelligence, Machine
              Learning, Data Science, and Full-Stack Development.
            </p>

            <Aboutcard />
          </Col>

          <Col
            md={5}
            style={{
              paddingTop: "110px",
              paddingBottom: "50px",
            }}
            className="about-img"
          >
            <img
              src={laptopImg}
              alt="About Jiten Kumar"
              className="img-fluid"
            />
          </Col>
        </Row>

        {/* Technical Skills */}
        <h1 className="project-heading">
          Technical <strong className="purple">Skills</strong>
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cfcfcf",
            marginBottom: "30px",
          }}
        >
          Technologies I use to build intelligent, scalable, and impactful
          software solutions.
        </p>

        <Techstack />

        {/* Development Tools */}
        <h1 className="project-heading">
          Development <strong className="purple">Tools</strong>
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cfcfcf",
            marginBottom: "30px",
          }}
        >
          Tools, platforms, and software that power my development workflow,
          deployment, and collaboration.
        </p>

        <Toolstack />

        {/* GitHub Activity */}
        <Github />
      </Container>
    </Container>
  );
}

export default About;