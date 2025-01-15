import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Everyone, I am <span className="purple">Jiten Kumar </span>
            from <span className="purple"> Ranchi, India.</span>
            <br />
            I am currently an undergraduate student pursuing a B.Tech 
            degree in Computer Science and Engineering at MRITS, Telangana.
            <br />
            <br />
            Beyond academics, I enjoy engaging in activities that fuel my creativity and enthusiasm:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Drawing and Sketching
            </li>
            <li className="about-activity">
              <ImPointRight /> Photography
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Innovation begins with curiosity and leads to endless possibilities."{" "}
          </p>
          <footer className="blockquote-footer">Jiten</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
