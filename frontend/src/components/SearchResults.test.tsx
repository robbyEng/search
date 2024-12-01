import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

describe('SearchResults Component', () => {
  test('should render a list of search results', () => {
    const results = [
      { title: 'Result 1', url: 'https://example.com/1' },
      { title: 'Result 2', url: 'https://example.com/2' },
      { title: 'Result 3', url: 'https://example.com/3' },
    ];

    render(<SearchResults results={results} />);
    results.forEach((result) => {
      expect(screen.getByText(result.title)).toBeInTheDocument();
    });
  });

  test('should render "No results found" if there are no search results', () => {
    render(<SearchResults results={[]} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
