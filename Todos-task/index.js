// console.log(process.argv);
const fs = require("fs");
let [,,command]=process.argv
if(command=="add"){
    let [,,,title]=process.argv
    fs.readFile('data.json' , 'utf-8',(err,data)=>{
        let todos=JSON.parse(data)
        todos.push({title,id:(todos.length==0)?1:todos[todos.length-1].id+1})
        fs.writeFile('data.json',JSON.stringify(todos),()=>{

        })
    })
}else if(command=="list"){


    fs.readFile('data.json' , 'utf-8',(err,data)=>{
        console.log(JSON.parse(data));
    });
    
}else if(command=="delete"){
    let [, , , id]=process.argv;
    fs.readFile("data.json","utf-8" ,(err,data)=>{
        let todos= JSON.parse(data);
        let todoIndex= todos.findIndex((todo)=>todo.id==id);
        if(todoIndex !=-1){
            todos.splice(todoIndex,1);
            fs.writeFile('data.json',JSON.stringify(todos),()=>{
                console.log("deleted successfully");
            });
        }else{
            console.log("to do dosn't exist");
        }
    });
}