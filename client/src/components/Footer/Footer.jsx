import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://github.com/steph-d989" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="github-link">
          <FaGithub size={24} />
          <p className="footer-text">Stephani Damiani Kaemena</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
