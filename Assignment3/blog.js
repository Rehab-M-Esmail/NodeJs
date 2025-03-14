const express = require('express');
const Mongoose = require('mongoose');
var CircularJSON = require('circular-json');

Mongoose.connect("mongodb+srv://rehabmahmoud:r2e2h4a2004b@cluster0.hg0hv.mongodb.net/Node_API?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("done Connecting with database")
}).catch(()=>{
    console.log("Error with connecting to database");
})

const PostSchema = new Mongoose.Schema({
    id: Number,
    UserId: Number,
    Content: String,
    Date : Date,
    Time: String,
    Attachment: String,
})
const post = Mongoose.model('Post',PostSchema);
const router = express.Router();
router.get('/',async (req, res)=> {
        const posts = await post.find() ;
        res.send(CircularJSON.stringify(posts));
    })

router.get('/:id',async(req,res)=> {
    const result =await post.findOne({id: req.params.id});
    if(!result){
        res.status(404).send(`Post with ID = ${req.params.id} is not found`);
        return;}
    else
        res.send(result);
})

router.post('/',async (req,res)=>{
    //handling null inputs
    if(!req.body.Content)
    {res.status(400).send("There's nothing to post");
    return; }
    req.body.Date = req.body.Date || new Date();
    req.body.Time = req.body.Time || new Date().toLocaleTimeString();
    const newPost = await post.create(req.body);
    res.status(200).send(newPost);
})

router.put('/:id',async(req,res)=>
{
    if(!req.body.content)
        {res.status(400).send("There's nothing to update");
        return; }
    const result =await post.findOne({id: req.params.id});
        if(!result)
            res.status(404).send(`Post with ID = ${req.params.id} is not found`);
        else{
            result.connect = req.body.content;
            await result.save();
            res.send(result);
        }
})

router.delete('/:id',async (req,res)=> {
    const result =await post.findOne({id: req.params.id});
    if(!result){
        res.status(404).send(`Book with ID = ${req.params.id} is not found`);
        return;}    
    else{
        await post.deleteOne({id: req.params.id});
        res.status(200).send(`Book with Id =${req.params.id} is deleted`);
    }
})
module.exports=router