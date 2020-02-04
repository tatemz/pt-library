import {
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
} from '../../containers/HomePage/constants';
import {
  checkBook,
  createBook,
  createLibraryService,
  deleteBook,
  ERR_BOOK_ALREADY_CHECKED_IN,
  ERR_BOOK_ALREADY_CHECKED_OUT,
  ERR_ISBN_REQUIRED,
  getBook,
  getBooks,
  getUri,
  updateBook,
} from '../libraryService';

describe('libraryService repository', () => {
  describe('getUri', () => {
    it('should return the uri of a full url', () => {
      const uri = '/path?foo=bar#fizzbuzz';
      expect(getUri(`https://foobar.com${uri}`)).toEqual(uri);
    });

    it('should assume non-full urls are already uris', () => {
      const uri = '/path?foo=bar#fizzbuzz';
      expect(getUri(uri)).toEqual(uri);
    });
  });

  describe('createLibraryService', () => {
    const host = 'foobar.com';

    it('should create and configure the service', () => {
      expect(() => createLibraryService(host)).not.toThrow();
    });

    it('should autoinsert the host with each fetch request', () => {
      fetch.mockReset();
      fetch.mockResponseOnce(JSON.stringify({}));
      const libraryService = createLibraryService(host);
      const path = '/bar';
      libraryService(path);
      expect(fetch).toHaveBeenCalledWith(host + path);
    });

    it('should pass options to fetch', () => {
      fetch.mockReset();
      fetch.mockResponseOnce(JSON.stringify({}));
      const libraryService = createLibraryService(host);
      const path = '/bar';
      const options = { method: 'POST' };
      libraryService(path, options);
      expect(fetch).toHaveBeenCalledWith(host + path, options);
    });

    it('should auto parse the response body json', async () => {
      fetch.mockReset();
      const mockJson = { data: '12345' };
      fetch.mockResponseOnce(JSON.stringify(mockJson));
      const libraryService = createLibraryService(host);
      await expect(libraryService('/bar')).resolves.toEqual(mockJson);
    });
  });

  const shouldForwardExceptions = (method, ...args) => async () => {
    const error = Error('Foo');
    const libraryService = jest.fn().mockRejectedValue(error);
    await expect(method(...args, libraryService)).rejects.toThrow(error);
  };

  const shouldRequireIsbn = (method, ...args) => async () => {
    await expect(method(...args, jest.fn())).rejects.toThrow(ERR_ISBN_REQUIRED);
  };

  describe('getBooks', () => {
    it('should return an array of books', async () => {
      const mockBooks = [{ isbn: '123' }, { isbn: '321' }];
      const libraryService = jest.fn().mockResolvedValue({ books: mockBooks });
      const books = await getBooks(libraryService);
      expect(libraryService).toHaveBeenCalledWith(`/books`, {
        method: 'GET',
      });
      expect(books).toBe(mockBooks);
    });

    it('should forward exceptions', shouldForwardExceptions(getBooks));
  });

  describe('getBook', () => {
    it('should return an instance of a book', async () => {
      const isbn = '123';
      const mockBook = { isbn };
      const libraryService = jest.fn().mockResolvedValue({ book: mockBook });
      const book = await getBook(isbn, libraryService);
      expect(libraryService).toHaveBeenCalledWith(`/books/${isbn}`, {
        method: 'GET',
      });
      expect(book).toBe(mockBook);
    });

    it('should require isbn', shouldRequireIsbn(getBook, ''));
    it('should forward exceptions', shouldForwardExceptions(getBook, '123'));
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const mockBook = { isbn: '123' };
      const libraryService = jest.fn().mockResolvedValue({ book: mockBook });
      await createBook(mockBook, libraryService);
      expect(libraryService).toHaveBeenCalledWith(`/books`, {
        method: 'POST',
        body: JSON.stringify({ book: mockBook }),
      });
    });

    it('should require isbn', shouldRequireIsbn(createBook, {}));
    it(
      'should forward exceptions',
      shouldForwardExceptions(createBook, { isbn: '123' }),
    );
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const isbn = '123';
      const mockBook = { isbn };
      const libraryService = jest.fn().mockResolvedValue({ book: mockBook });
      await updateBook(mockBook, libraryService);
      expect(libraryService).toHaveBeenCalledWith(`/books/${isbn}`, {
        method: 'PUT',
        body: JSON.stringify({ book: mockBook }),
      });
    });

    it('should require isbn', shouldRequireIsbn(updateBook, {}));
    it(
      'should forward exceptions',
      shouldForwardExceptions(updateBook, { isbn: '123' }),
    );
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const isbn = '123';
      const mockBook = { isbn };
      const libraryService = jest.fn().mockResolvedValue({ book: mockBook });
      await deleteBook(isbn, libraryService);
      expect(libraryService).toHaveBeenCalledWith(`/books/${isbn}`, {
        method: 'DELETE',
      });
    });

    it('should require isbn', shouldRequireIsbn(deleteBook, ''));
    it('should forward exceptions', shouldForwardExceptions(deleteBook, '123'));
  });

  describe('checkBook', () => {
    it('should not be able to check book out if is already checked', async () => {
      const isbn = '123';
      const mockBook = { isbn, checked: true };
      const libraryService = jest
        .fn()
        .mockResolvedValueOnce({ book: mockBook });
      await expect(
        checkBook(isbn, CHECK_BOOK_METHOD_OUT, libraryService),
      ).rejects.toThrow(ERR_BOOK_ALREADY_CHECKED_OUT);
    });

    it('should not be able to check book in if is not already checked', async () => {
      const isbn = '123';
      const mockBook = { isbn, checked: false };
      const libraryService = jest
        .fn()
        .mockResolvedValueOnce({ book: mockBook });
      await expect(
        checkBook(isbn, CHECK_BOOK_METHOD_IN, libraryService),
      ).rejects.toThrow(ERR_BOOK_ALREADY_CHECKED_IN);
    });

    it('should check in/out books', async () => {
      const testCheck = async (mockBook, method, expectedCheckResult) => {
        const { isbn } = mockBook;
        const libraryService = jest
          .fn()
          .mockResolvedValueOnce({ book: mockBook });

        await checkBook(isbn, method, libraryService);
        expect(libraryService).toHaveBeenNthCalledWith(2, `/books/${isbn}`, {
          method: 'PUT',
          body: JSON.stringify({
            book: { ...mockBook, checked: expectedCheckResult },
          }),
        });
      };
      const isbn = '123';
      await testCheck({ isbn, checked: false }, CHECK_BOOK_METHOD_OUT, true);
      await testCheck({ isbn, checked: true }, CHECK_BOOK_METHOD_IN, false);
    });
  });
});
