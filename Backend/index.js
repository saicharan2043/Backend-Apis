const mysql = require("mysql")
const express = require("express")
const app = express()
const connection = mysql.createConnection({
    host:"localhost",
    user : "root",
    password:"****" ,
    database:"backend"

})

connection.connect(function(error){
    if(error)
        throw error ;
    
    console.log("connect successfuly..;")
})


app.get("/products" , (request, response)=>{
    connection.query("select * from product" , (error ,reslut)=>{
        if(error){
            return error
        }
        response.send(reslut)
    })
})

app.get("/product/:Id" , async (request , response) =>{
    const {Id} = request.params
    connection.query(`select * from product where id = ${Id}` , (error ,reslut)=>{
        if (error){
            return error
        }
        response.send(reslut)
    })

})

app.get("/similarproducts" , (request , response) =>{
    const {category , name} = request.query
    connection.query(`select * from product where category = "${category}" and title <> "${name}"` , (error ,reslut)=>{
        if (error){
            return error
        }
        response.send(reslut)
    })

})

app.listen(4000 , ()=> console.log("server start successfully"))


