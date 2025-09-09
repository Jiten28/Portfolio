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
import PERFUME_SHOP from "../../Assets/Projects/PerfumeShop.png";
import BIZLINK from "../../Assets/Projects/BizLink.png";
import RUBIKS_CUBE from "../../Assets/Projects/RCS.png";
import LOGIN_REGISTER from "../../Assets/Projects/Login.png";

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
              imgPath={PERFUME_SHOP}
              isBlog={false}
              title="Perfume Shop - Full Stack Web App"
              description="A full-stack perfume shop application built with React, TailwindCSS, Vite, Node.js, and MongoDB. It features a responsive UI, product pages with multiple images, reviews stored in MongoDB, a trending perfumes section, and smooth animations for an engaging shopping experience."
              ghLink="https://github.com/Jiten28/Perfume-Shop-MERN-Stack"
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
              imgPath={BIZLINK}
              isBlog={false}
              title="BizLink - Buyer & Seller Matching Platform"
              description="A React + Vite web platform that connects business buyers and sellers. Features role-based onboarding, buyer profile browsing, AI-powered document analysis, compatibility scoring, and dark/light theme support. Deployed on Vercel with a sleek and scalable design."
              ghLink="https://github.com/Jiten28/BizLink"
              demoLink="https://biz-link-alpha.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ToDo}
              isBlog={false}
              title="ToDo List Application"
              description="A modern task management application built with React.js, Vite, and Tailwind CSS. It allows users to add, edit, delete, and track tasks effortlessly while maintaining a clean, intuitive interface. Optimized for performance, the app achieves a 90% user satisfaction rate and loads in under 1 second, ensuring both robust functionality and a seamless experience across devices."
              ghLink="https://github.com/Jiten28/ToDo-List"
              demoLink="https://to-do-list-six-ecru-67.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={RUBIKS_CUBE}
              isBlog={false}
              title="Rubik’s Cube Solver"
              description="An interactive 3x3 Rubik’s Cube solver built with Python using Kociemba’s Two-Phase Algorithm. Includes a Tkinter-based GUI, real-time input validation, simulation of 18 cube moves, error handling, and accurate cube modeling for an engaging solving experience."
              ghLink="https://github.com/Jiten28/Rubiks-Cube-Solver"
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
              imgPath={LOGIN_REGISTER} 
              isBlog={false}
              title="Login/Register Page"
              description="A responsive login and registration page built with ReactJS and TailwindCSS. It allows users to log in with credentials or register a new account. Featuring clean design, form validation, and mobile-first responsiveness, it provides a modern and user-friendly authentication interface."
              ghLink="https://github.com/Jiten28/login-register"
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



        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
