/* eslint-disable jsx-a11y/alt-text */
'use client'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss'

export default function FigureItem({ gifItemRef, imgObj, tags, figureClass }) {
  return (
    <figure ref={gifItemRef} className={`${styles.figure} ${figureClass || ''}`}>
      <div>
        <Image {...imgObj} />
      </div>
      <figcaption className={styles.tags}>
        <ul className="list-unstyled">
          {tags?.map((tag) => {
            const searchUrl = `/search/${tag.replaceAll(' ', '-')}`;

            return (
              <li key={tag} className="d-inline-block">
                <Link href={searchUrl} as={searchUrl}>
                  #{tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </figcaption>
    </figure>
  );
}
