const Joi= require('joi')
const express = require('express')
const cors = require('cors');
app.use(cors)
const app = express();
app.use(express.json());
const PORT =process.env.PORT || 3000;
const employees = [

    {name: 'Dora' , id:1,position:'Main Manager',salary:5600},
    {name: 'Sema' , id:2 ,position:'Executive Manager',salary:5200},
    {name: 'anoga' , id:3,position:'Engineer',salary:4300},
    {name: 'diamon' , id:4,position:'Typer',salary:3000},
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
        name: Joi.string().min(3).required(),
        position: Joi.string().min(3).required(),
        salary : Joi.number().min(2500).max(5600)
    });
    const result =schema.validate(req.body)
   
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const employee = {
        id : employees.length + 1,
        name : req.body.name ,
        position : req.body.position ,
        salary : +req.body.salary ,
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
        name: Joi.string().min(3).required(),
        position: Joi.string().min(3).required(),
        salary : Joi.number().min(2500).max(5600),
    });

    const result =schema.validate(req.body)
   
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    // if every thing ok change the entry 
    employee.name = req.body.name;
    employee.position = req.body.position;
    employee.salary = +req.body.salary;
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
