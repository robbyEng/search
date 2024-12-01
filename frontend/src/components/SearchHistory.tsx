import { FC } from "react";

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (query: string) => void;
}

const SearchHistory: FC<SearchHistoryProps> = ({ history, onHistoryClick }) => {
  return (
    <div className="sidebar">
      <h3>Search History</h3>
      <ul>
        {history.map((query, index) => (
          <li key={index}>
            <button onClick={() => onHistoryClick(query)}>{query}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;