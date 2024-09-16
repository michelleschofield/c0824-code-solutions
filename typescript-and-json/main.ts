const books = [
  {
    title: 'Way of Kings',
    author: 'Brandon Sanderson',
    isbn: '9780765326355',
  },
  {
    title: 'Anne of Green Gables',
    author: 'Lucy Maud Montgomery',
    isbn: '9788842516231',
  },
  {
    title: 'Unreasonable Hospitality',
    author: 'Will Guidara',
    isbn: '9798217043774',
  },
];

console.log('books:', books);
console.log('typeof books:', typeof books);

const stringifiedBooks = JSON.stringify(books);

console.log('stringifiedBooks:', stringifiedBooks);
console.log('typeof stringifiedBooks:', typeof stringifiedBooks);

const bookJSON =
  '{"title": "The Road", "Author": "Cormac McCarthy", "isbn": "9783060328680"}';

console.log('bookJSON:', bookJSON);
console.log('typeof bookJSON:', typeof bookJSON);

const parsedBook = JSON.parse(bookJSON);

console.log('parsedBook:', parsedBook);
console.log('typeof parsedBook:', typeof parsedBook);
