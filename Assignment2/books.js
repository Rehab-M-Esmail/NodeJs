const express = require('express');
const Mongoose = require('mongoose');
var CircularJSON = require('circular-json');

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
router.get('/books',async (req, res)=> {
        const books = await Book.find() ;
        res.send(CircularJSON.stringify(books));
        //res.send(books);
    })

router.get('/books/:id',async(req,res)=> {
    const result =await Book.findOne({id: req.params.id});
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}
    else
        //res.send(CircularJSON.stringify(result));
        res.send(result);
})

router.post('/books',async (req,res)=>{
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

router.put('/books/:id',async(req,res)=>
{
    if(!req.body.title || !req.body.author)
        {res.status(400).send("Invalid data");
        return; }
    const result =await Book.find(book => book.id ===parseInt(req.params.id));
        if(!result)
            res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        else{
            result.title = req.body.title,
            result.author = req.body.author
            res.send(result);
        }
})

router.delete('/books/:id',async (req,res)=> {
    const result =await Book.find(book => book.id ===parseInt(req.params.id));
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}    
    else{
        books.splice(Book.indexOf(result));
        res.status(200).send(`Book with Id =${req.params.id} is deleted`);
    }
})
router.post('/books/:id/borrow',async (req,res)=>{
    const result =await Book.findById(req.params.id);
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}
    else{
        if(result.available)
        {
            result.available=false;
            res.status(200).send(`Book with ID = ${req.params.id} is borrowed`);
        }
        else
            res.status(400).send(`Book with ID = ${req.params.id} is not available`);
    }
    result.save();
})
router.post('/books/:id/return',async (req,res)=>{
    const result =await Book.findById(req.params.id);
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}
    else{
        if(!result.available)
        {
            result.available=true;
            res.status(200).send(`Book with ID = ${req.params.id} is returned`);
        }
        else
            res.status(400).send(`Book with ID = ${req.params.id} is already available`);
    }
    result.save();
})
module.exports=router