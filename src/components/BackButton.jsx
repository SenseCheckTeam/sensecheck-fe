import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import backIcon from '../assets/icons/back.png';

function BackButton() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing the button for 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button
      className={`back-button-circle ${isVisible ? 'visible' : ''}`}
      onClick={goBack}
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      <img src={backIcon} alt="Back" className="back-icon" />
    </button>
  );
}

export default BackButton;
