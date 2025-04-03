import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import Eye from "../../Assets/Projects/Eye.png";
import Hand from "../../Assets/Projects/Hand.png";
import Face from "../../Assets/Projects/Face.png";
import ToDo from "../../Assets/Projects/ToDo.png";
import AVA from "../../Assets/Projects/AVA.png";
import ECommerce from "../../Assets/Projects/ECommerce.png";
import Stock from "../../Assets/Projects/Stock.png";
import Malware from "../../Assets/Projects/Malware.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={AVA}
              isBlog={false}
              title="AI Voice Assistant"
              description="A Python-powered voice assistant that responds to commands for tasks like answering questions, web searches, playing music, and automating applications. With 98% accuracy in speech recognition and a response time of under 2 seconds, it offers intuitive, hands-free interaction to enhance daily activities with quick and precise results."
              ghLink="https://github.com/Jiten28/Ai-Voice-Assistant"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant Disease Detection"
              description="Using machine learning, this project identifies plant diseases with 95% accuracy, reducing inspection time and errors. It automates disease detection to support healthier crops, boost productivity by 30%, and promote sustainable farming."
              ghLink="https://github.com/Jiten28/Plant-Disease-Detection"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ECommerce}
              isBlog={false}
              title="E-Commerce Website"
              description="A responsive sports e-commerce site built with HTML, CSS, and JavaScript. It allows users to browse products and make purchases, optimized for both desktop and mobile. The site achieves a loading time of under 3 seconds and has improved user engagement by 25%."
              ghLink="https://github.com/Jiten28/E-Commerce"          
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Stock}
              isBlog={false}
              title="StockMentor"
              description="An AI-powered platform that simplifies stock market analysis for beginners. StockMentor offers real-time data, LSTM-based predictions, personalized investment tips, and educational resources. With features like watchlists and alerts, it helps users make informed decisions, achieving a prediction accuracy of 85% and a user engagement increase of 30%."
              ghLink="https://github.com/Jiten28/StockMentor"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ToDo}
              isBlog={false}
              title="ToDo List Application"
              description="A task management app built with React.js, Vite, and styled with Tailwind CSS. It enables users to add, edit, delete, and track tasks efficiently. The app provides an intuitive interface, achieving a user satisfaction rate of 90% and loading times under 1 second, ensuring both functionality and a seamless user experience."
              ghLink="https://github.com/Jiten28/ToDo-List"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Face}
              isBlog={false}
              title="Facial Recognition Attendance System"
              description="A Python-based facial recognition system using computer vision libraries for efficient attendance tracking. The model achieves 95% accuracy in face detection and recognition. Integrated with Firebase, it ensures real-time data management, offering a reliable and scalable solution for institutions and organizations."
              ghLink="https://github.com/Jiten28/Face-Recognition-System"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Hand}
              isBlog={false}
              title="Hand Tracking Program"
              description="Utilizing computer vision and Mediapipe, this program tracks hand gestures with 98% accuracy using a camera. It allows users to control and interact with digital content, ideal for touchless applications in gaming, education, and user interfaces, improving user experience by 30% in interaction speed."
              ghLink="https://github.com/Jiten28/Hand-Tracking"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Eye}
              isBlog={false}
              title="Eye Tracking with Face Distance Finder"
              description="A Python program using OpenCV and cvzone to track faces in live video streams and measure the distance to the camera. With 95% accuracy in face detection and a measurement precision of ±2 cm, it enables real-time tracking and distance calculation, ideal for applications in user interaction and eye monitoring."
              ghLink="https://github.com/Jiten28/Eye-Tracking"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Malware}
              isBlog={false}
              title="Malware Detection using Deep Learning"
              description="A deep learning-based malware detection system that analyzes file behavior and characteristics to identify malicious software. It achieves a detection accuracy of 98% using a convolutional neural network (CNN) model, significantly reducing false positives and enhancing cybersecurity measures."
              ghLink="https://github.com/Jiten28/Malware-Detection-using-Deep-Learning"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
