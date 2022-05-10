import React from 'react';
import doghouse from "../../images/doghouse.png";

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        <p>&copy;2022 by Bad Dog Woodshop || (248)534-9103 || www.BadDogWoodshop.com</p>
        <img className="teeny" src={doghouse} alt="doghouse"></img>
        

        </div>
      
      </footer>
  );
};

export default Footer;
