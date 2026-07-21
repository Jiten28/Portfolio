import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiHtml5,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";

import {
  SiMysql,
  SiFirebase,
  SiDocker,
  SiCss3,
  SiPostgresql,
  SiTensorflow,
  SiFastapi,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiTailwindcss,
  SiSqlite,
  SiScikitlearn,
  SiPowerbi,
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* Programming Languages */}
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <DiJava />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
      </Col>

      {/* Frontend */}
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <DiHtml5 />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiCss3 />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiTailwindcss />
      </Col>

      {/* Backend */}
      <Col xs={4} md={2} className="tech-icons">
        <DiNodejs />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiFlask />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi />
      </Col>

      {/* AI / Machine Learning */}
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiScikitlearn />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiPandas />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiNumpy />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiOpencv />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiPowerbi />
      </Col>

      {/* Databases */}
      <Col xs={4} md={2} className="tech-icons">
        <DiMongodb />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiMysql />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiPostgresql />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiSqlite />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiFirebase />
      </Col>

      {/* DevOps & Version Control */}
      <Col xs={4} md={2} className="tech-icons">
        <DiGit />
      </Col>

      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
    </Row>
  );
}

export default Techstack;