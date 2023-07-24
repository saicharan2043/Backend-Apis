const mysql = require("mysql")
const express = require("express")
const app = express()
const connection = mysql.createConnection({
    host:"localhost",
    user : "root",
    password:"*****" ,
    database:"backend"

})

connection.connect(function(error){
    if(error)
        throw error ;
    
    console.log("connect successfuly..;")
})



app.get("/initialize" , async(request , response)=>{
    const dataMsg = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    const data = await dataMsg.json()
    for(let value of data){
        connection.query(`insert into product(id , title , price , description , category , image , sold , dateOfSale) values(${value.id} , '${value.title}' , ${value.price} , '${value.description}' , "${value.category}" , '${value.image}' , ${value.sold} , '${value.dateOfSale}')` , (error , reslut , fields)=>{
            if(error){
                return error
            }
            console.log("query success")
            
        })
    }
    response.send("data added successfuly")
})

app.get("/statistics" , (request , response) =>{
    const{month = 7} = request.query
    
    connection.query(`select (select sum(price) from product where month(dateOfSale) = ${month}) as Total_Sale_amount , 
    count(case 
    when sold = true then 1 
    end ) as sold_items , 
    count(case 
        when sold = false then 1 
        end ) as not_sold_items 
    from product 
    where month(dateOfSale) = ${month}` , (error , result , fields) =>{
        if (error){
            return error
        }
        response.send(result)
    })
})

app.get("/pricerange" , (request , response) =>{
    const {startPrice = 101, endPrice = 500, month = 5} = request.query
    
    connection.query(`select count(*) as no_of_items_this_price_range_${startPrice}_to_${endPrice} from product where price between ${startPrice} and ${endPrice} and month(dateOfSale) = ${month}` , (error , result , fields) =>{
        if (error){
            return error
        }
        response.send(result)
    })
})

app.get("/category" , (request , response) =>{
    connection.query(`select category , count(title) as No_of_items from product group by category` , (error , result , fields) =>{
        if (error){
            return error
        }
        response.send(result)
    })
})

app.get("/callallapis" , async(request , response) =>{
    const statisticsApi = await fetch("http://localhost:3000/statistics")
    const statisticsJson = await statisticsApi.json()
    const pricerangeApi = await fetch("http://localhost:3000/pricerange")
    const pricerangeJson = await pricerangeApi.json()
    const categoryApi = await fetch("http://localhost:3000/category")
    const categoryJson = await categoryApi.json()
    const allApiData = {statistics : [...statisticsJson] , barChart : [...pricerangeJson] , pieChart :[...categoryJson]}
    response.send(allApiData)
})

app.get("/delete" , (request , response) =>{
    connection.query("delete from product" , (error , resalut , fields) =>{
        if(error){
            return error
        }
        response.send("delete successfuly")
    })
})

app.listen(3000 , ()=> console.log("server start successfully"))


