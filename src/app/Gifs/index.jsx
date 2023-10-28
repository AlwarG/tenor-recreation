'use client';
import styles from './page.module.scss';
import GifItem from './GifItem';
import Loading from '../common/loading';
import { Fragment, useEffect, useState, useCallback, useMemo } from 'react';
import { generateRandomString } from '../../utils';
import ImageService from '../../api/imageService';

export default function Gifs({ gifParams, urlPath }) {
  const imageService = useMemo(() => new ImageService(), []);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const getFeaturedGifs = useCallback(async (setIsLoading) => {
    if (!isMoreLoading && !isLoading) {
      try {
        setIsLoading(true);
        urlPath && imageService.changeUrlPath(urlPath);
        let results = await imageService.getImages(gifParams);
        setData((prevData) => [...prevData, ...results]);
        setIsLoading(false);
      } catch(error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  }, [isMoreLoading, isLoading, gifParams])

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      getFeaturedGifs(setIsMoreLoading);
    }
  };

  const throttle = (func, delay) => {
    let timerFlag = null;

    return (...args) => {
      if (timerFlag === null) {
        func(...args);
        timerFlag = setTimeout(() => {
          timerFlag = null;
        }, delay);
      }
    };
  };

  const throttledScroll = throttle(handleScroll, 200);

  useEffect(() => {
    getFeaturedGifs(setIsLoading)
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [])

  return (
    <Fragment>
      {isLoading ?
        <Loading /> :
        <Fragment>
          <div className={styles.columnWrapper}>
            {data?.map((searchObj = {}) => {
              return (
                <GifItem searchObj={searchObj} key={`${searchObj.id}-${generateRandomString(5)}`} />
              );
            })}
          </div>
          <div>{isMoreLoading ? <Loading /> : ''}</div>
        </Fragment>
      }
    </Fragment>
  );
}
