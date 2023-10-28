'use client';
import { useRef, useState, useEffect } from 'react';
import FigureItem from '../../FigureItem';

export default function FeaturedGifItem({ searchObj = {} }) {
  const gifItemRef = useRef(null);
  const gif = searchObj?.media_formats?.tinygif || {};
  const [dims, setDims] = useState(gif.dims);
  const imgObj = {
    src: gif.url,
    width: dims?.[0],
    height: dims?.[1],
    alt: searchObj.content_description
  };

  useEffect(() => {
    function handleDimensionChanges(width) {
      if (width > dims?.[0]) {
        const dimensions = [...dims];
        const additionalWidth = width - dimensions[0] - 21;

        if (additionalWidth > 0) {
          dimensions[0] = dimensions[0] + additionalWidth;
          dimensions[1] = (dimensions[0] * dims[1])/ dims[0]
          setDims(dimensions);
        }
      }
    }
  
    if (gifItemRef?.current) {
      handleDimensionChanges(gifItemRef.current.clientWidth);
    }
  }, []);

  return (
    <FigureItem gifItemRef={gifItemRef} imgObj={imgObj} tags={searchObj.tags} />
  );
}
