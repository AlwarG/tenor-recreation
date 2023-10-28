'use client'
import TrendingSearches from './TrendingSearches';
import Gifs from './Gifs';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <TrendingSearches />
      <section>
        <h2 className="img-section-heading">Featured GIFs</h2>
        <Gifs />
      </section>
    </Fragment>
  )
}
