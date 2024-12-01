import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn().mockResolvedValueOnce(undefined);

  test('should render the input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search.../i);
    const buttonElement = screen.getByText(/search/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('should not call onSearch if the input is empty', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/search.../i);
    const buttonElement = screen.getByText(/search/i);

    userEvent.clear(inputElement);
    userEvent.click(buttonElement);
    await waitFor(() => {
      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });
});
