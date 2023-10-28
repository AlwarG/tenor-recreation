'use client'
import styles from './page.module.scss'
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';

const Carousel = ({ children, isItems }) => {
  const carouselRef = useRef(null);
  const frameRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const canShowNext = scrollWidth - Math.abs(scrollPosition) >= Math.abs(scrollPosition);

  const handleScroll = (direction) => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (direction === 'left') {
      setScrollPosition((prevPos) => prevPos + clientWidth);
    } else if (direction === 'right') {
      setScrollPosition((prevPos) => prevPos - clientWidth);
    }
    frameRef.current = requestAnimationFrame(handleScroll);
  };

  useEffect(() => {
    if (carouselRef?.current) {
      let { clientWidth } = carouselRef.current;
  
      if (isItems) {
        clientWidth = clientWidth - 10;
      }
      setClientWidth(clientWidth);
      setScrollWidth(carouselRef.current.scrollWidth);
    }
  }, [carouselRef.current?.scrollWidth, carouselRef.current?.clientWidth, isItems]);

  useEffect(() => {
    return () => {
      frameRef.current && cancelAnimationFrame(frameRef.current)
    };
}, []);

  const PrevBtn = () => {
    if (isItems || scrollPosition) {
      return (
        <button className={`btn p-0 ${styles.controlBtn} ${styles.prevBtn}`} disabled={!scrollPosition} onClick={() => handleScroll('left')}>
          <Image src="/left.svg" width="40" height="22" alt="Left" />
        </button>
      );
    }
    return;
  }

  const nextBtn = () => {
    if (isItems || canShowNext) {
      return (
        <button className={`btn p-0 ${styles.controlBtn} ${styles.nextBtn} ${styles.rotate180}`} disabled={!canShowNext} onClick={() => handleScroll('right')}>
          <Image src="/left.svg" width="40" height="22" alt="Left" />
        </button>
      );
    }
    return;
  }

  return (
    <div className={`${styles.carousel} ${isItems ? styles.items: ''}`}>
      <div className={styles.carouselContainer}>
        <div
          ref={carouselRef}
          className={styles.carouselContent}
          style={{ left: `${scrollPosition}px` }}
        >
          {children}
        </div>
      </div>
      {isItems ? <div className={styles.buttons}>{PrevBtn()}{nextBtn()}</div> : <Fragment>{nextBtn()}{PrevBtn()}</Fragment>}
    </div>
  );
};

export default Carousel;
