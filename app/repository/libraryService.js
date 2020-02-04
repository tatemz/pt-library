import {
  CHECK_BOOK_METHOD_IN,
  CHECK_BOOK_METHOD_OUT,
} from '../containers/HomePage/constants';

export const ERR_ISBN_REQUIRED = Error('ISBN must be set');
export const ERR_BOOK_ALREADY_CHECKED_OUT = Error(
  'Cannot check out book. That book is already checked out',
);
export const ERR_BOOK_ALREADY_CHECKED_IN = Error(
  'Cannot check in book. That book is already checked in',
);

export function getUri(url) {
  try {
    const { pathname, search, hash } = new URL(url);
    return pathname + search + hash;
  } catch (e) {
    return url;
  }
}

export function createLibraryService(host) {
  const sanitizedHost = host.replace(/\/$/, '');
  return async (url, ...args) => {
    const response = await fetch(sanitizedHost + getUri(url), ...args);
    return response.json();
  };
}

export async function getBooks(libraryService) {
  const data = await libraryService(`/books`, { method: 'GET' });
  return data.books;
}

export async function getBook(isbn, libraryService) {
  if (!isbn) {
    throw ERR_ISBN_REQUIRED;
  }

  const data = await libraryService(`/books/${isbn}`, { method: 'GET' });
  return data.book;
}

export async function createBook(book, libraryService) {
  if (!book.isbn) {
    throw ERR_ISBN_REQUIRED;
  }

  const data = await libraryService(`/books`, {
    method: 'POST',
    body: JSON.stringify({ book }),
  });

  return data.book;
}

export async function updateBook(book, libraryService) {
  if (!book.isbn) {
    throw ERR_ISBN_REQUIRED;
  }

  await libraryService(`/books/${book.isbn}`, {
    method: 'PUT',
    body: JSON.stringify({ book }),
  });
}

export async function deleteBook(isbn, libraryService) {
  if (!isbn) {
    throw ERR_ISBN_REQUIRED;
  }

  await libraryService(`/books/${isbn}`, {
    method: 'DELETE',
  });
}

export async function checkBook(isbn, method, libraryService) {
  const book = await getBook(isbn, libraryService);

  if (book.checked && method === CHECK_BOOK_METHOD_OUT) {
    throw ERR_BOOK_ALREADY_CHECKED_OUT;
  }

  if (!book.checked && method === CHECK_BOOK_METHOD_IN) {
    throw ERR_BOOK_ALREADY_CHECKED_IN;
  }

  await updateBook(
    {
      ...book,
      checked: !book.checked,
    },
    libraryService,
  );
}
