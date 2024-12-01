import { render, screen, fireEvent } from '@testing-library/react';
import SearchHistory from './SearchHistory';

describe('SearchHistory Component', () => {
  const mockOnHistoryClick = jest.fn();
  test('should render a list of search history items', () => {
    const history = ['First Search', 'Second Search', 'Third Search'];

    render(<SearchHistory history={history} onHistoryClick={mockOnHistoryClick} />);

    history.forEach((query) => {
      expect(screen.getByText(query)).toBeInTheDocument();
    });
  });

  test('should call onHistoryClick when a history item is clicked', () => {
    const history = ['First Search', 'Second Search', 'Third Search'];

    render(<SearchHistory history={history} onHistoryClick={mockOnHistoryClick} />);

    const firstItem = screen.getByText('First Search');
    fireEvent.click(firstItem);

    expect(mockOnHistoryClick).toHaveBeenCalledTimes(1);
    expect(mockOnHistoryClick).toHaveBeenCalledWith('First Search');
  });

  test('should not call onHistoryClick when there is no history', () => {
    render(<SearchHistory history={[]} onHistoryClick={mockOnHistoryClick} />);

    const noHistoryMessage = screen.queryByText(/Search History/);
    expect(noHistoryMessage).toBeInTheDocument();
    expect(mockOnHistoryClick).not.toHaveBeenCalled();
  });
});
