const express = require('express');
const app = express();
const authorRouter = require("./author.js");
const PostRouter = require("./blog.js");
app.use(express.json());
app.use('/authors',authorRouter);
app.use('/posts',PostRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});