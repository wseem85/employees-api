const Joi= require('joi')
const express = require('express')
const app = express();
app.use(express.json());
const PORT =process.env.PORT || 8000;
const employees = [

    {name: 'Dora' , id:1},
    {name: 'Sema' , id:2},
    {name: 'anoga' , id:3},
]
app.get('/employees' ,(req,res)=>{
    res.status(200).send(employees)
})
app.get('/employees/:id',(req,res)=>{
    const employee= employees.find((employee)=> employee.id === +req.params.id);
    if(!employee) res.status(404).send('there is no employee with this id !');
    res.status(200).send(employee)
})
app.post('/employees',(req,res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result =schema.validate(req.body)
   
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const employee = {
        id : employees.length + 1,
        name : req.body.name 
    }
    employees.push(employee);
    res.send(employee)
})

app.put('/employees/:id',(req,res)=>{
    //look up the entry that we want to update 
    const employee= employees.find((employee)=> employee.id === +req.params.id);
    if(!employee) res.status(404).send('there is no employee with this id !');
    // validate the new data 
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result =schema.validate(req.body)
   
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    // if every thing ok change the entry 
    employee.name = req.body.name;
    // send the response 
    res.send(employee);
})
app.delete('/employees/:id',(req,res)=>{
    const employee= employees.find((employee)=> employee.id === +req.params.id);
    if(!employee) res.status(404).send('there is no employee with this id !');
    const index = employees.indexOf(employee);
    employees.splice(index,1);
    res.send(employee);
})
app.listen(PORT,()=> console.log(`listining To http://localhost:${PORT}`))