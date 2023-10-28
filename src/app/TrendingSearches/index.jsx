'use client';
import styles from './page.module.scss';
import Carousel from '../common/carousel';
import APIService from "../../api/apiService";
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import Loading from '../common/loading';
const apiService = new APIService();

const itemsComp = (search) => {
  const url = `/search/${search.content_description?.replaceAll(' ', '-')}`;

  return (
    <div className={styles.TrendsTag} key={search.id}>
      <Link href={url} as={url} className={styles.link}>
        <div className={styles.img} style={{ backgroundImage: `url(${search.media?.[0]?.gif.url})`}} />
        <div className={styles.info}>
          {search.content_description}
        </div>
      </Link>
    </div>
  );
}

export default function TrendingSearches() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTrendingSearches = async () => {
      try {
        setIsLoading(true);
        const axiosInstance = await apiService.axiosInstance();
        const path= 'trending';
        const response = await axiosInstance.get(path, {
          params: {
            key: 'LIVDSRZULELA'
          },
          baseURL: 'https://g.tenor.com/v1/'
        });
        let { data: { results } = {} } = response;
        setData(results);
      } catch(error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    getTrendingSearches();
  }, []);

  const items = data.map(itemsComp);

  return (
    <section>
      <h2 className="img-section-heading">Trending Tenor Searches</h2>
        <Fragment>
          {isLoading ? <Loading /> : <Carousel>{items}</Carousel>}
        </Fragment>
    </section>
  );
}