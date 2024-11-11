// import React, { useEffect, useRef, useState } from 'react';
// import './LogoScroller.css';

// function LogoScroller() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const logoScrollerRef = useRef(null);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % 6); // Adjust the number 6 to match the number of logos
//     }, 5000); // Adjust the interval time as needed

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="logo-scroller" ref={logoScrollerRef}>
//       {Array.from({ length: 6 }).map((_, index) => (
//         <img
//           key={index}
//           src={`logo${index + 1}.png`}
//           alt={`Logo ${index + 1}`}
//           style={{
//             transform: `translateX(${currentIndex === index ? 0 : 100}%)`,
//             transition: 'transform 1s ease-in-out',
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// export default LogoScroller;