const express = require('express');
const Mongoose = require('mongoose')
Mongoose.connect("mongodb+srv://rehabmahmoud:r2e2h4a2004b@cluster0.hg0hv.mongodb.net/Node_API?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("done Connecting with database")
}).catch(()=>{
    console.log("Error with connecting to database");
})

const BookSchema = new Mongoose.Schema({
    title: String,
    id: Number,
    author: String,
    available: Boolean,
})
const Book = Mongoose.model('Book',BookSchema);
const router = express.Router();
// const books = [
//     { id: 1, title: " The Great Gatsby", author: "F. Scott Fitzgerald" },
//     { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
//     { id: 3, title: "1984", author: "George Orwell" },
// ];`
router.get('/',(req, res)=> {``
    res.send(books)
})
router.get('/api/books/:id',(req,res)=> {
    const result =Book.findById(req.params.id);
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}
    else
        res.send(result);
})

router.post('/api/books',async (req,res)=>{
    //handling null inputs
    if(!req.body.title || !req.body.author)
    {res.status(400).send("Invalid data");
    return; }
    const newBook = await Book.create(req.body);
    // if(!newBook)
    //     res.status(404).send(`Book with ID = ${req.params.id} is not found`);
    // else
    res.status(200).send(newBook);
})

router.put('/api/books/:id',(req,res)=>
{
    if(!req.body.title || !req.body.author)
        {res.status(400).send("Invalid data");
        return; }
    const result =Book.find(book => book.id ===parseInt(req.params.id));
        if(!result)
            res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        else{
            result.title = req.body.title,
            result.author = req.body.author
            res.send(result);
        }
})

router.delete('/api/books/:id',(req,res)=> {
    const result =books.find(book => book.id ===parseInt(req.params.id));
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}    
    else{
        books.splice(Book.indexOf(result));
        res.status(200).send(`Book with Id =${req.params.id} is deleted`);
    }
})

module.exports=router