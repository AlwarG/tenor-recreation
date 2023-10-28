'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import AutoCompleteService from '../../../api/autocomplete';
import { usePathname } from 'next/navigation';
const autoCompleteService = new AutoCompleteService();

export default function AutoComplete({ value = '', handleChange, onOptionSelect }) {
 
  const pathname = usePathname();
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const getSuggestions = async (query) => {
    try {
      const options = await autoCompleteService.getSuggestions(query)
      setOptions(options);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    function handleClickOutside({ target }) {
      setShowSuggestion(inputRef?.current?.contains?.(target) || suggestionsRef?.current?.contains?.(target));
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      setShowSuggestion(false)
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestions(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [value]);

  useEffect(() => {
    if (pathname === '/') {
      handleChange('');
    }
    setShowSuggestion(false);
  }, [pathname]);

  const handleInputChange = ({ target: { value } = {} } = {}) => {
    setShowSuggestion(true);
    handleChange(value);
  }

  const handleFocus = () => {
    setShowSuggestion(true);
  }

  const handleSuggestionClick = (option) => {
    setShowSuggestion(false);
    onOptionSelect(option)
  }

  return (
    <div>
      <input
        ref={inputRef}
        value={value}
        className={`${styles.searchBarInput} w-100`}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder="Search for GIFs and stickers"
      />
      <button className={`btn position-absolute py-2 pr-2 ${styles.searchBtn}`}>
        <Image src="/search.svg" width="80" height="19" alt="Search" />
      </button>
      {showSuggestion ?
        <ul ref={suggestionsRef} className={`${styles.suggestions} list-unstyled`}>
          {options?.map((option) => (
            <li key={option} role="button" onClick={() => handleSuggestionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
        :
        ''
      }
    </div>
  )
}