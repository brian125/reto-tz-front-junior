import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="text-footer">
        <p>¡Todos los días son una oportunidad para aprender algo nuevo!</p>
        <p>
          Brayan Silva &copy; {(new Date().getFullYear())}
        </p>
      </div>
    </div>
  );
};

export default Footer;
