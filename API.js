const express = require('express');

const app = express();
app.use(express.json());
const books = [
    { id: 1, title: " The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
];

app.get('/',(req, res)=> {
    res.send(books)
})

app.get('/api/books/:id',(req,res)=> {
    const result =books.find(book => book.id ===parseInt(req.params.id));
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}
    else
        res.send(result);
})

app.post('/api/books',(req,res)=>{
    //handling null inputs
    if(!req.body.title || !req.body.author)
    {res.status(400).send("Invalid data");
    return; }

    const newBook = {
        id : books.length+1,
        title : req.body.title,
        author : req.body.author
    };
    books.push(newBook);
    res.send(newBook);
})

app.put('/api/books/:id',(req,res)=>
{
    if(!req.body.title || !req.body.author)
        {res.status(400).send("Invalid data");
        return; }
    const result =books.find(book => book.id ===parseInt(req.params.id));
        if(!result)
            res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        else{
            result.title = req.body.title,
            result.author = req.body.author
            res.send(result);
        }
})

app.delete('/api/books/:id',(req,res)=> {
    const result =books.find(book => book.id ===parseInt(req.params.id));
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}    
    else{
        books.splice(books.indexOf(result));
        res.status(200).send(`Book with Id =${req.params.id} is deleted`);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});