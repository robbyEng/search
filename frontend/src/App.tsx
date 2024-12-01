import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import './styles.css';

const baseURL = 'http://localhost:3000/api';

const App: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string) => {
    try {
      const response = await axios.get(`${baseURL}/search`, {
        params: { q: searchQuery },
      });
      setResults(response.data);

      if (!history.includes(searchQuery)) {
        const newHistory = [...history, searchQuery];
        setHistory(newHistory);
        await axios.post(`${baseURL}/history`, { query: searchQuery });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${baseURL}/history`);
        setHistory(response?.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Search App</h1>
      </header>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} 
      />
      <SearchResults results={results} />
      <SearchHistory history={history} onHistoryClick={handleSearch} />
    </div>
  );
};

export default App;
