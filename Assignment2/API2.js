const express = require('express');

const app = express();
const bookRouter = require("./books.js");
app.use(express.json());

const Authorization= (req,res,next)=>{
    if(req.headers.authorization ==='Bearer ZEWAIL'){
        next();
    }else{
        res.status(401).send('Unauthorized');
    }
}
app.use(Authorization);
app.use('/api',bookRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
