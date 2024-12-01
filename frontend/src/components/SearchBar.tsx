import { FC } from 'react';

interface SearchBarProps {
  query?: string;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  onSearch?: (searchQuery: string) => Promise<void>;
}

const SearchBar: FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery?.(e.target.value);
  };

  const handleSearchClick = async () => {
    if (query?.trim()) {
      await onSearch?.(query);
    }
  };

  return (
    <div className='search-input'>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
