const http = require('http');

let books = [
  { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'fiction' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport', category: 'self-help' },
  { id: 3, title: 'The Intelligent Investor', author: 'Benjamin Graham', category: 'finance' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(books));
  }
  else if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newBook = JSON.parse(body);
      newBook.id = books.length + 1;
      books.push(newBook);

      res.statusCode = 201;
      res.end(JSON.stringify(newBook));
    });
  }
  else if (req.method === 'DELETE') {
    books = [];
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'All books deleted' }));
  }

  else {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
});
server.listen(3000, () => {
  console.log('Library server running at http://localhost:3000');
});