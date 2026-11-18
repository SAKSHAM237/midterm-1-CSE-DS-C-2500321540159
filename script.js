// libary app, web application|focus on node.js/postman commanda|

// {
//     "id":1,
//     "title": " the al",
//     "author": "...",
//     "category":"..."
// }
// use get post put and delete


const http = require('http')

let books =[
    {
    "id":1,
    "title": " the al",
    "author": "...",
    "category":"..."
}
]

const server = http.createServer((req,res)=>{
    res.setHeader('key','value');
    const parts=req.url.split('/');
    const resource = parts[1];
    const id=parseInt(parts[2]);


if(req.method==="GET"&&req.url==="/books"){
    res.writeHead(200);
    res.end(JSON.stringify(books));
}


else if (req.method === 'DELETE' && resource === 'books' && !isNaN(id)) {
        const index = books.findIndex(b => b.id === id);
        if (index === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Book not found" }));
        }

        const deletedBook = books.splice(index, 1);
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Book deleted", book: deletedBook[0] }));
    }

    
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }

})

server.listen(3000, () => {
    console.log("Library server running at http://localhost:3000");
});