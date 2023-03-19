import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="AboutCard">
      <div className="mainDiv">
        <div className="leftSide">
          <h2>about us:</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus
            vel justo fermentum bibendum non eu ipsum. Cras porta malesuada
            eros, eget blandit turpis suscipit at. Vestibulum sed massa in magna
            sodales porta. Vivamus elit urna, dignissim a vestibulum. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel
            justo fermentum bibendum no eu ipsum. Cras porta malesuada eros.
          </p>
          <div>
            <img src="/imges/appStoreButton/apple.svg" alt="apple" />
            <img src="/imges/appStoreButton/google.svg" alt="google" />
          </div>
        </div>
        <img src="/imges/about-logo.svg" alt="logo" />
      </div>
    </div>
  );
};

export default About;
