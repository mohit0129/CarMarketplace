import React, { useEffect, useRef, useState } from 'react';
import './LogoScroller.css';

function LogoScroller() {

    const scrollerRef = useRef(null);

    const importAll = (requireContext) => requireContext.keys().map(requireContext);
    const images = importAll(require.context('./logos', false, /\.(png|jpe?g|svg)$/));
  
    useEffect(() => {
      const addAnimation = () => {
        if (scrollerRef.current) {
          scrollerRef.current.dataset.animated = true;
  
          const scrollerInner = scrollerRef.current.querySelector('.scroller__inner');
          const scrollerContent = Array.from(scrollerInner.children);
  
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      };
  
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        addAnimation();
      }
    }, []);

  return (
    <section className="logo_scroller dark:bg-gray-900">
    <div className="scroller" ref={scrollerRef}>
      <ul className="tag-list scroller__inner">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Logo ${index + 1}`} className='img'/>
        ))}
      </ul>
    </div>
  </section>
  );
}

export default LogoScroller;