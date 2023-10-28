'use client'
import { Fragment, useEffect, useState } from 'react';
import Loading from '../common/loading';
import Carousel from '../common/carousel';
import FigureItem from '../FigureItem';
import styles from './page.module.scss';
import SearchService from '../../api/search';

const maxWidth = 158;
const maxHeight = 173;

export default function SearchText({ imgType = 'sticker' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getDims = (dims) => {
    let width = maxWidth;
    let height = width * dims[1]/dims[0];

    if (height > maxHeight) {
      height = maxHeight;
      width = height * dims[0]/dims[1];
    }

    return {
      height,
      width
    };
  }

  const items = data.map((search) => {
    const gifObj = search.media_formats?.tinygif_transparent || search.media_formats?.tinygif
    const { height, width } = getDims(gifObj?.dims);
    const imgObj = {
      height,
      width,
      src: gifObj?.url,
      alt: search.content_description
    }

    return (
      <FigureItem imgObj={imgObj} key={imgObj.src} figureClass={`${styles.figure} ${imgType === 'memes' ? styles.Meme : ''}`} tags={search.tags} />
    );
  });

  useEffect(() => {
    const getResults = async () => {
      try {
        setIsLoading(true);
        const searchService = new SearchService(imgType);
        const results = await searchService.getResults();
        setData(results);
        setIsLoading(false);
      } catch(error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    getResults(setIsLoading, setData);
  }, []);

  return (
    <Fragment>
      {isLoading ? <Loading /> : <Carousel isItems={true}>{items}</Carousel>}
    </Fragment>
  );
}
