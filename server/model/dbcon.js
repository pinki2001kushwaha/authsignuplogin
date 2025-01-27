
const pg=require('pg')

const pool=new pg.Client({
    user:'postgres',
    host:'localhost',
    password:'7697',
    database:'jwtcompany',
    port:5432,
})
pool.connect((err)=>{
    if(err){
        console.log("mysql is not connected.............",err)
        
    }
    else{
        console.log("mysql connected.................")
    }
})
module.exports=pool