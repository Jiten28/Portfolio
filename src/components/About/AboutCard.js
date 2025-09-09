import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Everyone, I am <b className="purple">Jiten Kumar </b>
            from <b className="purple"> Ranchi, India.</b>
            <br />
            I have completed my <b className="purple">B.Tech degree </b> in
            <b className="purple"> Computer Science and Engineering</b> at <b className="purple">Jawaharlal Nehru Technological University Hyderabad, Telangana.</b>,
            <br />
            <br />
            Beyond academics, I actively pursue interests that enhance creativity and perspective, including
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Gaming
            </li>
            <li className="about-activity">
              <ImPointRight /> Drawing
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
