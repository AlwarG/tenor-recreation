'use client'
import MinmizedImages from '../../MinimizedImages';
import Gifs from '../../Gifs';
import { Fragment } from 'react';

export default function SearchText({ params }) {
  const { searchText } = params;
  const searchTerm = searchText.replaceAll('-', ' ');

  return (
    <Fragment>
      <h1 className="img-section-heading mb-4">{searchTerm}</h1>
      <section className="mb-4">
        <h2 className="img-section-heading">Memes</h2>
        <MinmizedImages searchText={searchText} imgType='memes' />
      </section>
      <section className="mb-4">
        <h2 className="img-section-heading ">Stickers</h2>
        <MinmizedImages searchText={searchText} />
      </section>
      <section className="mb-4">
        <h2 className="img-section-heading">GIFs</h2>
        <Gifs gifParams={{ searchfilter: 'static,-sticker', q: searchText }} urlPath="search" />
      </section>
    </Fragment>
  );
}
