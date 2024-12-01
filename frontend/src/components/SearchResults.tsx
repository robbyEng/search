import { FC } from "react";

interface Result {
  title: string;
  url: string;
}

interface SearchResultsProps {
  results: Result[];
}

const SearchResults: FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="results-container">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div className="result-item" key={index}>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
