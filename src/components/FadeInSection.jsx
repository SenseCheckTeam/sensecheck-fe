import React, { useEffect, useRef, useState } from 'react';

const FadeInSection = ({ children, delay = '', className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In case there are multiple entries, we just need the first one
      if (entries[0].isIntersecting) {
        setVisible(true);
        // Once it's visible, we don't need to observe it anymore
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const delayClass = delay ? `delay-${delay}` : '';
  const visibilityClass = isVisible ? 'is-visible' : '';
  const combinedClassName = `fade-in-section ${visibilityClass} ${delayClass} ${className}`.trim();

  return (
    <div
      className={combinedClassName}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
