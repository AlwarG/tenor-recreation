'use client'
import Image from "next/image";
import Link from 'next/link'
import styles from './page.module.scss';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from "react";
import AutoComplete from '../../common/AutoComplete';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const frameRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const searchTerm = (pathname?.split('/search/')?.[1] || '').replaceAll('-', ' ');
    setSearchTerm(searchTerm)
  }, [pathname]);

  const handleScroll = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    setIsScrolled(document.documentElement.scrollTop > 52);
    frameRef.current = requestAnimationFrame(handleScroll);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (value) => {
    setSearchTerm(value);
  }

  const onSubmit = (searchTerm) => {
    router.push(`/search/${searchTerm.replaceAll(' ', '-')}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchTerm);
  }

  return (
    <header>
      <nav className={styles.NavBar}>
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image src="/tenor.svg" width="80" height="22" alt="Tenor" />
          </Link>
        </div>
      </nav>
      <div className={`${styles.TopBarSection} ${isScrolled ? styles.fixedTop: ''}`}>
        <div className={`container ${styles.container}`}>
          <Link href="/" className={styles.brand}>
            <Image src="/tenor-white.svg" width="80" height="22" alt="Tenor" />
          </Link>
          <div className={styles.searchContainer}>
            <form className={`position-relative`} onSubmit={handleSubmit}>
              <AutoComplete value={searchTerm} handleChange={handleChange} onOptionSelect={onSubmit} />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}