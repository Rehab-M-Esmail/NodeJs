const { sequelize, Task } = require('./database.js','./task');
const express = require('express');
const router = express.Router();
const app = express();

router.get('/tasks',async(req,res)=>{
    const Tasks = await Task.findAll();
    res.send(Tasks).status(200);
}
)

router.get('/tasks/:id',async(req,res)=>{
    const Task = await Task.findOne({id: req.params.id});
    res.send(Task).status(200);
}
)
router.post('/tasks',async (req,res)=>
{
    const newTask = await Task.create({title:req.body.title,id:req.body.id, status:req.body.status})
    res.status(200).send(`Task${newTask} is added`);
})

router.put('/tasks/:id',async (req,res)=>
{
    try    
    {const [updatedRows] = await Task.update(req.body);
        if (updatedRows) {
        res.send("Updated succesfully");
    } else {
        res.send("Task is not found").status(404);
    }}
    catch (error){
    res.send('Error:', error.message || error);
    }
    finally {
    await sequelize.close();
}

})
router.delete('/tasks/:id',async (req,res)=>{
    try
    {const deletedRows = await Task.destroy({ where: { name: 'Alice' } });
    if (deletedRows) {
        res.send("Task is deleted").status(200);
    } else {
        res.send("There's no task with such id").status(400);
    }}
    catch (error) {
    res.send('Error:', error.message || error);
} finally {
    await sequelize.close();
}
})
// async function main() {
//     // Authenticate connection
//     await sequelize.authenticate();
//     console.log('Database connected successfully.');

//     // Sync database
//     await sequelize.sync();
//     console.log('Database schema synchronized.');

// }
app.use('/',router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
