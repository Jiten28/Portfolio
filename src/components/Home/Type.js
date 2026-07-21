import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "AI Engineer",
          "Machine Learning Engineer",
          "Data Scientist",
          "Python Developer",
          "Full-Stack AI Developer",
          "Generative AI Enthusiast",
          "Open Source Contributor",
          "Software Developer",
          "Freelancer"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
